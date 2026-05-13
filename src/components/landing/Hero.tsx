import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8 animate-fadeIn">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
          </span>
          Versão 1.0 • Multi-Tenant Ready
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 animate-fadeUp [animation-delay:150ms] opacity-0">
          O fim do caos na gestão.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            A precisão que seu time merece.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeUp [animation-delay:300ms] opacity-0 font-medium">
          Mais que um gerenciador de tarefas. Um hub central isolado e seguro para líderes que exigem foco absoluto na execução e zero ruído na comunicação.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fadeUp [animation-delay:450ms] opacity-0">
          <Link to="/login" className="w-full sm:w-auto text-center px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-lg">
            Criar meu Workspace
          </Link>
          <a href="#features" className="w-full sm:w-auto text-center px-10 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-lg">
            Entender a Plataforma
          </a>
        </div>
      </div>
    </section>
  );
}