import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. NAVBAR PÚBLICA */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-sm">
              O
            </span>
            <span className="text-xl font-black tracking-tight text-slate-800">
              OrganizaTask
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
              Já tenho conta
            </Link>
            <Link to="/login" className="text-sm font-bold bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition">
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (A Promessa) */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Plataforma Multi-Tenant Ativa
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Gerencie equipes com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">precisão</span> que sua empresa exige.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            O OrganizaTask é o hub central para líderes que precisam de clareza. Atribua tarefas, organize times e acompanhe o progresso em tempo real, sem planilhas confusas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto text-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/25 transition-all text-lg">
              Começar a Usar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION (Por que usar?) */}
      <section className="py-20 bg-white border-t border-slate-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Projetado para Produtividade Máxima</h2>
            <p className="text-slate-600">Esqueça o caos operacional. Nós cuidamos da organização para você focar no resultado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏢
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Isolamento Seguro</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Arquitetura Multi-Tenant de nível empresarial. Seus dados, times e tarefas são isolados de forma criptográfica, garantindo privacidade total para o seu negócio.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                👥
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gestão de Times</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Crie squads ágeis e atribua membros em poucos cliques. O painel administrativo centraliza a criação e o controle de acessos da sua equipe.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-6">
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

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <span className="text-white font-bold text-lg flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-xs">O</span>
            OrganizaTask
          </span>
          <p className="text-sm">© 2026 OrganizaTask. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}