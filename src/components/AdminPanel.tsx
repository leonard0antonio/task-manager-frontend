import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Team } from '../types'; // Certifique-se de que a interface Team está no seu types/index.ts

interface AdminPanelProps {
  onTaskCreated: () => void;
}

export function AdminPanel({ onTaskCreated }: AdminPanelProps) {
  const [teamName, setTeamName] = useState('');
  const [teamMsg, setTeamMsg] = useState({ text: '', isError: false });

  // NOVO: Estado para guardar a lista de times
  const [teams, setTeams] = useState<Team[]>([]);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskTeamId, setTaskTeamId] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskMsg, setTaskMsg] = useState({ text: '', isError: false });

  // NOVO: Busca os times assim que o painel carrega
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Erro ao carregar times');
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teams', { name: teamName });
      setTeamMsg({ text: 'Time criado com sucesso!', isError: false });
      setTeamName('');
      fetchTeams(); // NOVO: Atualiza a listagem de times na hora!
    } catch (error: any) {
      setTeamMsg({ text: error.response?.data?.error || 'Erro ao criar time', isError: true });
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: taskTitle,
        priority: taskPriority,
        team_id: Number(taskTeamId),
      };
      if (taskAssignee) payload.assigned_to = Number(taskAssignee);

      await api.post('/tasks', payload);
      setTaskMsg({ text: 'Tarefa criada com sucesso!', isError: false });
      
      setTaskTitle('');
      setTaskTeamId('');
      setTaskAssignee('');
      onTaskCreated();
    } catch (error: any) {
      setTaskMsg({ text: error.response?.data?.error || 'Erro ao criar tarefa', isError: true });
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl mb-8 shadow-sm">
      <h2 className="text-xl font-bold text-indigo-800 mb-4">👑 Painel do Administrador</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <form onSubmit={handleCreateTeam} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">Criar Novo Time</h3>
          <input 
            type="text" placeholder="Nome do Time" required value={teamName} onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md text-sm mb-3 focus:ring-indigo-500 outline-none"
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition">
            Criar Time
          </button>
          {teamMsg.text && <p className={`text-xs font-bold mt-2 text-center ${teamMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{teamMsg.text}</p>}
        </form>

        <form onSubmit={handleCreateTask} className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">Criar e Atribuir Tarefa</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <input 
              type="text" placeholder="Título" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
              className="col-span-1 sm:col-span-2 p-2 border border-slate-300 rounded-md text-sm outline-none"
            />
            <select 
              value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}
              className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white"
            >
              <option value="high">Prioridade Alta</option>
              <option value="medium">Prioridade Média</option>
              <option value="low">Prioridade Baixa</option>
            </select>
            
            {/* NOVO: Aqui estava o input de texto, agora é um SELECT dinâmico! */}
            <select 
              required
              value={taskTeamId} 
              onChange={(e) => setTaskTeamId(e.target.value)}
              className="p-2 border border-slate-300 rounded-md text-sm outline-none bg-white"
            >
              <option value="" disabled>Selecione o Time...</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>

            <input 
              type="number" placeholder="ID Usuário (Opcional)" value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)}
              className="col-span-1 sm:col-span-2 lg:col-span-4 p-2 border border-slate-300 rounded-md text-sm outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition">
            Cadastrar Tarefa
          </button>
          {taskMsg.text && <p className={`text-xs font-bold mt-2 text-center ${taskMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>{taskMsg.text}</p>}
        </form>

      </div>
    </div>
  );
}