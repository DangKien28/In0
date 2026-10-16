import { ListOrdered, Play, SlidersHorizontal } from 'lucide-react';

import { useChatFlow } from '../../hooks/useChatFlow';
import { shortenPlatform } from '../../utils/platform';

/** "Review Plan" step rendered inline inside an In0 chat message. */
function PlanReviewCard() {
  const { planSteps, openArtifact, approveAndRunPlan } = useChatFlow();

  return (
    <div className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white">
            <ListOrdered className="h-3.5 w-3.5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">
            Kế hoạch thực thi {planSteps.length} bước (Review Plan)
          </h4>
        </div>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
          {planSteps.length} Steps Planned
        </span>
      </div>

      <div className="space-y-1.5">
        {planSteps.map((step, index) => (
          <div
            key={`${step.step}-${step.task}`}
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-2 text-xs transition-colors hover:bg-slate-100/80"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[10px] font-bold text-slate-700">
                #{index + 1}
              </span>
              <span
                className="truncate font-semibold text-slate-800"
                title={step.task}
              >
                {step.task}
              </span>
            </div>
            <span className="max-w-[120px] shrink-0 truncate rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-500">
              {shortenPlatform(step.platform)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <button
          type="button"
          onClick={() => openArtifact('plan')}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-blue-400 hover:bg-slate-50"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" /> Xem & Tinh
          chỉnh Kế hoạch
        </button>
        <button
          type="button"
          onClick={approveAndRunPlan}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
        >
          <Play className="h-3.5 w-3.5 fill-white" /> Duyệt và chạy (Approve &
          Run)
        </button>
      </div>
    </div>
  );
}

export default PlanReviewCard;
