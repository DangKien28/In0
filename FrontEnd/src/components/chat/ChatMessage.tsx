import type { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}>
      <div className="chat-message-avatar">
        {isUser ? 'HR' : 'In0'}
      </div>

      <div className="chat-message-content">
        <div className="chat-message-header">
          <span className="chat-message-name">
            {isUser ? 'You' : 'In0'}
          </span>

          {message.timestamp && (
            <span className="chat-message-time">
              {message.timestamp}
            </span>
          )}
        </div>

        <p>{message.content}</p>

        {message.attachment && (
          <div className="chat-attachment">
            <span>📎</span>
            <span>{message.attachment.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;