export function Showcase() {
  return (
    <section className="py-24 bg-slate-900 text-white px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Uma plataforma, duas visões</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">O OrganizaTask se adapta a quem está usando. Gestores veem o panorama geral. Desenvolvedores e analistas veem apenas o que precisam entregar.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl mb-5">📊</div>
              <h3 className="text-xl font-bold mb-2">Visão Global para Líderes</h3>
              <p className="text-slate-400 text-base leading-relaxed">Painel administrativo completo para você criar times (Squads), gerenciar acessos de membros e monitorar a produtividade geral sem precisar perguntar o status no chat.</p>
            </div>
            
            <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-5">🎯</div>
              <h3 className="text-xl font-bold mb-2">Workspace Limpo para o Time</h3>
              <p className="text-slate-400 text-base leading-relaxed">Quando um membro do time acessa, a interface é focada na execução. Apenas as tarefas do seu departamento, com botões rápidos para mudar status para "Concluído".</p>
            </div>
          </div>

          {/* Mockup Realista de Interface */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-2xl shadow-indigo-900/20 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
            
            {/* Header do Mockup */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">LS</div>
                <div>
                  <div className="text-sm font-bold text-slate-200">Leonardo Silva</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Administrador</div>
                </div>
              </div>
              <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">Meu Painel</div>
            </div>
            
            {/* Cards de Tarefas Reais */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Atividades Recentes</div>
              
              {/* Tarefa 1 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 group-hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-slate-200">Refatorar API de Login (TypeScript)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-bold">EM ANDAMENTO</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                  <span className="flex items-center gap-1">🏢 Squad Backend</span>
                  <span className="flex items-center gap-1">👤 Carlos A.</span>
                </div>
              </div>

              {/* Tarefa 2 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 group-hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-slate-200">Criar Landing Page Responsiva</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">CONCLUÍDO</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                  <span className="flex items-center gap-1">🏢 Squad Frontend</span>
                  <span className="flex items-center gap-1">👤 Marina T.</span>
                </div>
              </div>
            </div>

            {/* Degradê cobrindo a parte de baixo pra dar estilo de prévia */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}