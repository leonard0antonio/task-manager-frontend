import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 animate-fadeIn transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-xl font-bold text-xl shadow-lg shadow-indigo-600/20 group-hover:rotate-[-10deg] transition-transform duration-300">
            O
          </span>
          <span className="text-2xl font-black tracking-tight text-slate-800">
            OrganizaTask<span className="text-indigo-600"></span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Entrar na conta
          </Link>
          <Link to="/login" className="text-sm font-bold bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 shadow-md transition-all hover:scale-105 active:scale-95">
            Começar Grátis
          </Link>
        </div>
      </div>
    </nav>
  );
}