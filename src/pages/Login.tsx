import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (isAuthenticated) {
    navigate('/dashboard'); // Pula o login se já estiver autenticado!
  }
}, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Inicia o loading no botão

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false); // Para o loading independente do resultado
    }
  };

  return (
    // Fundo com gradiente sutil para um toque premium
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      
      {/* Card da área de Login */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-white/20 p-8 sm:p-10">
        
        {/* Cabeçalho / Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl mb-4 shadow-inner">
            <span className="text-2xl">⚡</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Task Manager
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Entre para gerenciar seus projetos
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <Input 
            label="E-mail"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@empresa.com"
            required
            autoComplete="email"
          />

          <Input 
            label="Senha"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-600 text-sm font-semibold text-center">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading}>
              Acessar Plataforma
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}