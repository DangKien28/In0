import { defaultChatMessages } from '../data/mockChat';
import {
  QUALIFIED_SCORE,
  scenarioCandidates,
  scenarioPlanSteps,
} from '../data/mockScenario';
import type { ArtifactTarget, ChatMessage } from '../types/chat';
import type { PlanStep, StepStatus } from '../types/plan';

export interface ChatFlowState {
  messages: ChatMessage[];
  planSteps: PlanStep[];
  activeArtifact: ArtifactTarget | null;
  isArtifactPanelOpen: boolean;
  selectedCandidateIds: string[];
  isResponding: boolean;
}

export type ChatFlowAction =
  | { type: 'add-message'; message: ChatMessage }
  | { type: 'reset'; messages: ChatMessage[] }
  | { type: 'set-responding'; value: boolean }
  | { type: 'open-artifact'; target: ArtifactTarget }
  | { type: 'close-artifact-panel' }
  | { type: 'set-step-statuses'; statuses: Record<number, StepStatus> }
  | { type: 'move-step'; index: number; direction: -1 | 1 }
  | { type: 'insert-step'; index: number; step: PlanStep }
  | { type: 'delete-step'; index: number }
  | { type: 'update-step'; index: number; changes: Partial<PlanStep> }
  | { type: 'toggle-candidate'; candidateId: string };

export function createScenarioSteps(): PlanStep[] {
  return scenarioPlanSteps.map((step) => ({ ...step }));
}

function defaultSelectedCandidates(): string[] {
  return scenarioCandidates
    .filter((candidate) => candidate.score >= QUALIFIED_SCORE)
    .map((candidate) => candidate.id);
}

export function createInitialChatState(): ChatFlowState {
  return {
    messages: defaultChatMessages,
    planSteps: createScenarioSteps(),
    activeArtifact: null,
    isArtifactPanelOpen: false,
    selectedCandidateIds: defaultSelectedCandidates(),
    isResponding: false,
  };
}

function renumber(steps: PlanStep[]): PlanStep[] {
  return steps.map((step, index) => ({ ...step, step: index + 1 }));
}

export function chatFlowReducer(
  state: ChatFlowState,
  action: ChatFlowAction,
): ChatFlowState {
  switch (action.type) {
    case 'add-message':
      return { ...state, messages: [...state.messages, action.message] };

    case 'reset':
      return {
        ...state,
        messages: action.messages,
        planSteps: createScenarioSteps(),
        activeArtifact: null,
        isArtifactPanelOpen: false,
        selectedCandidateIds: defaultSelectedCandidates(),
        isResponding: false,
      };

    case 'set-responding':
      return { ...state, isResponding: action.value };

    case 'open-artifact':
      return {
        ...state,
        activeArtifact: action.target,
        isArtifactPanelOpen: true,
      };

    case 'close-artifact-panel':
      return { ...state, isArtifactPanelOpen: false };

    case 'set-step-statuses':
      return {
        ...state,
        planSteps: state.planSteps.map((step, index) =>
          index in action.statuses
            ? { ...step, status: action.statuses[index] }
            : step,
        ),
      };

    case 'move-step': {
      const target = action.index + action.direction;
      if (target < 0 || target >= state.planSteps.length) return state;

      const steps = [...state.planSteps];
      [steps[action.index], steps[target]] = [
        steps[target],
        steps[action.index],
      ];
      return { ...state, planSteps: renumber(steps) };
    }

    case 'insert-step': {
      const steps = [...state.planSteps];
      steps.splice(Math.min(action.index, steps.length), 0, action.step);
      return { ...state, planSteps: renumber(steps) };
    }

    case 'delete-step':
      if (state.planSteps.length <= 1) return state;
      return {
        ...state,
        planSteps: renumber(
          state.planSteps.filter((_, index) => index !== action.index),
        ),
      };

    case 'update-step':
      return {
        ...state,
        planSteps: state.planSteps.map((step, index) =>
          index === action.index ? { ...step, ...action.changes } : step,
        ),
      };

    case 'toggle-candidate': {
      const selected = state.selectedCandidateIds.includes(action.candidateId)
        ? state.selectedCandidateIds.filter((id) => id !== action.candidateId)
        : [...state.selectedCandidateIds, action.candidateId];
      return { ...state, selectedCandidateIds: selected };
    }

    default:
      return state;
  }
}
