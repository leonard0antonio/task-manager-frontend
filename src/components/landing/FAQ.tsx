export function FAQ() {
  const faqs = [
    { q: "O sistema é realmente seguro para os dados da minha empresa?", a: "Sim. Utilizamos uma arquitetura Multi-Tenant com chaves estrangeiras (Foreign Keys) rigorosas no PostgreSQL. Todo dado inserido recebe o 'carimbo' do Administrador, tornando o vazamento entre contas tecnicamente impossível." },
    { q: "Meus funcionários precisam pagar para usar?", a: "Não. A conta do Administrador centraliza a gestão. Você pode convidar quantos funcionários quiser e eles acessam a plataforma gratuitamente pelo seu workspace." },
    { q: "Como funciona a atribuição de tarefas?", a: "Você pode criar uma tarefa e deixá-la 'Aberta' para um Time inteiro resolver, ou delegar nominalmente para um usuário específico do sistema. A escolha é do líder." }
  ];

  return (
    <section className="py-24 bg-white px-6 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-center text-slate-900 mb-16">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.q}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}