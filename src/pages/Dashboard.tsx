import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AdminPanel } from '../components/AdminPanel';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca as tarefas assim que a página carrega
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Superior */}
      <nav className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Olá, <b>{user?.name}</b> ({user?.role})
            </span>
            <button 
              onClick={handleLogout}
              className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded transition text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-6 mt-4">
        
        {/* Renderiza o Painel de Admin SOMENTE se a role for 'admin' */}
        {user?.role === 'admin' && (
          <AdminPanel onTaskCreated={fetchTasks} />
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Suas Tarefas</h2>
          <button 
            onClick={fetchTasks}
            className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50 transition font-medium shadow-sm text-sm"
          >
            🔄 Atualizar
          </button>
        </div>

        {/* Grid de Tarefas */}
        {loading ? (
          <p className="text-center text-slate-500 mt-10">Carregando tarefas...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl border border-dashed border-slate-300 text-slate-500">
            Nenhuma tarefa encontrada.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{task.title}</h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider
                    ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-emerald-100 text-emerald-800'}`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                
                {/* AQUI ESTÁ A CORREÇÃO DA DESCRIÇÃO */}
                <p className="text-sm text-slate-600 mb-4 min-h-[40px] italic">
                  {task.description ? task.description : "Sem descrição informada."}
                </p>
                
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    🏢 {task.team?.name || `Time ID: ${task.team_id}`}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-indigo-600">
                    👤 {task.assignee?.name || 'Não atribuída'}
                  </span>
                  <span className="mt-1">
                    Prioridade: <b className="uppercase">{task.priority}</b>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}