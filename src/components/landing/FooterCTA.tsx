import { Link } from 'react-router-dom';

export function FooterCTA() {
  return (
    <>
      {/* CTA Final de Alto Contraste */}
      <section className="py-24 bg-slate-900 px-6 text-center border-t border-slate-800 relative overflow-hidden">
        {/* Efeito visual sutil de luz no fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Chega de perder tarefas no chat.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10">
            Junte-se a outros líderes técnicos que já otimizaram seus fluxos de trabalho. O workspace do seu time fica pronto em 1 minuto.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:-translate-y-1 active:translate-y-0 transition-all text-base"
          >
            Começar Gratuitamente
          </Link>
        </div>
      </section>

      {/* Footer Profissional com Links Funcionais */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 text-sm text-slate-500">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo e Info */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-black text-xl text-slate-800 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs shadow-sm">O</span>
              OrganizaTask
            </span>
            <p className="mb-4 text-slate-500 leading-relaxed">
              Software de gestão e produtividade projetado para equipes de alto desempenho.
            </p>
          </div>

          {/* Produto (Âncoras e Redirecionamentos Internos) */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Produto</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="hover:text-indigo-600 transition-colors">Funcionalidades</a></li>
              <li><Link to="/login" className="hover:text-indigo-600 transition-colors">Acessar Painel</Link></li>
            </ul>
          </div>
          
          {/* Recursos (Links para Repositórios ou E-mail) */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="" className="hover:text-indigo-600 transition-colors">Central de Ajuda</a></li>
              <li><a href="https://github.com/leonard0antonio/task-manager-api" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">API Documentation</a></li>
              {/* Status de servidor para dar um ar Enterprise */}
              <li><Link to="/login" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">Status <span className="flex w-2 h-2 rounded-full bg-emerald-500"></span></Link></li>
            </ul>
          </div>

          {/* Empresa (Seus Links de Portfólio) */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">O Desenvolvedor</h4>
            <ul className="space-y-3">
              <li><a href="https://www.linkedin.com/in/leonardo-a-a063b519b/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Sobre o Criador</a></li>
              <li><a href="https://github.com/leonard0antonio?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Outros Projetos</a></li>
              <li><a href="https://www.linkedin.com/in/leonardo-a-a063b519b/" className="hover:text-indigo-600 transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        {/* Linha Final: Copyright e Redes Sociais */}
        <div className="max-w-6xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-medium">
            © {new Date().getFullYear()} OrganizaTask. Desenvolvido no Porto Digital por <span className="text-slate-700 font-bold">Leonardo</span>.
          </p>
          
          <div className="flex gap-4">
            {/* Ícone Real do GitHub */}
            <a href="https://github.com/leonard0antonio?tab=repositories" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors flex items-center justify-center" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Ícone Real do LinkedIn */}
            <a href="https://www.linkedin.com/in/leonardo-a-a063b519b/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors flex items-center justify-center" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}