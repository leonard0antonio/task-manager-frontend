import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden">
      
      {/* 1. NAVBAR PÚBLICA */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 z-50 animate-fadeIn">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-sm group-hover:rotate-[-10deg] transition-transform duration-300">
              O
            </span>
            <span className="text-xl font-black tracking-tight text-slate-800">
              OrganizaTask
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all hover:translate-y-[-1px]">
              Já tenho conta
            </Link>
            <Link to="/login" className="text-sm font-bold bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-all hover:scale-105 active:scale-95">
              Acessar Painel
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (A Promessa Principal) */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Plataforma Multi-Tenant Ativa
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6 animate-fadeUp [animation-delay:150ms] opacity-0">
            Gerencie equipes com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">precisão</span> que sua empresa exige.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeUp [animation-delay:300ms] opacity-0">
            O OrganizaTask é o hub central para líderes que precisam de clareza. Atribua tarefas, organize times e acompanhe o progresso em tempo real, sem o caos das planilhas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp [animation-delay:450ms] opacity-0">
            <Link to="/login" className="w-full sm:w-auto text-center px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 animate-pulseScale">
              Começar a Organizar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* 3. VISÃO INTERNA E GESTÃO (Como gerir e o que faz) */}
      <section className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O Controle Absoluto nas Suas Mãos</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Entenda como o OrganizaTask separa o ruído da produtividade com painéis focados no que realmente importa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bloco de Texto Explicativo */}
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl shrink-0">👑</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Visão de Administrador (Centro de Comando)</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">Como gerente, você tem acesso ao <b>Painel Administrativo</b>. Lá você cria os squads de trabalho, cadastra novos funcionários, dita as regras e tem uma visão panorâmica de todas as tarefas da empresa em tempo real.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">🎯</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Visão do Membro (Foco Total)</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">Quando um funcionário faz login, a mágica do <b>Isolamento Multi-Tenant</b> acontece. Ele não vê as configurações da empresa, vê apenas o Dashboard limpo com as tarefas atribuídas ao time dele. Foco na execução, zero distrações.</p>
                </div>
              </div>
            </div>

            {/* Representação visual do Painel (Mockup abstrato com CSS) */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-slate-700/50 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="h-20 bg-slate-700/30 rounded-lg border border-slate-600/50 group-hover:bg-slate-700/50 transition"></div>
                  <div className="h-20 bg-slate-700/30 rounded-lg border border-slate-600/50 group-hover:bg-slate-700/50 transition"></div>
                  <div className="h-20 bg-slate-700/30 rounded-lg border border-slate-600/50 group-hover:bg-slate-700/50 transition"></div>
                </div>
                <div className="h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center px-4">
                  <div className="w-4 h-4 rounded bg-indigo-500 mr-3"></div>
                  <div className="h-2 bg-indigo-400/50 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-emerald-600/20 border border-emerald-500/30 rounded-lg flex items-center px-4">
                  <div className="w-4 h-4 rounded bg-emerald-500 mr-3"></div>
                  <div className="h-2 bg-emerald-400/50 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PASSO A PASSO (Como funciona a jornada) */}
      <section className="py-20 bg-slate-50 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">A Jornada do Fluxo Perfeito</h2>
            <p className="text-slate-600">Implementar gestão ágil nunca foi tão fácil. Veja como iniciar:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Linha conectora (visível apenas no desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>

            {[
              { step: 1, title: 'Crie seu Espaço', desc: 'Cadastre sua conta de Administrador. Seu workspace isolado nasce aqui.' },
              { step: 2, title: 'Monte as Equipes', desc: 'Adicione departamentos ou squads (ex: Dev, Design, Financeiro).' },
              { step: 3, title: 'Convide o Time', desc: 'Cadastre seus membros e atribua e-mails e senhas de acesso.' },
              { step: 4, title: 'Delegue e Vença', desc: 'Crie tarefas, defina prioridades e acompanhe a equipe entregar os resultados.' }
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 mx-auto bg-indigo-600 text-white font-black rounded-full flex items-center justify-center mb-4 shadow-md ring-4 ring-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION (Cards clássicos) */}
      <section className="py-20 bg-white px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Isolamento Seguro</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Seus dados e de seus funcionários não se misturam com outras empresas. Privacidade garantida pela arquitetura de ponta.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Filtro em Tempo Real</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Encontre rapidamente qualquer pendência através de um sistema de buscas local instantâneo pelo título ou descrição.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Status Imediato</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Atualize o status das entregas com um clique. Veja cards visuais que informam claramente se algo é de baixa, média ou alta prioridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-violet-700 px-6 text-center relative overflow-hidden">
        {/* Círculos decorativos ao fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Pronto para transformar sua gestão?</h2>
          <p className="text-indigo-100 text-lg mb-10">Junte-se à nova era de líderes que abandonaram a bagunça em favor da eficiência brutal.</p>
          <Link to="/login" className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-lg">
            Acessar o OrganizaTask
          </Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <span className="text-white font-bold text-lg flex items-center gap-2 group cursor-pointer">
            <span className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-xs group-hover:rotate-12 transition-transform">O</span>
            OrganizaTask
          </span>
          <p className="text-sm">Desenvolvido com tecnologia de ponta. © 2026 OrganizaTask.</p>
        </div>
      </footer>

    </div>
  );
}