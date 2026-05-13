export function FAQ() {
  const faqs = [
    { 
      q: "Eu pago por cada funcionário que adicionar?", 
      a: "Não. Nós acreditamos que a comunicação da sua equipe não deve ser taxada. Apenas a conta de Administrador (que gerencia o workspace) assina o plano. Seu time acessa de graça." 
    },
    { 
      q: "Um departamento consegue ver as tarefas do outro?", 
      a: "Depende de como você configura. O sistema isola os dados nativamente. Se o João é do time de Vendas, o painel dele só mostrará o que o squad de Vendas precisa entregar." 
    },
    { 
      q: "Posso deixar uma tarefa sem dono?", 
      a: "Com certeza. É muito comum atribuir uma tarefa apenas a um 'Squad' (Time) e deixar em aberto. Assim, a própria equipe decide quem tem tempo livre para puxar aquela demanda." 
    },
    { 
      q: "O que acontece se eu apagar um usuário acidentalmente?", 
      a: "Nós criamos travas de segurança no banco de dados. O sistema não deixa você apagar um time ou usuário se houver tarefas atreladas a eles, evitando que as informações sumam do nada." 
    }
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Dúvidas Frequentes</h2>
          <p className="text-slate-600 text-lg">Respostas rápidas para você não perder tempo.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details 
              key={i} 
              className="group bg-slate-50 border border-slate-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-800 outline-none">
                <span className="pr-4">{faq.q}</span>
                <span className="relative flex shrink-0 items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 text-indigo-600 transition-transform duration-300 group-open:rotate-180">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed animate-fadeIn">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}