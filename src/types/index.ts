export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Team {
  id: number;
  name: string;
  description?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  team_id: number;
  assigned_to?: number;
  assignee?: User;
  team?: Team;
}