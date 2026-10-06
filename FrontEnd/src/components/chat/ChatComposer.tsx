import { useRef, useState } from 'react';

interface ChatComposerProps {
  onSend: (message: string, file?: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

function ChatComposer({
  onSend,
  placeholder = 'Describe what you want In0 to do...',
  disabled = false,
}: ChatComposerProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !file) {
      return;
    }

    onSend(trimmedMessage, file);

    setMessage('');
    setFile(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="chat-composer-wrapper">
      {file && (
        <div className="selected-file">
          <span>📎 {file.name}</span>

          <button
            type="button"
            onClick={() => {
              setFile(undefined);

              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Remove
          </button>
        </div>
      )}

      <div className="chat-composer">
        <button
          type="button"
          className="composer-add-button"
          aria-label="Attach file"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          +
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
        />

        <button
          type="button"
          className="composer-send-button"
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !file)}
        >
          Send
        </button>
      </div>

      <p className="composer-hint">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}

export default ChatComposer;