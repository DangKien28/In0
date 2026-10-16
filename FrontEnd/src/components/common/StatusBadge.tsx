import { cn } from '../../utils/cn';

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  tone: StatusTone;
  label: string;
}

const toneClasses: Record<StatusTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 font-bold',
  danger: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
  info: 'bg-blue-50 text-blue-700 border-blue-200 font-bold',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200 font-medium',
};

function StatusBadge({ tone, label }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded border px-2.5 py-0.5 text-[11px]',
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
