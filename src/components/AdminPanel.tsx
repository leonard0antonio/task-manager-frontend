import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Team, User, Task } from '../types'; // Importe a tipagem Task

interface AdminPanelProps {
  onTaskCreated: () => void;
}

export function AdminPanel({ onTaskCreated }: AdminPanelProps) {
  // --- ESTADOS DE LISTAGEM ---
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // --- ESTADOS DE CRIAÇÃO ---
  const [teamName, setTeamName] = useState('');
  const [teamMsg, setTeamMsg] = useState({ text: '', isError: false });

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMsg, setUserMsg] = useState({ text: '', isError: false });

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskTeamId, setTaskTeamId] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskMsg, setTaskMsg] = useState({ text: '', isError: false });

  const [toast, setToast] = useState({ show: false, text: '', isError: false });
  
  // --- ESTADOS DE MODAIS ---
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: number | null }>({ isOpen: false, userId: null });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; user: User | null; newName: string }>({ isOpen: false, user: null, newName: '' });

  const [deleteTeamModal, setDeleteTeamModal] = useState<{ isOpen: boolean; teamId: number | null }>({ isOpen: false, teamId: null });
  const [editTeamModal, setEditTeamModal] = useState<{ isOpen: boolean; team: Team | null; newName: string }>({ isOpen: false, team: null, newName: '' });

  const [deleteTaskModal, setDeleteTaskModal] = useState<{ isOpen: boolean; taskId: number | null }>({ isOpen: false, taskId: null });
  const [editTaskModal, setEditTaskModal] = useState<{ isOpen: boolean; task: any | null }>({ isOpen: false, task: null });

  // --- BUSCA DE DADOS ---
  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = () => {
    fetchTeams();
    fetchUsers();
    fetchTasks();
  };

  const fetchTeams = async () => {
    try { const response = await api.get('/teams'); setTeams(response.data); } 
    catch (error) { console.error('Erro ao carregar times'); }
  };

  const fetchUsers = async () => {
    try { const response = await api.get('/users'); setUsers(response.data); } 
    catch (error) { console.error('Erro ao carregar usuários'); }
  };

  const fetchTasks = async () => {
    try { const response = await api.get('/tasks'); setTasks(response.data); } 
    catch (error) { console.error('Erro ao carregar tarefas'); }
  };

  const showToast = (text: string, isError = false) => {
    setToast({ show: true, text, isError });
    setTimeout(() => setToast({ show: false, text: '', isError: false }), 3000);
  };

  // --- FUNÇÕES DE CRIAÇÃO ---
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teams', { name: teamName });
      setTeamMsg({ text: 'Time criado!', isError: false });
      setTeamName('');
      refreshAll();
    } catch (error: any) { setTeamMsg({ text: error.response?.data?.error || 'Erro', isError: true }); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', { name: userName, email: userEmail, password: userPassword, role: 'member' });
      setUserMsg({ text: 'Usuário criado com sucesso!', isError: false });
      setUserName(''); setUserEmail(''); setUserPassword('');
      refreshAll();
    } catch (error: any) { setUserMsg({ text: error.response?.data?.error || 'Erro ao criar', isError: true }); }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { title: taskTitle, description: taskDescription, priority: taskPriority, team_id: Number(taskTeamId) };
      if (taskAssignee) payload.assigned_to = Number(taskAssignee);
      await api.post('/tasks', payload);
      setTaskMsg({ text: 'Tarefa criada!', isError: false });
      setTaskTitle(''); setTaskDescription(''); setTaskTeamId(''); setTaskAssignee('');
      refreshAll();
      onTaskCreated();
    } catch (error: any) { setTaskMsg({ text: error.response?.data?.error || 'Erro', isError: true }); }
  };

  // --- FUNÇÕES DE GESTÃO (USUÁRIOS) ---
  const executeDeleteUser = async () => {
    if (!deleteModal.userId) return;
    try {
      await api.delete(`/users/${deleteModal.userId}`);
      refreshAll();
      showToast("Usuário removido com sucesso!");
    } catch (error: any) { showToast(error.response?.data?.error || "Erro ao excluir o usuário", true); } 
    finally { setDeleteModal({ isOpen: false, userId: null }); }
  };
  
  const executeEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal.user) return;
    try {
      await api.patch(`/users/${editModal.user.id}`, { name: editModal.newName });
      refreshAll();
      showToast("Nome atualizado com sucesso!");
    } catch (error) { showToast("Erro ao editar usuário", true); } 
    finally { setEditModal({ isOpen: false, user: null, newName: '' }); }
  };

  // --- FUNÇÕES DE GESTÃO (TIMES) ---
  const executeDeleteTeam = async () => {
    if (!deleteTeamModal.teamId) return;
    try {
      await api.delete(`/teams/${deleteTeamModal.teamId}`);
      refreshAll();
      showToast("Time removido com sucesso!");
    } catch (error: any) { showToast(error.response?.data?.error || "Erro ao excluir o time", true); } 
    finally { setDeleteTeamModal({ isOpen: false, teamId: null }); }
  };
  
  const executeEditTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeamModal.team) return;
    try {
      await api.patch(`/teams/${editTeamModal.team.id}`, { name: editTeamModal.newName });
      refreshAll();
      showToast("Time atualizado com sucesso!");
    } catch (error) { showToast("Erro ao editar time", true); } 
    finally { setEditTeamModal({ isOpen: false, team: null, newName: '' }); }
  };

  // --- FUNÇÕES DE GESTÃO (TAREFAS) ---
  const executeDeleteTask = async () => {
    if (!deleteTaskModal.taskId) return;
    try {
      await api.delete(`/tasks/${deleteTaskModal.taskId}`);
      refreshAll();
      onTaskCreated(); // Avisa o Dashboard
      showToast("Tarefa removida com sucesso!");
    } catch (error: any) { showToast(error.response?.data?.error || "Erro ao excluir tarefa", true); } 
    finally { setDeleteTaskModal({ isOpen: false, taskId: null }); }
  };

  const executeEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTaskModal.task) return;
    try {
      const payload = {
        title: editTaskModal.task.title,
        description: editTaskModal.task.description,
        priority: editTaskModal.task.priority,
        team_id: Number(editTaskModal.task.team_id),
        assigned_to: editTaskModal.task.assigned_to ? Number(editTaskModal.task.assigned_to) : null,
      };
      await api.put(`/tasks/${editTaskModal.task.id}`, payload);
      refreshAll();
      onTaskCreated(); // Avisa o Dashboard
      showToast("Tarefa atualizada com sucesso!");
    } catch (error) { showToast("Erro ao editar tarefa", true); } 
    finally { setEditTaskModal({ isOpen: false, task: null }); }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl mb-8 shadow-sm relative">
      <h2 className="text-xl font-bold text-indigo-800 mb-4">👑 Painel do Administrador</h2>
      
      {/* LINHA 1: Criar Time e Usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <form onSubmit={handleCreateTeam} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">🏢 Criar Novo Time</h3>
          <input type="text" placeholder="Nome do Time" required value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm mb-3 outline-none" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700">Criar Time</button>
          {teamMsg.text && <p className={`text-xs font-bold mt-2 text-center ${teamMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{teamMsg.text}</p>}
        </form>

        <form onSubmit={handleCreateUser} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">👤 Adicionar Novo Membro</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input type="text" placeholder="Nome" required value={userName} onChange={(e) => setUserName(e.target.value)} className="col-span-2 p-2 border border-slate-300 rounded-md text-sm outline-none" />
            <input type="email" placeholder="E-mail" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none" />
            <input type="password" placeholder="Senha" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700">Cadastrar Usuário</button>
          {userMsg.text && <p className={`text-xs font-bold mt-2 text-center ${userMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{userMsg.text}</p>}
        </form>
      </div>

      {/* LINHA 2: Criar Tarefa */}
      <form onSubmit={handleCreateTask} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 mb-6">
        <h3 className="font-semibold text-slate-700 mb-3">✅ Criar e Atribuir Tarefa</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <input type="text" placeholder="Título" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none" />
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
            <option value="high">Prioridade Alta</option>
            <option value="medium">Prioridade Média</option>
            <option value="low">Prioridade Baixa</option>
          </select>
          <select required value={taskTeamId} onChange={(e) => setTaskTeamId(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
            <option value="" disabled>Selecione o Time...</option>
            {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <select value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
            <option value="">Sem atribuição (Aberto)</option>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <textarea placeholder="Descrição detalhada da tarefa..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none h-20 resize-none mb-3" />
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition">Cadastrar Tarefa</button>
        {taskMsg.text && <p className={`text-xs font-bold mt-2 text-center ${taskMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{taskMsg.text}</p>}
      </form>

      {/* LINHA 3: Gestão Completa (Tabelas) */}
      <div className="space-y-6">
        
        {/* Tabela de Tarefas */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📝 Gestão de Tarefas</h3>
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Nenhuma tarefa encontrada.</p>
          ) : (
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] sticky top-0">
                  <tr>
                    <th className="p-3">Título</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Responsável</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-700">{t.title}</td>
                      <td className="p-3 text-slate-500">{t.team?.name}</td>
                      <td className="p-3 text-indigo-600 font-medium">{t.assignee?.name || 'Aberto'}</td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 flex gap-4">
                        <button onClick={() => setEditTaskModal({ isOpen: true, task: { ...t } })} className="text-amber-600 hover:text-amber-800 font-medium">Editar</button>
                        <button onClick={() => setDeleteTaskModal({ isOpen: true, taskId: t.id })} className="text-red-600 hover:text-red-800 font-medium">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabelas de Times e Usuários Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">🏢 Times Cadastrados</h3>
            {teams.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum time cadastrado.</p>
            ) : (
              <div className="overflow-x-auto max-h-60 overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="p-3 rounded-tl-md">ID</th>
                      <th className="p-3">Nome</th>
                      <th className="p-3 rounded-tr-md">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teams.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-medium text-slate-400">#{t.id}</td>
                        <td className="p-3 font-medium text-slate-700">{t.name}</td>
                        <td className="p-3 flex gap-4">
                          <button onClick={() => setEditTeamModal({ isOpen: true, team: t, newName: t.name })} className="text-indigo-600 hover:text-indigo-800 font-medium">Editar</button>
                          <button onClick={() => setDeleteTeamModal({ isOpen: true, teamId: t.id })} className="text-red-600 hover:text-red-800 font-medium">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">👥 Meus Usuários</h3>
            {users.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum membro cadastrado.</p>
            ) : (
              <div className="overflow-x-auto max-h-60 overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="p-3 rounded-tl-md">Nome</th>
                      <th className="p-3">E-mail</th>
                      <th className="p-3 rounded-tr-md">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-medium text-slate-700">{u.name}</td>
                        <td className="p-3 text-slate-500">{u.email}</td>
                        <td className="p-3 flex gap-4">
                          <button onClick={() => setEditModal({ isOpen: true, user: u, newName: u.name })} className="text-indigo-600 hover:text-indigo-800 font-medium">Editar</button>
                          <button onClick={() => setDeleteModal({ isOpen: true, userId: u.id })} className="text-red-600 hover:text-red-800 font-medium">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MODAIS */}
      {/* ========================================= */}

      {/* Modais de USUÁRIOS */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Confirmar Exclusão</h3>
            <p className="text-sm text-slate-600 mb-6">Tem certeza que deseja remover este usuário?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteModal({ isOpen: false, userId: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancelar</button>
              <button onClick={executeDeleteUser} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">Sim, excluir</button>
            </div>
          </div>
        </div>
      )}

      {editModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Editar Usuário</h3>
            <form onSubmit={executeEditUser}>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Usuário</label>
              <input type="text" required value={editModal.newName} onChange={(e) => setEditModal({ ...editModal, newName: e.target.value })} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none mb-6" />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditModal({ isOpen: false, user: null, newName: '' })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modais de TIMES */}
      {deleteTeamModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Excluir Time</h3>
            <p className="text-sm text-slate-600 mb-6">Tem certeza que deseja remover este time? Ele deve estar sem tarefas cadastradas.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTeamModal({ isOpen: false, teamId: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancelar</button>
              <button onClick={executeDeleteTeam} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">Sim, excluir</button>
            </div>
          </div>
        </div>
      )}

      {editTeamModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Editar Time</h3>
            <form onSubmit={executeEditTeam}>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Time</label>
              <input type="text" required value={editTeamModal.newName} onChange={(e) => setEditTeamModal({ ...editTeamModal, newName: e.target.value })} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none mb-6" />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditTeamModal({ isOpen: false, team: null, newName: '' })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modais de TAREFAS (Novos) */}
      {deleteTaskModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Excluir Tarefa</h3>
            <p className="text-sm text-slate-600 mb-6">Tem certeza que deseja apagar esta tarefa do sistema?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTaskModal({ isOpen: false, taskId: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancelar</button>
              <button onClick={executeDeleteTask} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">Sim, excluir</button>
            </div>
          </div>
        </div>
      )}

      {editTaskModal.isOpen && editTaskModal.task && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Editar Tarefa</h3>
            <form onSubmit={executeEditTask}>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Título</label>
                <input type="text" required value={editTaskModal.task.title} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, title: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Prioridade</label>
                  <select value={editTaskModal.task.priority} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, priority: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Time Responsável</label>
                  <select required value={editTaskModal.task.team_id} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, team_id: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                    {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Atribuir para (Opcional)</label>
                <select value={editTaskModal.task.assigned_to || ''} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, assigned_to: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
                  <option value="">Sem atribuição (Aberto)</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Descrição</label>
                <textarea value={editTaskModal.task.description || ''} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, description: e.target.value}})} className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none h-20 resize-none" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditTaskModal({ isOpen: false, task: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg font-medium text-sm text-white transform transition-all duration-300 ${toast.isError ? 'bg-red-600' : 'bg-emerald-600'} z-50`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}