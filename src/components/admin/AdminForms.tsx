import { useState } from 'react';
import { api } from '../../services/api';
import type { Team, User } from '../../types';

interface AdminFormsProps {
  teams: Team[];
  users: User[];
  onSuccess: () => void;
  showToast: (msg: string, isError?: boolean) => void;
}

export function AdminForms({ teams, users, onSuccess, showToast }: AdminFormsProps) {
  const [teamName, setTeamName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskTeamId, setTaskTeamId] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');

  const [loading, setLoading] = useState(false);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/teams', { name: teamName });
      showToast('Time criado com sucesso!');
      setTeamName('');
      onSuccess();
    } catch (error: any) { showToast(error.response?.data?.error || 'Erro ao criar time', true); }
    finally { setLoading(false); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users', { name: userName, email: userEmail, password: userPassword, role: 'member' });
      showToast('Usuário cadastrado com sucesso!');
      setUserName(''); setUserEmail(''); setUserPassword('');
      onSuccess();
    } catch (error: any) { showToast(error.response?.data?.error || 'Erro ao criar usuário', true); }
    finally { setLoading(false); }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = { title: taskTitle, description: taskDescription, priority: taskPriority, team_id: Number(taskTeamId) };
      if (taskAssignee) payload.assigned_to = Number(taskAssignee);
      await api.post('/tasks', payload);
      showToast('Tarefa atribuída com sucesso!');
      setTaskTitle(''); setTaskDescription(''); setTaskTeamId(''); setTaskAssignee('');
      onSuccess();
    } catch (error: any) { showToast(error.response?.data?.error || 'Erro ao criar tarefa', true); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <form onSubmit={handleCreateTeam} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-100 transition-colors">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">🏢 Estruturar Novo Squad</h3>
          <input type="text" placeholder="Nome do Time (Ex: Backend, Marketing)" required value={teamName} onChange={(e) => setTeamName(e.target.value)} disabled={loading} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm mb-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50" />
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50">Criar Time</button>
        </form>

        <form onSubmit={handleCreateUser} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-100 transition-colors">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">👤 Integrar Novo Membro</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="text" placeholder="Nome Completo" required value={userName} onChange={(e) => setUserName(e.target.value)} disabled={loading} className="col-span-2 p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50" />
            <input type="email" placeholder="E-mail" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50" />
            <input type="password" placeholder="Senha provisória" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50">Cadastrar Usuário</button>
        </form>
      </div>

      <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 hover:border-indigo-100 transition-colors">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">✅ Delegar Nova Tarefa</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="O que precisa ser feito?" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50" />
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50">
            <option value="high">🔥 Prioridade Alta</option>
            <option value="medium">⚡ Prioridade Média</option>
            <option value="low">☕ Prioridade Baixa</option>
          </select>
          <select required value={taskTeamId} onChange={(e) => setTaskTeamId(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50">
            <option value="" disabled>Selecione o Squad...</option>
            {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <select value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} disabled={loading} className="p-2.5 border border-slate-300 rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50">
            <option value="">Aberto para o Squad</option>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <textarea placeholder="Forneça o contexto e os detalhes necessários para a execução..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} disabled={loading} className="w-full p-3 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none mb-4 disabled:opacity-50" />
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm shadow-indigo-600/30">Lançar Tarefa para o Time</button>
      </form>
    </>
  );
}