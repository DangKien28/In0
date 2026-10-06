export type ChatMessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp?: string;
  attachment?: {
    name: string;
    type: string;
  };
}