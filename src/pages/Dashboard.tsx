import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Task, Team, User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AdminPanel } from '../components/AdminPanel';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modais
  const [editModal, setEditModal] = useState<{ isOpen: boolean; task: any | null }>({ isOpen: false, task: null });
  const [viewTaskModal, setViewTaskModal] = useState<{ isOpen: boolean; task: Task | null }>({ isOpen: false, task: null });
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [toast, setToast] = useState({ show: false, text: '', isError: false });

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

  const showToast = (text: string, isError = false) => {
    setToast({ show: true, text, isError });
    setTimeout(() => setToast({ show: false, text: '', isError: false }), 3000);
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();
      showToast(newStatus === 'completed' ? 'Demanda concluída!' : 'Demanda reaberta!');
    } catch (error) { showToast('Erro ao atualizar o status.', true); }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Esta ação é irreversível. Deseja remover a demanda do workspace?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
      showToast('Demanda excluída!', false);
    } catch (error) { showToast('Erro ao excluir tarefa.', true); }
  };

  const openEditModal = async (task: Task) => {
    setEditModal({ isOpen: true, task: { ...task } });
    if (teams.length === 0) {
      try {
        const [resTeams, resUsers] = await Promise.all([api.get('/teams'), api.get('/users')]);
        setTeams(resTeams.data);
        setUsers(resUsers.data);
      } catch (e) { console.error("Erro ao carregar os dados de times e membros."); }
    }
  };

  const executeEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: editModal.task.title,
        description: editModal.task.description,
        priority: editModal.task.priority,
        team_id: Number(editModal.task.team_id),
        assigned_to: editModal.task.assigned_to ? Number(editModal.task.assigned_to) : null,
      };
      await api.put(`/tasks/${editModal.task.id}`, payload);
      setEditModal({ isOpen: false, task: null });
      fetchTasks();
      showToast('Demanda atualizada!');
    } catch (error) { showToast('Erro ao salvar as alterações.', true); }
  };

  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase();
    const titleMatch = task.title.toLowerCase().includes(query);
    const descMatch = task.description?.toLowerCase().includes(query);
    return titleMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* NAVBAR OFICIAL */}
      <nav className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-sm">
              O
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              OrganizaTask<span className="text-indigo-500">.</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-300">
                Workspace de <b className="text-white">{user?.name}</b> <span className="text-slate-500 uppercase text-[10px] ml-1 bg-slate-800 px-2 py-0.5 rounded">{user?.role}</span>
              </span>
            </div>
            <button onClick={handleLogout} className="text-sm font-bold bg-slate-800 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 mt-4">
        
        {/* Painel Administrativo (Renderiza apenas se for Admin) */}
        {user?.role === 'admin' && <AdminPanel onTaskCreated={fetchTasks} />}

        {/* Header do Board */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 mt-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Demandas em andamento</h2>
            <p className="text-slate-500 text-sm mt-1">Visão geral do progresso da equipe.</p>
          </div>
          <button onClick={fetchTasks} className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all font-bold shadow-sm text-sm flex items-center gap-2 active:scale-95">
            <span>🔄</span> Atualizar Board
          </button>
        </div>

        {/* BARRA DE PESQUISA (Busca Instantânea) */}
        {!loading && tasks.length > 0 && (
          <div className="mb-8">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Busque por título ou palavras-chave na descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 p-4 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm text-slate-700 font-medium"
              />
            </div>
          </div>
        )}

        {/* Board Principal */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-2xl border border-dashed border-slate-300 text-slate-500 shadow-sm">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Caixa de entrada limpa!</h3>
            <p className="text-sm">Nenhuma demanda atribuída ao workspace no momento.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-slate-500 shadow-sm">
            Nenhuma demanda combinou com a busca por: <b className="text-slate-800">"{searchQuery}"</b>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2">{task.title}</h3>
                    <span className={`text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider shrink-0
                      ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-5 min-h-[40px] line-clamp-2 leading-relaxed">
                    {task.description || <span className="italic opacity-60">Sem descrição detalhada.</span>}
                  </p>
                  
                  <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Squad:</span>
                      <span className="font-bold text-slate-800">{task.team?.name || `ID: ${task.team_id}`}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Responsável:</span>
                      <span className="font-bold text-indigo-600">{task.assignee?.name || 'Aberto'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Prioridade:</span>
                      <span className="font-bold text-slate-800 capitalize">{task.priority}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto border-t border-slate-100 pt-4">
                  {/* Botões de Status Rápido */}
                  {task.status !== 'completed' && (
                    <button onClick={() => handleStatusChange(task.id, 'completed')} className="flex-1 bg-slate-900 text-white font-bold py-2 rounded-lg text-xs hover:bg-indigo-600 transition-colors shadow-sm">
                      Marcar Concluído
                    </button>
                  )}
                  {task.status === 'completed' && (
                    <button onClick={() => handleStatusChange(task.id, 'in_progress')} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-2 rounded-lg text-xs hover:bg-slate-50 transition-colors shadow-sm">
                      Reabrir Demanda
                    </button>
                  )}
                  
                  {/* Botão de Ver Detalhes (Sempre disponível) */}
                  <button onClick={() => setViewTaskModal({ isOpen: true, task })} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors font-bold" title="Ler Descrição Completa">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>

                  {/* Ações de Admin */}
                  {user?.role === 'admin' && (
                    <>
                      <button onClick={() => openEditModal(task)} className="bg-amber-50 text-amber-600 px-3 py-2 rounded-lg text-sm hover:bg-amber-100 transition-colors font-bold" title="Editar Demanda">✏️</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition-colors font-bold" title="Excluir Definitivamente">🗑️</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================= */}
      {/* MODAIS (Visuais Premium)                    */}
      {/* ========================================= */}

      {/* Ver Detalhes da Tarefa */}
      {viewTaskModal.isOpen && viewTaskModal.task && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border-t-4 border-indigo-600 animate-fadeUp">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-slate-900 leading-tight pr-4">{viewTaskModal.task.title}</h3>
              <span className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider shrink-0 ${viewTaskModal.task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {viewTaskModal.task.status.replace('_', ' ')}
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-2">Contexto da Demanda</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {viewTaskModal.task.description || <span className="italic text-slate-400">Nenhum detalhe adicional fornecido.</span>}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Responsável</p><p className="font-semibold text-indigo-600">👤 {viewTaskModal.task.assignee?.name || 'Aberto'}</p></div>
              <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prioridade</p><p className="font-semibold text-slate-800 capitalize">🔥 {viewTaskModal.task.priority}</p></div>
            </div>
            <button onClick={() => setViewTaskModal({ isOpen: false, task: null })} className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/20">Fechar Painel</button>
          </div>
        </div>
      )}

      {/* Editar Tarefa (Admin) */}
      {editModal.isOpen && editModal.task && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Editar Demanda</h3>
            <form onSubmit={executeEditTask}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
                <input type="text" required value={editModal.task.title} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, title: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Prioridade</label>
                  <select value={editModal.task.priority} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, priority: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option value="high">🔥 Alta</option>
                    <option value="medium">⚡ Média</option>
                    <option value="low">☕ Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Squad Responsável</label>
                  <select required value={editModal.task.team_id} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, team_id: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Atribuir para (Opcional)</label>
                <select value={editModal.task.assigned_to || ''} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, assigned_to: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="">Deixar aberto para o Squad</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição Contextual</label>
                <textarea value={editModal.task.description || ''} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, description: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditModal({ isOpen: false, task: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification Premium */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-3.5 rounded-xl shadow-2xl font-bold text-sm text-white transform transition-all duration-300 animate-fadeUp z-50 ${toast.isError ? 'bg-red-600 shadow-red-600/20' : 'bg-slate-900 shadow-slate-900/20'}`}>
          <div className="flex items-center gap-2">
            <span>{toast.isError ? '⚠️' : '✅'}</span>
            {toast.text}
          </div>
        </div>
      )}

    </div>
  );
}