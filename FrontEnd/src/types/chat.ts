export type ChatMessageRole = 'user' | 'assistant' | 'system';

export type ChatMessageKind = 'text' | 'plan_review' | 'artifact';

export type ArtifactIcon = 'briefcase' | 'user-check' | 'mail' | 'user-plus';

/** What the right-hand artifact panel is showing: the plan editor or a step. */
export type ArtifactTarget = 'plan' | number;

export interface ChatArtifact {
  stepIndex: number;
  title: string;
  badge: string;
  icon: ArtifactIcon;
  summary: string;
  requiresApproval?: boolean;
}

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  /** Optional bold lead-in shown before the content (e.g. "Bước 1 hoàn thành:"). */
  lead?: string;
  timestamp?: string;
  kind?: ChatMessageKind;
  artifact?: ChatArtifact;
  attachment?: {
    name: string;
    type: string;
  };
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  time: string;
  workId: string;
}

export interface ChatHistoryGroup {
  group: string;
  items: ChatHistoryItem[];
}
