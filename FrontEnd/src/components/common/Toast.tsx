import { CircleCheck, Info } from 'lucide-react';

import type { ToastTone } from '../../types/common';
import { cn } from '../../utils/cn';

interface ToastProps {
  message: string;
  tone: ToastTone;
}

function Toast({ message, tone }: ToastProps) {
  const Icon = tone === 'success' ? CircleCheck : Info;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed right-6 bottom-6 z-[60]"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl">
        <div
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-xl',
            tone === 'success'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-blue-500/20 text-blue-400',
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="font-semibold text-slate-100">{message}</p>
      </div>
    </div>
  );
}

export default Toast;
