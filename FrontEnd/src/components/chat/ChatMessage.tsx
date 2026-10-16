import { Bot, Paperclip } from 'lucide-react';

import type { ChatMessage as ChatMessageType } from '../../types/chat';

import ArtifactMessageCard from './ArtifactMessageCard';
import PlanReviewCard from './PlanReviewCard';

interface ChatMessageProps {
  message: ChatMessageType;
}

function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="ml-auto flex max-w-3xl items-start justify-end gap-2.5">
        <div className="space-y-1 text-right">
          <div className="inline-block rounded-2xl rounded-tr-none bg-blue-600 px-4 py-2.5 text-left text-xs leading-relaxed whitespace-pre-wrap text-white shadow-xs">
            {message.content}
            {message.attachment && (
              <div className="mt-1.5 flex items-center gap-1 border-t border-blue-500/80 pt-1.5 text-[10px] text-blue-100">
                <Paperclip className="h-3 w-3" /> {message.attachment.name}
              </div>
            )}
          </div>
          <div className="pr-1 text-[10px] text-slate-400">
            {message.timestamp ?? 'Vừa xong'}
          </div>
        </div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-[10px] font-bold text-white shadow-xs">
          HR
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl items-start gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-xs font-bold text-white shadow-xs">
        <Bot className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="rounded-2xl rounded-tl-none border border-slate-200/80 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-800 shadow-2xs">
          <div>
            {message.lead && <strong>{message.lead} </strong>}
            {message.content}
          </div>
          {message.kind === 'plan_review' && <PlanReviewCard />}
          {message.kind === 'artifact' && message.artifact && (
            <ArtifactMessageCard artifact={message.artifact} />
          )}
        </div>
        <div className="pl-1 text-[10px] text-slate-400">
          {message.timestamp ?? 'Vừa xong'}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
