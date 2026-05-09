import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import type { User } from '../types';
import type { ReactNode } from 'react';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // NOVO: Adicionamos o loading aqui
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // NOVO: Começa verdadeiro, bloqueando a tela

  useEffect(() => {
    const storedUser = localStorage.getItem('@TaskManager:user');
    const storedToken = localStorage.getItem('@TaskManager:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    
    // NOVO: Depois de olhar a memória, avisa que o carregamento terminou
    setLoading(false); 
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@TaskManager:token', token);
    localStorage.setItem('@TaskManager:user', JSON.stringify(user));

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('@TaskManager:token');
    localStorage.removeItem('@TaskManager:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}