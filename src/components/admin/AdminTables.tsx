import { useState } from 'react';
import { api } from '../../services/api';
import type { Team, User, Task } from '../../types';

interface AdminTablesProps {
  teams: Team[];
  users: User[];
  tasks: Task[];
  onSuccess: () => void;
  showToast: (msg: string, isError?: boolean) => void;
}

export function AdminTables({ teams, users, tasks, onSuccess, showToast }: AdminTablesProps) {
  // Estados Locais dos Modais
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: number | null }>({ isOpen: false, userId: null });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; user: User | null; newName: string }>({ isOpen: false, user: null, newName: '' });
  const [deleteTeamModal, setDeleteTeamModal] = useState<{ isOpen: boolean; teamId: number | null }>({ isOpen: false, teamId: null });
  const [editTeamModal, setEditTeamModal] = useState<{ isOpen: boolean; team: Team | null; newName: string }>({ isOpen: false, team: null, newName: '' });
  const [deleteTaskModal, setDeleteTaskModal] = useState<{ isOpen: boolean; taskId: number | null }>({ isOpen: false, taskId: null });
  const [editTaskModal, setEditTaskModal] = useState<{ isOpen: boolean; task: any | null }>({ isOpen: false, task: null });
  const [viewTaskModal, setViewTaskModal] = useState<{ isOpen: boolean; task: Task | null }>({ isOpen: false, task: null });

  // Funções de Gestão e API
  const executeDeleteUser = async () => { if (!deleteModal.userId) return; try { await api.delete(`/users/${deleteModal.userId}`); onSuccess(); showToast("Membro removido do workspace!"); } catch (e: any) { showToast(e.response?.data?.error || "Erro ao excluir", true); } finally { setDeleteModal({ isOpen: false, userId: null }); } };
  const executeEditUser = async (e: React.FormEvent) => { e.preventDefault(); if (!editModal.user) return; try { await api.patch(`/users/${editModal.user.id}`, { name: editModal.newName }); onSuccess(); showToast("Dados atualizados!"); } catch (e) { showToast("Erro ao editar", true); } finally { setEditModal({ isOpen: false, user: null, newName: '' }); } };
  const executeDeleteTeam = async () => { if (!deleteTeamModal.teamId) return; try { await api.delete(`/teams/${deleteTeamModal.teamId}`); onSuccess(); showToast("Squad dissolvido!"); } catch (e: any) { showToast(e.response?.data?.error || "Erro ao excluir", true); } finally { setDeleteTeamModal({ isOpen: false, teamId: null }); } };
  const executeEditTeam = async (e: React.FormEvent) => { e.preventDefault(); if (!editTeamModal.team) return; try { await api.patch(`/teams/${editTeamModal.team.id}`, { name: editTeamModal.newName }); onSuccess(); showToast("Squad renomeado!"); } catch (e) { showToast("Erro ao editar", true); } finally { setEditTeamModal({ isOpen: false, team: null, newName: '' }); } };
  const executeDeleteTask = async () => { if (!deleteTaskModal.taskId) return; try { await api.delete(`/tasks/${deleteTaskModal.taskId}`); onSuccess(); showToast("Tarefa removida!"); } catch (e: any) { showToast(e.response?.data?.error || "Erro", true); } finally { setDeleteTaskModal({ isOpen: false, taskId: null }); } };
  const executeEditTask = async (e: React.FormEvent) => { e.preventDefault(); if (!editTaskModal.task) return; try { const payload = { title: editTaskModal.task.title, description: editTaskModal.task.description, priority: editTaskModal.task.priority, team_id: Number(editTaskModal.task.team_id), assigned_to: editTaskModal.task.assigned_to ? Number(editTaskModal.task.assigned_to) : null }; await api.put(`/tasks/${editTaskModal.task.id}`, payload); onSuccess(); showToast("Tarefa atualizada!"); } catch (e) { showToast("Erro", true); } finally { setEditTaskModal({ isOpen: false, task: null }); } };

  return (
    <div className="space-y-6">
      
      {/* Tabela Principal: TAREFAS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📝 Auditoria de Tarefas</h3>
        {tasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-500">O workspace está livre de pendências.</div>
        ) : (
          <div className="overflow-x-auto max-h-72 overflow-y-auto rounded-lg border border-slate-100">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold sticky top-0 shadow-sm z-10">
                <tr><th className="p-4">Demanda</th><th className="p-4">Squad</th><th className="p-4">Atribuído a</th><th className="p-4">Status</th><th className="p-4 text-right">Ações</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map(t => (
                  <tr key={t.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 max-w-xs truncate" title={t.title}>{t.title}</td>
                    <td className="p-4 text-slate-600">{t.team?.name}</td>
                    <td className="p-4 text-indigo-600 font-medium">{t.assignee?.name || 'Não atribuído'}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wide ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{t.status.replace('_', ' ')}</span>
                    </td>
                    <td className="p-4 flex gap-2 justify-end">
                      <button onClick={() => setViewTaskModal({ isOpen: true, task: t })} className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Ver Detalhes">👁️</button>
                      <button onClick={() => setEditTaskModal({ isOpen: true, task: { ...t } })} className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition" title="Editar">✏️</button>
                      <button onClick={() => setDeleteTaskModal({ isOpen: true, taskId: t.id })} className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition" title="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Tabela Secundária: TIMES */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">🏢 Squads Ativos</h3>
          {teams.length === 0 ? <p className="text-sm text-slate-500">Nenhum squad configurado.</p> : (
            <div className="overflow-x-auto max-h-60 overflow-y-auto rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold sticky top-0 shadow-sm">
                  <tr><th className="p-3">Ref</th><th className="p-3">Departamento</th><th className="p-3 text-right">Gerenciar</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teams.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-400 font-mono text-xs">#{t.id}</td><td className="p-3 font-semibold text-slate-700">{t.name}</td>
                      <td className="p-3 flex gap-3 justify-end">
                        <button onClick={() => setEditTeamModal({ isOpen: true, team: t, newName: t.name })} className="text-indigo-600 hover:text-indigo-800 font-medium text-xs uppercase tracking-wide">Editar</button>
                        <button onClick={() => setDeleteTeamModal({ isOpen: true, teamId: t.id })} className="text-red-600 hover:text-red-800 font-medium text-xs uppercase tracking-wide">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabela Secundária: USUÁRIOS */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">👥 Membros do Workspace</h3>
          {users.length === 0 ? <p className="text-sm text-slate-500">Nenhum membro no workspace.</p> : (
            <div className="overflow-x-auto max-h-60 overflow-y-auto rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold sticky top-0 shadow-sm">
                  <tr><th className="p-3">Identificação</th><th className="p-3">Acesso</th><th className="p-3 text-right">Controle</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-700">{u.name}</td><td className="p-3 text-slate-500 text-xs">{u.email}</td>
                      <td className="p-3 flex gap-3 justify-end">
                        <button onClick={() => setEditModal({ isOpen: true, user: u, newName: u.name })} className="text-indigo-600 hover:text-indigo-800 font-medium text-xs uppercase tracking-wide">Editar</button>
                        <button onClick={() => setDeleteModal({ isOpen: true, userId: u.id })} className="text-red-600 hover:text-red-800 font-medium text-xs uppercase tracking-wide">Revogar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ========================================= */}
      {/* TODOS OS MODAIS COMPLETOS                 */}
      {/* ========================================= */}

      {/* Excluir Usuário */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Remover Acesso</h3>
            <p className="text-sm text-slate-500 mb-8">Esta ação revogará permanentemente o acesso deste usuário ao workspace.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteModal({ isOpen: false, userId: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button onClick={executeDeleteUser} className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors">Revogar Acesso</button>
            </div>
          </div>
        </div>
      )}

      {/* Editar Usuário */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Editar Usuário</h3>
            <form onSubmit={executeEditUser}>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nome do Usuário</label>
              <input type="text" required value={editModal.newName} onChange={(e) => setEditModal({ ...editModal, newName: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none mb-6 focus:ring-2 focus:ring-indigo-500 transition-all" />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditModal({ isOpen: false, user: null, newName: '' })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Excluir Time */}
      {deleteTeamModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Excluir Squad</h3>
            <p className="text-sm text-slate-500 mb-8">Tem certeza que deseja dissolver este squad? Certifique-se de que não há tarefas pendentes para ele.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTeamModal({ isOpen: false, teamId: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button onClick={executeDeleteTeam} className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors">Sim, dissolver</button>
            </div>
          </div>
        </div>
      )}

      {/* Editar Time */}
      {editTeamModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Editar Squad</h3>
            <form onSubmit={executeEditTeam}>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nome do Departamento/Squad</label>
              <input type="text" required value={editTeamModal.newName} onChange={(e) => setEditTeamModal({ ...editTeamModal, newName: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none mb-6 focus:ring-2 focus:ring-indigo-500 transition-all" />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditTeamModal({ isOpen: false, team: null, newName: '' })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Excluir Tarefa */}
      {deleteTaskModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Excluir Demanda</h3>
            <p className="text-sm text-slate-500 mb-8">Tem certeza que deseja apagar esta tarefa do sistema de forma irreversível?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTaskModal({ isOpen: false, taskId: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button onClick={executeDeleteTask} className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors">Sim, excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Editar Tarefa */}
      {editTaskModal.isOpen && editTaskModal.task && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 animate-fadeUp">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Editar Demanda</h3>
            <form onSubmit={executeEditTask}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
                <input type="text" required value={editTaskModal.task.title} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, title: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Prioridade</label>
                  <select value={editTaskModal.task.priority} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, priority: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option value="high">🔥 Alta</option>
                    <option value="medium">⚡ Média</option>
                    <option value="low">☕ Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Squad Responsável</label>
                  <select required value={editTaskModal.task.team_id} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, team_id: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Atribuir Membro (Opcional)</label>
                <select value={editTaskModal.task.assigned_to || ''} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, assigned_to: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="">Deixar aberto para o Squad</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição</label>
                <textarea value={editTaskModal.task.description || ''} onChange={(e) => setEditTaskModal({...editTaskModal, task: {...editTaskModal.task, description: e.target.value}})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditTaskModal({ isOpen: false, task: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Task Modal */}
      {viewTaskModal.isOpen && viewTaskModal.task && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border-t-4 border-indigo-600 animate-fadeUp">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-slate-900 leading-tight pr-4">{viewTaskModal.task.title}</h3>
              <span className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider shrink-0 ${viewTaskModal.task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{viewTaskModal.task.status.replace('_', ' ')}</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-2">Contexto da Demanda</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">{viewTaskModal.task.description || <span className="italic text-slate-400">Nenhum detalhe fornecido.</span>}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Responsável</p><p className="font-semibold text-indigo-600">👤 {viewTaskModal.task.assignee?.name || 'Aberto'}</p></div>
              <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prioridade</p><p className="font-semibold text-slate-800 capitalize">🔥 {viewTaskModal.task.priority}</p></div>
            </div>
            <button onClick={() => setViewTaskModal({ isOpen: false, task: null })} className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors">Fechar Painel</button>
          </div>
        </div>
      )}

    </div>
  );
}