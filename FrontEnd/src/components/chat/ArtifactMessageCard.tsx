import {
  ArrowRight,
  Briefcase,
  Check,
  Mail,
  UserCheck,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

import { useChatFlow } from '../../hooks/useChatFlow';
import type { ArtifactIcon, ChatArtifact } from '../../types/chat';
import { cn } from '../../utils/cn';

const artifactIcons: Record<ArtifactIcon, LucideIcon> = {
  briefcase: Briefcase,
  'user-check': UserCheck,
  mail: Mail,
  'user-plus': UserPlus,
};

/** Artifact preview attached to an In0 reply; opens the full artifact on the right. */
function ArtifactMessageCard({ artifact }: { artifact: ChatArtifact }) {
  const { openArtifact, approveCandidates, selectedCandidateIds } =
    useChatFlow();
  const Icon = artifactIcons[artifact.icon];

  return (
    <div className="hover-lift group mt-2.5 space-y-2 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-blue-400 hover:shadow-md">
      <button
        type="button"
        onClick={() => openArtifact(artifact.stepIndex)}
        className="block w-full space-y-2 text-left"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              {artifact.title}
            </h4>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold',
              artifact.requiresApproval
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800',
            )}
          >
            {artifact.badge}
          </span>
        </div>

        <p className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-[11px] leading-relaxed text-slate-600">
          {artifact.summary}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-1 text-[11px]">
          <span className="font-medium text-slate-400">
            Bấm để xem full artifact ở bên phải
          </span>
          <span className="flex items-center gap-1 font-bold text-blue-600 transition-transform group-hover:translate-x-0.5">
            Xem chi tiết <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>

      {artifact.requiresApproval && (
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2">
          <button
            type="button"
            onClick={approveCandidates}
            disabled={selectedCandidateIds.length === 0}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="h-3.5 w-3.5" /> Duyệt{' '}
            {selectedCandidateIds.length} ứng viên & Gửi thư mời PV
          </button>
        </div>
      )}
    </div>
  );
}

export default ArtifactMessageCard;
