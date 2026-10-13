
import { useState } from 'react';

import type { ChatMessage } from '../../types/chat';

import ChatComposer from './ChatComposer';
import ChatMessageComponent from './ChatMessage';

interface ChatWorkspaceProps {
  onViewPlan?: () => void;
  initialMessage?: string;
  placeholder?: string;
}

function ChatWorkspace({
  onViewPlan,
  initialMessage,
  placeholder = 'Describe what you want In0 to do...',
}: ChatWorkspaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);

  const handleSend = (content: string, file?: File) => {
    if (isResponding) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content || 'Attached a file',
      timestamp: 'Just now',
      attachment: file
        ? {
            name: file.name,
            type: file.type,
          }
        : undefined,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setIsResponding(true);

    // Temporary prototype response.
    // The real AI integration will be added later.
    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'I have received your request. You can review the proposed plan before proceeding.',
        timestamp: 'Just now',
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);

      setIsResponding(false);
    }, 500);
  };

  const handleSuggestedRequest = (request: string) => {
    handleSend(request);
  };

  return (
    <div className="chat-workspace">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="chat-empty-icon">✦</div>

            <h2>How can I help?</h2>

            <p>
              Describe a task and In0 will help you create a plan
              and execute it.
            </p>

            {initialMessage && (
              <button
                type="button"
                className="suggestion-button"
                onClick={() => handleSuggestedRequest(initialMessage)}
              >
                {initialMessage}
              </button>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
              />
            ))}

            {messages.some(
              (message) => message.role === 'assistant',
            ) && (
              <div className="chat-plan-action">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={onViewPlan}
                >
                  View Plan
                </button>
              </div>
            )}

            {isResponding && (
              <p className="chat-typing-indicator">
                In0 is preparing a response...
              </p>
            )}
          </>
        )}
      </div>

      <ChatComposer
        onSend={handleSend}
        placeholder={placeholder}
        disabled={isResponding}
      />
    </div>
  );
}

export default ChatWorkspace;
