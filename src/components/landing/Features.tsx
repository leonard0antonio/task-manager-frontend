const featuresList = [
  { icon: '🏢', title: 'Privacidade total', desc: 'Sua empresa ganha um workspace isolado. Ninguém de fora tem acesso ao que sua equipe está construindo.' },
  { icon: '🔍', title: 'Busca instantânea', desc: 'Perdeu uma tarefa antiga? Digite no painel e encontre na mesma hora. Sem telas de carregamento.' },
  { icon: '👥', title: 'Divida em Squads', desc: 'Agrupe as pessoas por departamento. O marketing não precisa ver a fila de bugs da engenharia.' },
  { icon: '🚦', title: 'Visual e direto', desc: 'Pendente, em andamento ou concluído. Saiba exatamente onde cada projeto está travado (e quem está cuidando dele).' },
  { icon: '✨', title: 'Zero aprendizado', desc: 'Não precisa de manuais nem treinamentos. A interface foi desenhada para que qualquer pessoa do time saiba usar no primeiro acesso.' },
  { icon: '🛠️', title: 'Base sólida', desc: 'Construído em Node.js com banco PostgreSQL. Não importa se você tem 5 ou 500 tarefas, o sistema não engasga.' }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 px-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tudo que você precisa. Nada de excessos.</h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">Deixamos de fora as dezenas de botões inúteis que ninguém usa, e focamos no que faz seu time entregar mais rápido.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresList.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-slate-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}