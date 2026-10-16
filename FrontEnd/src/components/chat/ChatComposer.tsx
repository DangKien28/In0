import { Paperclip, Send, X } from 'lucide-react';
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

interface QuickSuggestion {
  label: string;
  message: string;
}

interface ChatComposerProps {
  onSend: (message: string, file?: File) => void;
  suggestions?: QuickSuggestion[];
  placeholder?: string;
  disabled?: boolean;
}

function ChatComposer({
  onSend,
  suggestions = [],
  placeholder = 'Nhập chỉ thị cho In0 (Ví dụ: Duyệt, Tiếp tục, Sửa JD, Điều chỉnh bước...)...',
  disabled = false,
}: ChatComposerProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearFile = () => {
    setFile(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const send = () => {
    const trimmed = message.trim();
    if (disabled || (!trimmed && !file)) return;

    onSend(trimmed || 'Đã đính kèm một tệp', file);
    setMessage('');
    clearFile();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <div className="shrink-0 border-t border-slate-100 bg-white p-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        {suggestions.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            <span className="shrink-0 font-medium text-slate-400">Gợi ý:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                type="button"
                disabled={disabled}
                onClick={() => onSend(suggestion.message)}
                className="shrink-0 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Nội dung tin nhắn"
            placeholder={placeholder}
            className="max-h-24 min-h-[36px] flex-1 resize-none bg-transparent p-1 text-xs leading-relaxed text-slate-800 outline-none"
          />

          <div className="flex shrink-0 items-center gap-1 pb-0.5">
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.xlsx,.txt"
              onChange={(event) => setFile(event.target.files?.[0])}
            />
            <button
              type="button"
              title="Đính kèm file"
              aria-label="Đính kèm file"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={disabled || (!message.trim() && !file)}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Gửi</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {file && (
          <div className="flex items-center justify-between rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700">
            <span className="truncate font-medium">📎 {file.name}</span>
            <button
              type="button"
              aria-label="Gỡ tệp đính kèm"
              onClick={clearFile}
              className="ml-1 text-blue-500 hover:text-rose-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <p className="text-[10px] text-slate-400">
          Enter để gửi · Shift + Enter để xuống dòng
        </p>
      </form>
    </div>
  );
}

export default ChatComposer;
