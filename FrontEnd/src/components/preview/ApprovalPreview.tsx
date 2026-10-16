import { Check } from 'lucide-react';

import { QUALIFIED_SCORE, scenarioCandidates } from '../../data/mockScenario';
import { useChatFlow } from '../../hooks/useChatFlow';
import { cn } from '../../utils/cn';

function scoreClass(score: number) {
  if (score >= 85) return 'bg-emerald-100 text-emerald-800';
  if (score >= QUALIFIED_SCORE) return 'bg-blue-100 text-blue-800';
  return 'bg-rose-100 text-rose-800';
}

/** Steps 2 & 3 artifact: CV scoring table with the HR (HITL) approval action. */
function ApprovalPreview() {
  const { selectedCandidateIds, toggleCandidate, approveCandidates } =
    useChatFlow();
  const selectedCount = selectedCandidateIds.length;

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-200 text-[10px] font-bold text-amber-900">
            HITL
          </span>
          <div>
            <div className="text-xs font-bold text-amber-900">
              Sàng lọc 5 CV từ Hệ thống A
            </div>
            <div className="text-[10px] text-amber-700">
              Điểm &gt;= {QUALIFIED_SCORE}% đạt chuẩn mời phỏng vấn
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={approveCandidates}
          disabled={selectedCount === 0}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-3.5 w-3.5" /> Duyệt {selectedCount} ứng viên
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-600 uppercase">
              <tr>
                <th className="w-8 p-2.5 text-center">Chọn</th>
                <th className="p-2.5">Ứng viên</th>
                <th className="p-2.5 text-center">Điểm</th>
                <th className="p-2.5">Bằng chứng & Kỹ năng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scenarioCandidates.map((candidate) => {
                const qualified = candidate.score >= QUALIFIED_SCORE;

                return (
                  <tr
                    key={candidate.id}
                    className={cn(
                      'hover:bg-blue-50/20',
                      qualified ? 'bg-white' : 'bg-slate-50/50 opacity-75',
                    )}
                  >
                    <td className="p-2.5 text-center">
                      <input
                        type="checkbox"
                        aria-label={`Chọn ${candidate.name}`}
                        checked={selectedCandidateIds.includes(candidate.id)}
                        onChange={() => toggleCandidate(candidate.id)}
                        className="h-3.5 w-3.5 rounded accent-blue-600"
                      />
                    </td>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900">
                        {candidate.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {candidate.email}
                      </div>
                    </td>
                    <td className="p-2.5 text-center">
                      <span
                        className={cn(
                          'inline-block rounded-full px-2 py-0.5 text-[10px] font-bold',
                          scoreClass(candidate.score),
                        )}
                      >
                        {candidate.score}%
                      </span>
                    </td>
                    <td className="p-2.5">
                      <div className="mb-1 rounded border border-amber-100 bg-amber-50/60 p-1.5 text-[11px] text-slate-700 italic">
                        "{candidate.evidence}"
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-100 px-1.5 text-[9px] text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ApprovalPreview;
