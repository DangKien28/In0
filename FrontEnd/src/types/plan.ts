export type StepStatus = 'done' | 'current' | 'pending';

export type StepInputMode = 'text' | 'file' | 'previous_output';

/** One step of an execution plan (chat Review Plan and WORK detail). */
export interface PlanStep {
  step: number;
  task: string;
  platform: string;
  input: string;
  output: string;
  status: StepStatus;
  inputMode?: StepInputMode;
  inputFile?: string | null;
  previousStepId?: number | null;
}

/** Kind of platform a step runs on; drives badge colours and icons. */
export type PlatformKind =
  'systemA' | 'systemB' | 'hitl' | 'email' | 'ai' | 'other';
