import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden">
      
      {/* 1. NAVBAR PÚBLICA (Entrada suave) */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 z-50 animate-fadeIn">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            {/* O logo ganha uma rotação sutil no hover */}
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-sm group-hover:rotate-[-10deg] transition-transform duration-300">
              O
            </span>
            <span className="text-xl font-black tracking-tight text-slate-800">
              OrganizaTask
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all hover:translate-y-[-1px]">
              Já tenho conta
            </Link>
            <Link to="/login" className="text-sm font-bold bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-all hover:scale-105 active:scale-95">
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Animações Sequenciais) */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mt-10">
          
          {/* Tag de Status: Surge primeiro */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Plataforma Multi-Tenant Ativa
          </div>
          
          {/* Título: Surge de baixo para cima com delay */}
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6 animate-fadeUp [animation-delay:150ms] opacity-0">
            Gerencie equipes com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">precisão</span> que sua empresa exige.
          </h1>
          
          {/* Parágrafo: Surge depois do título */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeUp [animation-delay:300ms] opacity-0">
            O OrganizaTask é o hub central para líderes que precisam de clareza. Atribua tarefas, organize times e acompanhe o progresso em tempo real.
          </p>
          
          {/* Botão CTA: Surge por último e tem um pulso contínuo sutil */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp [animation-delay:450ms] opacity-0">
            <Link 
              to="/login" 
              className="w-full sm:w-auto text-center px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 animate-pulseScale"
            >
              Começar Grátis Agora
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION (Scroll Interativo) */}
      <section className="py-20 bg-white border-t border-slate-200 px-6 relative">
        {/* Background visual sutil */}
        <div className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent,white)]">
          <svg className="w-full h-full" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#e2e8f0"/>
              </pattern>
            </defs>
            <rect width="100%" h-full="" fill="url(#dotPattern)"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Projetado para Produtividade Máxima</h2>
            <p className="text-slate-600">Esqueça o caos operacional. Nós cuidamos da organização.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Efeitos de Hover Premium */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2 animate-fadeUp [animation-delay:100ms] opacity-0">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Isolamento Seguro</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Arquitetura Multi-Tenant de nível empresarial. Seus dados, times e tarefas são isolados de forma criptográfica, garantindo privacidade total.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2 animate-fadeUp [animation-delay:200ms] opacity-0">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gestão de Times</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Crie squads ágeis e atribua membros em poucos cliques. O painel administrativo centraliza a criação e o controle de acessos da sua equipe.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2 animate-fadeUp [animation-delay:300ms] opacity-0">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Controle em Tempo Real</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Acompanhe o status de cada entrega (Pendente, Em Andamento, Concluída) com filtros rápidos e atualizações instantâneas no seu Dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER (Surgimento suave) */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center border-t border-slate-800 animate-fadeIn">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4 relative">
          {/* Logo Footer */}
          <span className="text-white font-bold text-lg flex items-center gap-2 group cursor-pointer">
            <span className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-xs group-hover:scale-110 transition-transform">O</span>
            OrganizaTask
          </span>
          <p className="text-sm">© 2026 OrganizaTask. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}