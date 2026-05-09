import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Team } from '../types';
import type { User } from '../types';

interface AdminPanelProps {
  onTaskCreated: () => void;
}

export function AdminPanel({ onTaskCreated }: AdminPanelProps) {
  // Estados para as Listagens (Dropdowns)
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Estados dos Formulários
  const [teamName, setTeamName] = useState('');
  const [teamMsg, setTeamMsg] = useState({ text: '', isError: false });

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userMsg, setUserMsg] = useState({ text: '', isError: false });

  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskTeamId, setTaskTeamId] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskMsg, setTaskMsg] = useState({ text: '', isError: false });

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (error) { console.error('Erro ao carregar times'); }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) { console.error('Erro ao carregar usuários'); }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teams', { name: teamName });
      setTeamMsg({ text: 'Time criado!', isError: false });
      setTeamName('');
      fetchTeams();
    } catch (error: any) {
      setTeamMsg({ text: error.response?.data?.error || 'Erro', isError: true });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aproveitamos a rota de register para criar o membro por baixo dos panos
      await api.post('/auth/register', { name: userName, email: userEmail, password: userPassword, role: 'member' });
      setUserMsg({ text: 'Usuário criado!', isError: false });
      setUserName(''); setUserEmail(''); setUserPassword('');
      fetchUsers(); // Atualiza a lista de usuários na hora!
    } catch (error: any) {
      setUserMsg({ text: error.response?.data?.error || 'Erro', isError: true });
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { title: taskTitle, priority: taskPriority, team_id: Number(taskTeamId) };
      if (taskAssignee) payload.assigned_to = Number(taskAssignee);

      await api.post('/tasks', payload);
      setTaskMsg({ text: 'Tarefa criada!', isError: false });
      setTaskTitle(''); setTaskTeamId(''); setTaskAssignee('');
      onTaskCreated();
    } catch (error: any) {
      setTaskMsg({ text: error.response?.data?.error || 'Erro', isError: true });
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl mb-8 shadow-sm">
      <h2 className="text-xl font-bold text-indigo-800 mb-4">👑 Painel do Administrador</h2>
      
      {/* Linha 1: Criar Time & Criar Usuário */}
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
            <input type="password" placeholder="Senha provisória" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700">Cadastrar Usuário</button>
          {userMsg.text && <p className={`text-xs font-bold mt-2 text-center ${userMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{userMsg.text}</p>}
        </form>

      </div>

      {/* Linha 2: Criar Tarefa */}
      <form onSubmit={handleCreateTask} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
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

          {/* A MÁGICA: Dropdown de Usuários! */}
          <select value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white">
            <option value="">Sem atribuição (Aberto)</option>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>

        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700">Cadastrar Tarefa</button>
        {taskMsg.text && <p className={`text-xs font-bold mt-2 text-center ${taskMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{taskMsg.text}</p>}
      </form>

    </div>
  );
}