import { Link } from 'react-router-dom';

export function FooterCTA() {
  return (
    <>
      <section className="py-20 bg-white border-t border-slate-200 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Pronto para organizar sua operação?</h2>
          <p className="text-slate-600 text-lg mb-8">Junte-se a outros líderes técnicos que já otimizaram seus fluxos de trabalho. Crie sua conta em menos de 1 minuto.</p>
          <Link to="/login" className="inline-block px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/25 transition-all hover:-translate-y-0.5 text-base">
            Começar Gratuitamente
          </Link>
        </div>
      </section>

      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 text-sm text-slate-500">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e Info */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-black text-xl text-slate-800 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-xs">O</span>
              OrganizaTask
            </span>
            <p className="mb-4 text-slate-500">Software de gestão e produtividade projetado para equipes de alto desempenho.</p>
          </div>

          {/* Links Fictícios que dão credibilidade */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Produto</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-indigo-600 transition">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Preços</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-indigo-600 transition">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-indigo-600 transition">Sobre nós</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 OrganizaTask. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition cursor-pointer flex items-center justify-center text-xs">𝕏</span>
            <span className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition cursor-pointer flex items-center justify-center text-xs">in</span>
          </div>
        </div>
      </footer>
    </>
  );
}