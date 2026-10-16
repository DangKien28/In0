import { CloudUpload, FileCheck } from 'lucide-react';
import { useRef, useState, type DragEvent } from 'react';

import { cn } from '../../utils/cn';

interface FileUploadProps {
  id: string;
  fileName?: string;
  accept?: string;
  hint?: string;
  onFileSelect: (file: File) => void;
}

/** Click-or-drop upload zone (the template's Sakai "Attachments" area). */
function FileUpload({
  id,
  fileName,
  accept,
  hint,
  onFileSelect,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-labelledby={`${id}-label`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all',
        isDragging
          ? 'border-blue-500 bg-blue-50/60'
          : 'border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50/40',
      )}
    >
      <CloudUpload className="mx-auto mb-2 h-8 w-8 text-slate-400" />
      <div id={`${id}-label`} className="text-xs font-semibold text-slate-700">
        Kéo và thả file vào đây, hoặc click để chọn file từ máy tính
      </div>
      {hint && <div className="mt-1 text-[11px] text-slate-400">{hint}</div>}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      {fileName && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
            <FileCheck className="h-3.5 w-3.5" /> {fileName}
          </span>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
