/**
 * Status of a task inside a WORK. The first four values match the four
 * swimlane columns on the Home kanban board.
 */
export type TaskStatus =
  'running' | 'waiting_3rd' | 'conflict' | 'waiting_approval' | 'done';

export type WorkStatus = TaskStatus;

export interface WorkTask {
  id: string;
  name: string;
  step: number;
  status: TaskStatus;
  platform: string;
  deadline: string;
  assignee: string;
}

export interface Work {
  id: string;
  title: string;
  shortTitle: string;
  currentStep: string;
  progress: number;
  totalSteps: number;
  category: string;
  targetSystem: string;
  updatedAt: string;
  status: WorkStatus;
  statusText: string;
  /** Short description of what is happening right now (Work list). */
  activityLabel: string;
  /** Context line under the activity, e.g. "Bước 3/5 • Phê duyệt". */
  activityStep: string;
  tasks: WorkTask[];
}
