export function Showcase() {
  return (
    <section className="py-24 bg-slate-900 text-white px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Arquitetura de Dupla Visão</h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl">O OrganizaTask separa estrategicamente a visão gerencial da visão operacional, garantindo que cada usuário veja apenas o que importa.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl mb-6">👑</div>
              <h3 className="text-2xl font-bold mb-3">O Centro de Comando (Admin)</h3>
              <p className="text-slate-400 leading-relaxed text-lg">Crie times, adicione membros e tenha controle granular sobre cada tarefa. O Admin Panel é a torre de controle isolada exclusiva da sua empresa.</p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Foco Extremo (Membros)</h3>
              <p className="text-slate-400 leading-relaxed text-lg">Quando seu time faz login, não há distrações. Eles visualizam apenas o painel de tarefas de seus respectivos squads, garantindo execução silenciosa e ágil.</p>
            </div>
          </div>

          {/* Mockup visual dinâmico */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group h-[500px] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
            <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate-700">
              <div className="w-4 h-4 rounded-full bg-slate-600"></div>
              <div className="h-4 bg-slate-700 rounded w-1/3"></div>
            </div>
            
            <div className="flex-1 space-y-4">
               {/* Simulação de Tabela Admin */}
               <div className="h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center px-4 mb-8 transform group-hover:scale-[1.02] transition-transform">
                 <span className="text-indigo-400 font-bold text-sm">Visão Admin Ativa</span>
               </div>
               
               <div className="grid grid-cols-3 gap-4 mb-4">
                 <div className="h-24 bg-slate-700/40 rounded-xl"></div>
                 <div className="h-24 bg-slate-700/40 rounded-xl"></div>
                 <div className="h-24 bg-slate-700/40 rounded-xl"></div>
               </div>
               
               <div className="h-16 bg-slate-700/20 rounded-xl w-full"></div>
               <div className="h-16 bg-slate-700/20 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}