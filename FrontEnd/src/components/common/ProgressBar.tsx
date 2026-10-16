import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  barClassName?: string;
  className?: string;
}

function ProgressBar({
  value,
  barClassName = 'bg-blue-600',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        'h-2 overflow-hidden rounded-full border border-slate-200 bg-slate-100',
        className,
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          barClassName,
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export default ProgressBar;
