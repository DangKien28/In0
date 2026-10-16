export type AgentStatus = 'active' | 'inactive';

export type AgentStepType =
  'Tự động hóa' | 'Phê duyệt HITL' | 'Kiểm định Policy';

export interface AgentPlanStep {
  step: number;
  task: string;
  platform: string;
  input: string;
  output: string;
  type: AgentStepType;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  workflow: string;
  promptTemplate: string;
  status: AgentStatus;
  planSteps: AgentPlanStep[];
}

export interface Workflow {
  id: string;
  name: string;
  badge: string;
  description: string;
  isDefault: boolean;
}
