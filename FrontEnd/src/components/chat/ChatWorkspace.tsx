import { Bot, PanelRight, RotateCcw } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { quickSuggestions } from '../../data/mockChat';
import { useChatFlow } from '../../hooks/useChatFlow';
import ArtifactPreview from '../preview/ArtifactPreview';

import ChatComposer from './ChatComposer';
import ChatMessage from './ChatMessage';
import MiniStepsBar from './MiniStepsBar';

/** Chat & WORK execution view: header, mini stepper, conversation, artifact panel. */
function ChatWorkspace() {
  const {
    messages,
    isResponding,
    isArtifactPanelOpen,
    activeArtifact,
    sendMessage,
    startNewChat,
    toggleArtifactPanel,
  } = useChatFlow();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isResponding]);

  const handleSend = (text: string, file?: File) => {
    sendMessage(text, file ? { name: file.name, type: file.type } : undefined);
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      <div className="flex shrink-0 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900">
              In0 Trợ lý Tuyển dụng & Onboarding
            </h2>
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />{' '}
              Sẵn sàng điều phối
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleArtifactPanel}
            aria-pressed={isArtifactPanelOpen}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
          >
            <PanelRight className="h-3.5 w-3.5" />
            <span>{isArtifactPanelOpen ? 'Đóng Artifact' : 'Mở Artifact'}</span>
          </button>
          <button
            type="button"
            onClick={startNewChat}
            className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Tạo mới
          </button>
        </div>
      </div>

      <MiniStepsBar />

      <div className="flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-hidden lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300">
          <div
            ref={messagesRef}
            className="scroll-panel flex-1 space-y-4 p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isResponding && (
              <p className="pl-10 text-[11px] text-slate-400 italic">
                In0 đang soạn phản hồi...
              </p>
            )}
          </div>

          <ChatComposer
            onSend={handleSend}
            suggestions={quickSuggestions}
            disabled={isResponding}
          />
        </div>

        {isArtifactPanelOpen && activeArtifact !== null && (
          <ArtifactPreview target={activeArtifact} />
        )}
      </div>
    </section>
  );
}

export default ChatWorkspace;
