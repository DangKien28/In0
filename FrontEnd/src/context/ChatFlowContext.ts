import { createContext } from 'react';

import type { ArtifactTarget } from '../types/chat';
import type { PlanStep } from '../types/plan';

import type { ChatFlowState } from './chatFlowReducer';

export interface ChatAttachment {
  name: string;
  type: string;
}

export interface ChatFlowContextValue extends ChatFlowState {
  sendMessage: (text: string, attachment?: ChatAttachment) => void;
  /** Starts a new conversation from a prompt and replies with the Review Plan. */
  startWithPrompt: (prompt: string, attachment?: ChatAttachment) => void;
  startNewChat: () => void;
  approveAndRunPlan: () => void;
  approveCandidates: () => void;
  syncPassedCandidate: () => void;
  openArtifact: (target: ArtifactTarget) => void;
  closeArtifactPanel: () => void;
  toggleArtifactPanel: () => void;
  moveStep: (index: number, direction: -1 | 1) => void;
  addStep: () => void;
  /** Returns false when the step cannot be removed (a plan needs at least one step). */
  deleteStep: (index: number) => boolean;
  updateStep: (index: number, changes: Partial<PlanStep>) => void;
  /** Inserts an AI-suggested step into the plan from a free-text instruction. */
  replan: (instruction: string) => void;
  toggleCandidate: (candidateId: string) => void;
}

export const ChatFlowContext = createContext<ChatFlowContextValue | null>(null);
