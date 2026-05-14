import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../services/api'; // Precisamos da API para chamar a rota de registro

export function Login() {
  // Novo estado para controlar se estamos na tela de Login ou Cadastro
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const [name, setName] = useState(''); // Usado apenas no cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Fluxo de LOGIN
        await login(email, password);
        navigate('/dashboard');
      } else {
        // Fluxo de CADASTRO (Cria o Admin e depois já loga automaticamente)
        await api.post('/auth/register', { 
          name, 
          email, 
          password, 
          role: 'admin' // Garante que quem cria conta por aqui é dono de um workspace
        });
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        (isLoginMode ? 'Credenciais inválidas. Verifique seu e-mail e senha.' : 'Erro ao criar conta. Este e-mail pode já estar em uso.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar os campos ao trocar de modo (Login <-> Cadastro)
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setPassword('');
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
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative overflow-hidden transition-all duration-300">
          
          {/* Borda decorativa superior */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

          {/* Header Dinâmico */}
          <div className="text-center mb-10 mt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl mb-5 shadow-lg shadow-indigo-600/20">
              <span className="text-3xl font-black">O</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLoginMode ? 'Bem-vindo de volta' : 'Crie seu Workspace'}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {isLoginMode ? 'Acesse seu painel do OrganizaTask' : 'Comece a gerenciar seu time agora mesmo'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo NOME (Aparece apenas no modo de Cadastro) */}
            {!isLoginMode && (
              <div className="animate-fadeIn">
                <Input 
                  label="Seu Nome Completo"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  required={!isLoginMode}
                  disabled={isLoading}
                />
              </div>
            )}

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

            {/* Input Modular: Senha */}
            <Input 
              label={isLoginMode ? "Senha" : "Crie uma senha forte"}
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={isLoginMode ? "current-password" : "new-password"}
              disabled={isLoading}
              labelAction={
                isLoginMode ? (
                  <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    Esqueceu a senha?
                  </a>
                ) : null
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

            {/* Botão Modular Dinâmico */}
            <div className="pt-2">
              <Button type="submit" isLoading={isLoading}>
                {isLoginMode ? 'Entrar no Workspace' : 'Criar Conta Gratuita'}
              </Button>
            </div>
            
          </form>
        </div>

        {/* Rodapé Dinâmico para alternar entre os modos */}
        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
          {isLoginMode ? 'Ainda não tem uma conta? ' : 'Já possui uma conta? '}
          <button 
            type="button"
            onClick={toggleMode}
            className="text-indigo-600 hover:text-indigo-800 transition-colors font-bold outline-none"
          >
            {isLoginMode ? 'Criar Workspace' : 'Fazer Login'}
          </button>
        </p>

      </div>
    </div>
  );
}