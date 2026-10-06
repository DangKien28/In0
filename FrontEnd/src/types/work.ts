export type WorkStatus =
  | 'in-progress'
  | 'waiting-approval'
  | 'completed'
  | 'permission-required'
  | 'conflict';

export interface Work {
  id: string;
  name: string;
  progress: number;
  status: WorkStatus;
  description?: string;
  updatedAt?: string;
}