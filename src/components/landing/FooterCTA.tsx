import { Link } from 'react-router-dom';

export function FooterCTA() {
  return (
    <>
      <section className="py-24 bg-indigo-600 px-6 text-center relative overflow-hidden">
        {/* Padrão visual */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Pare de gerenciar planilhas.<br/>Comece a gerenciar resultados.</h2>
          <Link to="/login" className="inline-block px-12 py-5 bg-slate-900 text-white font-bold rounded-xl shadow-2xl hover:bg-black hover:scale-105 transition-all text-xl">
            Criar Conta Gratuita
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-white font-bold text-xl flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm">O</span>
            OrganizaTask
          </span>
          <p className="text-sm font-medium">Construído com excelência em React & Node.js. © 2026.</p>
        </div>
      </footer>
    </>
  );
}