import { Check, Clock, ListOrdered } from 'lucide-react';

import { useChatFlow } from '../../hooks/useChatFlow';
import type { StepStatus } from '../../types/plan';
import { cn } from '../../utils/cn';

const statusClasses: Record<StepStatus, string> = {
  done: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
  current:
    'border-blue-300 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-300',
  pending: 'border-slate-200 bg-slate-50 text-slate-500',
};

function StatusIcon({ status }: { status: StepStatus }) {
  if (status === 'done') return <Check className="h-3 w-3 text-emerald-600" />;
  if (status === 'current') {
    return (
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
    );
  }
  return <Clock className="h-2.5 w-2.5 text-slate-400" />;
}

/** Compact horizontal stepper above the chat; each pill opens that step's artifact. */
function MiniStepsBar() {
  const { planSteps, activeArtifact, isArtifactPanelOpen, openArtifact } =
    useChatFlow();

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-2xs">
      <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-slate-500">
        <ListOrdered className="h-3.5 w-3.5 text-blue-600" />
        <span className="hidden sm:inline">Tiến trình:</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        {planSteps.map((step, index) => {
          const isActive = isArtifactPanelOpen && activeArtifact === index;

          return (
            <button
              key={`${step.step}-${step.task}`}
              type="button"
              title={step.task}
              aria-current={isActive ? 'step' : undefined}
              onClick={() => openArtifact(index)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all hover:-translate-y-px',
                statusClasses[step.status],
                isActive && 'shadow-xs ring-2 ring-blue-500',
              )}
            >
              <span className="font-bold">{step.step}.</span>
              <span className="max-w-[100px] truncate sm:max-w-[130px]">
                {step.task}
              </span>
              <StatusIcon status={step.status} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MiniStepsBar;
