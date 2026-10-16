import { ArrowRight, Paperclip, Sparkles, X } from 'lucide-react';
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

interface PromptBoxProps {
  /** Called with the trimmed prompt (may be empty) and the optional attachment. */
  onSubmit: (prompt: string, file?: File) => void;
}

/** Central "give In0 a task" prompt on the Home page. */
function PromptBox({ onSubmit }: PromptBoxProps) {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit = () => onSubmit(prompt.trim(), file);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between text-xs text-slate-500">
        <label
          htmlFor="home-prompt"
          className="flex items-center gap-1.5 font-bold text-slate-700"
        >
          <Sparkles className="h-4 w-4 text-blue-600" /> Nhập yêu cầu tác vụ cho
          In0:
        </label>
        <span className="hidden text-[11px] text-slate-400 sm:inline">
          Sẽ chuyển sang không gian WORK để thực thi
        </span>
      </div>

      <textarea
        id="home-prompt"
        rows={2}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ví dụ: In0 ơi, hãy đăng tin tuyển dụng Senior Frontend lên Hệ thống A. Khi có ứng viên nộp hồ sơ, lọc top 3 CV điểm cao nhất để mời phỏng vấn, nếu pass thì đẩy vào Hệ thống B..."
        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".pdf,.doc,.docx,.xlsx"
            onChange={(event) => setFile(event.target.files?.[0])}
          />
          {file ? (
            <span className="flex min-w-0 items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Paperclip className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                aria-label="Gỡ tệp đính kèm"
                onClick={() => {
                  setFile(undefined);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-blue-500 hover:text-rose-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50"
              >
                <Paperclip className="h-3.5 w-3.5" /> Đính kèm file
              </button>
              <span className="hidden text-[11px] text-slate-400 sm:inline">
                Hỗ trợ PDF, DOCX, XLSX (tối đa 25MB)
              </span>
            </>
          )}
        </div>
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
        >
          Gửi yêu cầu <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export default PromptBox;
