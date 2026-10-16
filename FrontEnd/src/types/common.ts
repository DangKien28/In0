export type ToastTone = 'success' | 'info';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

export interface AppNotification {
  id: string;
  tone: 'approval' | 'conflict';
  title: string;
  description: string;
  /** Opens the chat on the HITL approval artifact, or the Work list. */
  action: 'open-approval' | 'open-work-list';
}

export interface CurrentUser {
  name: string;
  title: string;
  shortRole: string;
  role: string;
  email: string;
  department: string;
  phone: string;
  initials: string;
}
