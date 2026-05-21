import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Team, User, Task } from '../types';
import { AdminForms } from './admin/AdminForms';
import { AdminTables } from './admin/AdminTables';
import { useAuth } from '../contexts/AuthContext'; // Importação do contexto de autenticação

interface AdminPanelProps {
  onTaskCreated: () => void;
}

export function AdminPanel({ onTaskCreated }: AdminPanelProps) {
  const { user } = useAuth(); // Puxando os dados do admin logado de forma dinâmica
  
  // O Mestre guarda o estado dos dados
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [toast, setToast] = useState({ show: false, text: '', isError: false });

  // Dispara a busca inicial
  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = () => {
    fetchTeams();
    fetchUsers();
    fetchTasks();
  };

  const fetchTeams = async () => { try { const res = await api.get('/teams'); setTeams(res.data); } catch (e) {} };
  const fetchUsers = async () => { try { const res = await api.get('/users'); setUsers(res.data); } catch (e) {} };
  const fetchTasks = async () => { try { const res = await api.get('/tasks'); setTasks(res.data); } catch (e) {} };

  // Sistema de notificação global do painel
  const showToast = (text: string, isError = false) => {
    setToast({ show: true, text, isError });
    setTimeout(() => setToast({ show: false, text: '', isError: false }), 3000);
  };

  const handleSuccess = () => {
    refreshAll();
    onTaskCreated(); // Avisa o Dashboard principal que algo mudou
  };

  return (
    <div className="bg-slate-50/50 border border-slate-200/60 p-6 md:p-8 rounded-2xl mb-10 shadow-sm relative backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xl shadow-lg shadow-indigo-600/20">O</div>
        <div>
          {/* Título dinâmico baseado no Administrador ativo */}
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Painel de {user?.name || 'Workspace Admin'}
          </h2>
          <p className="text-sm font-medium text-slate-500">OrganizaTask Enterprise</p>
        </div>
      </div>
      
      {/* Filho 1: Formulários (Recebe os dados via Props) */}
      <AdminForms 
        teams={teams} 
        users={users} 
        onSuccess={handleSuccess} 
        showToast={showToast} 
      />

      {/* Filho 2: Tabelas de Gestão (Recebe os dados via Props) */}
      <AdminTables 
        teams={teams} 
        users={users} 
        tasks={tasks} 
        onSuccess={handleSuccess} 
        showToast={showToast} 
      />

      {/* Notificação Flutuante Global */}
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