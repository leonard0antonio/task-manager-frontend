import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="pt-36 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-semibold mb-8 animate-fadeIn hover:border-indigo-200 transition-colors cursor-pointer">
          <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
            Novo
          </span>
          Painel Administrativo v1.0 já disponível &rarr;
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-fadeUp [animation-delay:150ms] opacity-0">
          Organize seu time.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Entregue no prazo. Sem stress.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeUp [animation-delay:300ms] opacity-0">
          Uma plataforma de gestão de tarefas feita para equipes que precisam de foco.
          Crie times, delegue responsabilidades e acompanhe o progresso em uma interface
          limpa e rápida.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 animate-fadeUp [animation-delay:450ms] opacity-0">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/login"
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 text-base"
            >
              Criar Workspace Grátis
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-base"
            >
              Ver como funciona
            </a>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            ✨ Grátis para sempre para pequenos times. Não requer cartão de crédito.
          </p>
        </div>
      </div>

      {/* Social Proof Fictício */}
      <div className="max-w-5xl mx-auto mt-24 text-center animate-fadeIn [animation-delay:600ms] opacity-0">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Utilizado por equipes modernas ao redor do mundo
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
          <span className="text-xl font-black font-serif tracking-tighter">
            NovaLabs
          </span>

          <span className="text-xl font-black tracking-widest uppercase">
            FlowByte
          </span>

          <span className="text-xl font-bold flex items-center gap-1">
            <div className="w-4 h-4 bg-black rounded-sm"></div>
            PixelForge
          </span>

          <span className="text-xl font-black italic">
            ZenithHub
          </span>
        </div>
      </div>
    </section>
  );
}