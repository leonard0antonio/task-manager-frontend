const featuresList = [
  { icon: '🔒', title: 'Isolamento Multi-Tenant', desc: 'Silos de dados separados. As informações da sua empresa nunca se misturam com as de outros clientes.' },
  { icon: '⚡', title: 'Busca em Tempo Real', desc: 'Filtre milhares de tarefas instantaneamente pelo front-end, sem tempo de carregamento no servidor.' },
  { icon: '👥', title: 'Gestão de Times', desc: 'Estruture sua empresa em squads. Atribua tarefas diretamente a departamentos específicos.' },
  { icon: '📊', title: 'Auditoria de Status', desc: 'Acompanhe a evolução de Pendente para Concluído com indicadores visuais claros e responsivos.' },
  { icon: '🎨', title: 'UX Premium', desc: 'Interface limpa, modais interativos e feedbacks em Toast. O design trabalha a seu favor, não contra.' },
  { icon: '☁️', title: 'Nuvem Segura', desc: 'Back-end em Node.js com Prisma ORM e banco de dados relacional (PostgreSQL) garantindo integridade.' }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Tecnologia que impulsiona resultados</h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">Cada funcionalidade foi pensada para resolver dores reais de gestão e liderança técnica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}