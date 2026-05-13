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

  // Estados para o Modal de Edição
  const [editModal, setEditModal] = useState<{ isOpen: boolean; task: any | null }>({ isOpen: false, task: null });
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
    } catch (error) { showToast('Erro ao atualizar o status.', true); }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
      showToast('Tarefa excluída!', false);
    } catch (error) { showToast('Erro ao excluir tarefa.', true); }
  };

  // --- Lógica de Edição ---
  const openEditModal = async (task: Task) => {
    setEditModal({ isOpen: true, task: { ...task } }); // Clona a tarefa pro modal
    // Busca os times e usuários se ainda não os tivermos na memória
    if (teams.length === 0) {
      try {
        const [resTeams, resUsers] = await Promise.all([api.get('/teams'), api.get('/users')]);
        setTeams(resTeams.data);
        setUsers(resUsers.data);
      } catch (e) { console.error("Erro ao buscar dependências pro modal"); }
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
      showToast('Tarefa editada com sucesso!');
    } catch (error) { showToast('Erro ao salvar edição.', true); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Olá, <b>{user?.name}</b> ({user?.role})</span>
            <button onClick={handleLogout} className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded transition text-sm">Sair</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-4">
        {user?.role === 'admin' && <AdminPanel onTaskCreated={fetchTasks} />}

        <div className="flex justify-between items-center mb-6 mt-8">
          <h2 className="text-2xl font-bold text-slate-800">Tarefas do Projeto</h2>
          <button onClick={fetchTasks} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50 transition font-medium shadow-sm text-sm">🔄 Atualizar</button>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 mt-10">Carregando tarefas...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl border border-dashed border-slate-300 text-slate-500">Nenhuma tarefa encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{task.title}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider
                      ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 min-h-[40px] italic">{task.description || "Sem descrição informada."}</p>
                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-1 mb-4">
                    <span className="flex items-center gap-1">🏢 {task.team?.name || `Time ID: ${task.team_id}`}</span>
                    <span className="flex items-center gap-1 font-medium text-indigo-600">👤 {task.assignee?.name || 'Não atribuída'}</span>
                    <span className="mt-1">Prioridade: <b className="uppercase">{task.priority}</b></span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto border-t border-slate-100 pt-3">
                  {task.status !== 'completed' && (
                    <button onClick={() => handleStatusChange(task.id, 'completed')} className="flex-1 bg-emerald-50 text-emerald-700 font-medium py-1.5 rounded text-sm hover:bg-emerald-100 transition border border-emerald-200">✅ Concluir</button>
                  )}
                  {task.status === 'completed' && (
                    <button onClick={() => handleStatusChange(task.id, 'in_progress')} className="flex-1 bg-blue-50 text-blue-700 font-medium py-1.5 rounded text-sm hover:bg-blue-100 transition border border-blue-200">⏪ Reabrir</button>
                  )}
                  
                  {/* AÇÕES DE ADMIN: EDITAR E EXCLUIR */}
                  {user?.role === 'admin' && (
                    <>
                      <button onClick={() => openEditModal(task)} className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded text-sm hover:bg-amber-100 transition border border-amber-200" title="Editar Tarefa">✏️</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded text-sm hover:bg-red-100 transition border border-red-200" title="Excluir Tarefa">🗑️</button>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================= */}
      {/* MODAL DE EDIÇÃO DE TAREFA                 */}
      {/* ========================================= */}
      {editModal.isOpen && editModal.task && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Editar Tarefa</h3>
            <form onSubmit={executeEditTask}>
              
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Título</label>
                <input type="text" required value={editModal.task.title} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, title: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Prioridade</label>
                  <select value={editModal.task.priority} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, priority: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Time Responsável</label>
                  <select required value={editModal.task.team_id} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, team_id: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                    {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Atribuir para (Opcional)</label>
                <select value={editModal.task.assigned_to || ''} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, assigned_to: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                  <option value="">Sem atribuição (Aberto)</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Descrição</label>
                <textarea value={editModal.task.description || ''} onChange={(e) => setEditModal({...editModal, task: {...editModal.task, description: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none h-20 resize-none" />
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditModal({ isOpen: false, task: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition">Salvar Alterações</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Notificação Flutuante (Toast) */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg font-medium text-sm text-white transform transition-all duration-300 ${toast.isError ? 'bg-red-600' : 'bg-emerald-600'} z-50`}>
          {toast.text}
        </div>
      )}

    </div>
  );
}