import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { PLAN_REVIEW_TEXT } from '../data/mockChat';
import { scenarioCandidates } from '../data/mockScenario';
import type { ArtifactTarget, ChatMessage } from '../types/chat';
import type { PlanStep } from '../types/plan';
import { currentTime } from '../utils/time';

import { ChatFlowContext, type ChatAttachment } from './ChatFlowContext';
import { chatFlowReducer, createInitialChatState } from './chatFlowReducer';

/** Simulated "thinking" delay before In0 answers. */
const REPLY_DELAY_MS = 450;

/** Index of the HITL approval step in the demo scenario (Bước 3). */
const APPROVAL_STEP_INDEX = 2;

function createMessage(
  message: Omit<ChatMessage, 'id' | 'timestamp'>,
): ChatMessage {
  return { id: crypto.randomUUID(), timestamp: currentTime(), ...message };
}

function createUserMessage(
  content: string,
  attachment?: ChatAttachment,
): ChatMessage {
  return createMessage({ role: 'user', content, attachment });
}

function createPlanStep(task: string, input: string, output: string): PlanStep {
  return {
    step: 0,
    task,
    inputMode: 'text',
    input,
    output,
    platform: 'In0 AI Engine',
    status: 'pending',
  };
}

/**
 * Drives the In0 chat & WORK execution demo (port of the template's chat-flow.js).
 * In0's replies are simulated locally; swap `scheduleReply` bodies for API calls
 * once the agent backend is available.
 */
function ChatFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    chatFlowReducer,
    undefined,
    createInitialChatState,
  );
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const scheduleReply = useCallback((reply: () => void) => {
    dispatch({ type: 'set-responding', value: true });
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((id) => id !== timer);
      reply();
      dispatch({ type: 'set-responding', value: false });
    }, REPLY_DELAY_MS);
    timersRef.current.push(timer);
  }, []);

  const openArtifact = useCallback((target: ArtifactTarget) => {
    dispatch({ type: 'open-artifact', target });
  }, []);

  const closeArtifactPanel = useCallback(() => {
    dispatch({ type: 'close-artifact-panel' });
  }, []);

  const runPlan = useCallback(() => {
    dispatch({
      type: 'set-step-statuses',
      statuses: { 0: 'done', 1: 'done', [APPROVAL_STEP_INDEX]: 'current' },
    });
    dispatch({ type: 'open-artifact', target: APPROVAL_STEP_INDEX });
  }, []);

  const sendInterviewEmails = useCallback(() => {
    dispatch({ type: 'set-step-statuses', statuses: { 2: 'done', 3: 'done' } });
    dispatch({
      type: 'add-message',
      message: createMessage({
        role: 'assistant',
        lead: '✉️ Bước 4 hoàn thành:',
        content:
          'Đã tạo và gửi thư mời phỏng vấn cá nhân hóa qua SendGrid Gateway. Lịch phỏng vấn kỹ thuật trực tuyến diễn ra vào 14:00 Thứ Sáu, ngày 05/10/2026 trên Google Meet.',
        kind: 'artifact',
        artifact: {
          stepIndex: 3,
          title: 'Thư mời phỏng vấn: Lê Quốc Huy & các ứng viên đã duyệt',
          badge: 'Đã gửi qua SendGrid',
          icon: 'mail',
          summary:
            'Lịch phỏng vấn: 14:00 - 15:00 Thứ Sáu 05/10/2026 • Link Google Meet đính kèm',
        },
      }),
    });
    dispatch({ type: 'open-artifact', target: 3 });
  }, []);

  const syncToSystemB = useCallback(() => {
    dispatch({ type: 'set-step-statuses', statuses: { 4: 'done' } });
    dispatch({
      type: 'add-message',
      message: createMessage({
        role: 'assistant',
        lead: '🎉 Bước 5 hoàn thành:',
        content:
          'Đã tạo mã nhân viên EMP-2026-089 và đồng bộ toàn bộ dữ liệu nhân sự của Lê Quốc Huy vào Hệ thống B (Core HRM).',
        kind: 'artifact',
        artifact: {
          stepIndex: 4,
          title: 'Hồ sơ nhân sự Hệ thống B (Mã: EMP-2026-089)',
          badge: 'Đồng bộ thành công',
          icon: 'user-plus',
          summary:
            'Vị trí: Senior Frontend Engineer • Phòng: Kỹ thuật • Lương: 32,000,000 VNĐ • Đã kích hoạt tài khoản',
        },
      }),
    });
    dispatch({ type: 'open-artifact', target: 4 });
  }, []);

  const replan = useCallback((instruction: string) => {
    dispatch({
      type: 'insert-step',
      index: 3,
      step: createPlanStep(
        instruction,
        `Chỉ thị: ${instruction}`,
        'Kết quả hoàn thành',
      ),
    });
  }, []);

  const sendMessage = useCallback(
    (text: string, attachment?: ChatAttachment) => {
      dispatch({
        type: 'add-message',
        message: createUserMessage(text, attachment),
      });

      const lower = text.toLowerCase();
      scheduleReply(() => {
        if (
          ['duyệt', 'gửi email', 'đồng ý', 'phê duyệt'].some((k) =>
            lower.includes(k),
          )
        ) {
          sendInterviewEmails();
        } else if (
          ['hệ thống b', 'pass', 'đồng bộ'].some((k) => lower.includes(k))
        ) {
          syncToSystemB();
        } else if (lower.includes('thêm') && lower.includes('bước')) {
          replan(text);
          dispatch({
            type: 'add-message',
            message: createMessage({
              role: 'assistant',
              lead: '✨ Đã cập nhật kế hoạch:',
              content: `Tôi đã bổ sung bước "${text}" vào kế hoạch thực thi. Mở "Xem & Tinh chỉnh Kế hoạch" để kiểm tra lại thứ tự các bước.`,
            }),
          });
        } else if (lower.includes('chạy') || lower.includes('bắt đầu')) {
          runPlan();
        } else {
          dispatch({
            type: 'add-message',
            message: createMessage({
              role: 'assistant',
              content: `Đã ghi nhận chỉ đạo: "${text}". Tôi đang cập nhật các bước điều phối tương ứng.`,
            }),
          });
        }
      });
    },
    [scheduleReply, sendInterviewEmails, syncToSystemB, replan, runPlan],
  );

  const approveAndRunPlan = useCallback(() => {
    dispatch({
      type: 'add-message',
      message: createUserMessage(
        'Kế hoạch rất tốt! Hãy bắt đầu thực thi toàn bộ quy trình ngay.',
      ),
    });
    scheduleReply(runPlan);
  }, [scheduleReply, runPlan]);

  const { selectedCandidateIds } = state;
  const approveCandidates = useCallback(() => {
    const names = scenarioCandidates
      .filter((candidate) => selectedCandidateIds.includes(candidate.id))
      .map((candidate) => candidate.name);
    const content =
      names.length > 0
        ? `Tôi duyệt ${names.length} ứng viên (${names.join(', ')}). In0 hãy gửi thư mời phỏng vấn ngay!`
        : 'Tôi chưa chọn ứng viên nào, In0 hãy giữ nguyên danh sách hiện tại.';

    dispatch({ type: 'add-message', message: createUserMessage(content) });
    if (names.length > 0) {
      scheduleReply(sendInterviewEmails);
    }
  }, [selectedCandidateIds, scheduleReply, sendInterviewEmails]);

  const syncPassedCandidate = useCallback(() => {
    dispatch({
      type: 'add-message',
      message: createUserMessage(
        'Ứng viên Lê Quốc Huy đã pass phỏng vấn chuyên môn với điểm xuất sắc. Hãy đồng bộ hồ sơ bạn ấy vào Hệ thống B (HRM) nhé!',
      ),
    });
    scheduleReply(syncToSystemB);
  }, [scheduleReply, syncToSystemB]);

  const startNewChat = useCallback(() => {
    dispatch({
      type: 'reset',
      messages: [
        createMessage({
          role: 'assistant',
          content:
            '👋 Chào bạn! Tôi là In0 AI Assistant. Hãy nhập yêu cầu tuyển dụng hoặc tác vụ nhân sự để tôi phân tích và lập kế hoạch thực thi tự động.',
        }),
      ],
    });
  }, []);

  const startWithPrompt = useCallback(
    (prompt: string, attachment?: ChatAttachment) => {
      dispatch({
        type: 'reset',
        messages: [
          createUserMessage(prompt, attachment),
          createMessage({
            role: 'assistant',
            content: PLAN_REVIEW_TEXT,
            kind: 'plan_review',
          }),
        ],
      });
    },
    [],
  );

  const { isArtifactPanelOpen, activeArtifact } = state;
  const toggleArtifactPanel = useCallback(() => {
    if (isArtifactPanelOpen) {
      dispatch({ type: 'close-artifact-panel' });
    } else {
      dispatch({
        type: 'open-artifact',
        target: activeArtifact ?? APPROVAL_STEP_INDEX,
      });
    }
  }, [isArtifactPanelOpen, activeArtifact]);

  const moveStep = useCallback((index: number, direction: -1 | 1) => {
    dispatch({ type: 'move-step', index, direction });
  }, []);

  const addStep = useCallback(() => {
    dispatch({
      type: 'insert-step',
      index: Number.MAX_SAFE_INTEGER,
      step: createPlanStep(
        'Nhiệm vụ mới bổ sung',
        'Dữ liệu đầu vào',
        'Kết quả mong đợi',
      ),
    });
  }, []);

  const stepCount = state.planSteps.length;
  const deleteStep = useCallback(
    (index: number) => {
      if (stepCount <= 1) return false;
      dispatch({ type: 'delete-step', index });
      return true;
    },
    [stepCount],
  );

  const updateStep = useCallback(
    (index: number, changes: Partial<PlanStep>) => {
      dispatch({ type: 'update-step', index, changes });
    },
    [],
  );

  const toggleCandidate = useCallback((candidateId: string) => {
    dispatch({ type: 'toggle-candidate', candidateId });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      sendMessage,
      startWithPrompt,
      startNewChat,
      approveAndRunPlan,
      approveCandidates,
      syncPassedCandidate,
      openArtifact,
      closeArtifactPanel,
      toggleArtifactPanel,
      moveStep,
      addStep,
      deleteStep,
      updateStep,
      replan,
      toggleCandidate,
    }),
    [
      state,
      sendMessage,
      startWithPrompt,
      startNewChat,
      approveAndRunPlan,
      approveCandidates,
      syncPassedCandidate,
      openArtifact,
      closeArtifactPanel,
      toggleArtifactPanel,
      moveStep,
      addStep,
      deleteStep,
      updateStep,
      replan,
      toggleCandidate,
    ],
  );

  return (
    <ChatFlowContext.Provider value={value}>
      {children}
    </ChatFlowContext.Provider>
  );
}

export default ChatFlowProvider;
