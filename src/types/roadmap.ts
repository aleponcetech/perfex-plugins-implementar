export type Priority = 'ALTA' | 'MÉDIA' | 'BAIXA';
export type PluginCost = 'BAIXO' | 'MÉDIO' | 'ALTO';
export type SetupTime = 'RÁPIDO' | 'MÉDIO' | 'COMPLEXO';
export type ROI = 'ALTO' | 'MÉDIO' | 'BAIXO';

export interface Plugin {
  name: string;
  description: string;
  priority: Priority;
  completed: boolean;
  cost?: PluginCost;
  setupTime?: SetupTime;
  roi?: ROI;
  dependencies?: string[];
  estimatedHours?: number;
  notes?: string;
  completedDate?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  plugins: Plugin[];
}

export interface UserProgress {
  totalPoints: number;
  completedPlugins: number;
  badges: string[];
  streak: number;
  lastActivity?: string;
}
