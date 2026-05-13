import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionamento inteligente: se já tem token, vai pro painel
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Orbs (Branding) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-fadeIn"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-100 rounded-full blur-3xl opacity-50 -z-10 animate-fadeIn"></div>

      <div className="w-full max-w-md animate-fadeUp">
        
        {/* Navegação Secundária */}
        <div className="mb-6">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 w-fit">
            &larr; Voltar para a página inicial
          </Link>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Borda decorativa superior */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

          {/* Header */}
          <div className="text-center mb-10 mt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl mb-5 shadow-lg shadow-indigo-600/20">
              <span className="text-3xl font-black">O</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              OrganizaTask
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Acesse seu workspace de trabalho
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Modular: E-mail */}
            <Input 
              label="E-mail profissional"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com"
              required
              autoComplete="email"
              disabled={isLoading}
            />

            {/* Input Modular: Senha com ação embutida */}
            <Input 
              label="Senha"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={isLoading}
              labelAction={
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Esqueceu a senha?
                </a>
              }
            />

            {/* Feedback de Erro */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl animate-fadeIn">
                <p className="text-red-600 text-sm font-semibold text-center flex items-center justify-center gap-2">
                  <span className="text-base">⚠️</span> {error}
                </p>
              </div>
            )}

            {/* Botão Modular */}
            <div className="pt-2">
              <Button type="submit" isLoading={isLoading}>
                Entrar no Workspace
              </Button>
            </div>
            
          </form>
        </div>

        {/* Rodapé de Vendas */}
        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
          Ainda não tem uma conta?{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors font-bold">
            Fale com vendas
          </a>
        </p>
      </div>
    </div>
  );
}