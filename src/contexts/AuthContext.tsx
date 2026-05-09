import { createContext, useContext, useState,  useEffect } from  'react';
import type {ReactNode} from 'react';
import { api } from '../services/api';
import type { User } from '../types';

// Definindo o formato do nosso contexto
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Quando o app abrir, verifica se já tem um token salvo no navegador
  useEffect(() => {
    const storedUser = localStorage.getItem('@TaskManager:user');
    const storedToken = localStorage.getItem('@TaskManager:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Faz a chamada real para a sua API no Render
    const response = await api.post('/auth/login', { email, password });
    
    const { token, user } = response.data;

    // Salva no navegador para não deslogar quando der F5
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export function useAuth() {
  return useContext(AuthContext);
}