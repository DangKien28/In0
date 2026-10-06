import { useState } from 'react';

import type { ChatMessage } from '../../types/chat';

import ChatComposer from './ChatComposer';
import ChatMessageComponent from './ChatMessage';

function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = (content: string, file?: File) => {
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

    // Temporary prototype response.
    // Real Agent/API integration will be added later.
    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'I understand your request. I will prepare a plan for this task.',
        timestamp: 'Just now',
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    }, 500);
  };

  return (
    <div className="chat-workspace">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="chat-empty-icon">✦</div>

            <h2>How can I help?</h2>

            <p>
              Describe a task and In0 will help you create a plan and
              execute it.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessageComponent
              key={message.id}
              message={message}
            />
          ))
        )}
      </div>

      <ChatComposer onSend={handleSend} />
    </div>
  );
}

export default ChatWorkspace;