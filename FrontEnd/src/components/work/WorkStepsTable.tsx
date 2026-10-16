import {
  ArrowDownRight,
  CornerDownRight,
  ExternalLink,
  Eye,
  Lock,
  Paperclip,
  Play,
  ShieldCheck,
  Sparkles,
  SquareCheck,
} from 'lucide-react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChatFlow } from '../../hooks/useChatFlow';
import { useToast } from '../../hooks/useToast';
import { paths } from '../../routes/paths';
import type { PlanStep, PlatformKind } from '../../types/plan';
import { cn } from '../../utils/cn';
import { getPlatformKind, platformIcons } from '../../utils/platform';
import StatusBadge from '../common/StatusBadge';

const platformClasses: Record<PlatformKind, string> = {
  systemA: 'bg-blue-100 text-blue-800 border-blue-200',
  systemB: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  hitl: 'bg-amber-100 text-amber-800 border-amber-200',
  email: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  ai: 'bg-violet-100 text-violet-800 border-violet-200',
  other: 'bg-purple-100 text-purple-800 border-purple-200',
};

const stepNumberClasses: Record<PlanStep['status'], string> = {
  done: 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs',
  current: 'bg-blue-50 text-blue-700 border-blue-400 ring-2 ring-blue-100',
  pending: 'bg-slate-100 text-slate-700 border-slate-200',
};

interface WorkStepsTableProps {
  steps: PlanStep[];
  /** WORK is blocked on a data conflict: its current step shows "Xung đột". */
  hasConflict: boolean;
}

function StepStatusBadge({
  status,
  hasConflict,
}: {
  status: PlanStep['status'];
  hasConflict: boolean;
}) {
  if (status === 'done')
    return <StatusBadge tone="success" label="Hoàn thành" />;
  if (status === 'current') {
    return hasConflict ? (
      <StatusBadge tone="danger" label="Xung đột" />
    ) : (
      <StatusBadge tone="warning" label="Chờ duyệt" />
    );
  }
  return <StatusBadge tone="neutral" label="Chờ" />;
}

/** Execution steps of a WORK; each row links back to that step in the chat. */
function WorkStepsTable({ steps, hasConflict }: WorkStepsTableProps) {
  const navigate = useNavigate();
  const { openArtifact } = useChatFlow();
  const { showToast } = useToast();

  const openStepInChat = (step: PlanStep) => {
    openArtifact(step.step - 1);
    navigate(paths.chat);
  };

  const handleAction = (event: MouseEvent, step: PlanStep) => {
    event.stopPropagation();
    openStepInChat(step);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
              <tr>
                <th className="w-20 px-4 py-3.5 text-center">Bước</th>
                <th className="min-w-[240px] px-4 py-3.5">Nhiệm vụ (Task)</th>
                <th className="min-w-[150px] px-4 py-3.5">Nền tảng đích</th>
                <th className="min-w-[240px] px-4 py-3.5">
                  Dữ liệu vào (Input)
                </th>
                <th className="min-w-[250px] px-4 py-3.5">
                  Kết quả / Lưu trữ (Output)
                </th>
                <th className="w-32 px-4 py-3.5 text-center">
                  Hoạt động hiện tại
                </th>
                <th className="w-28 px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {steps.map((step) => {
                const kind = getPlatformKind(step.platform);
                const PlatformIcon = platformIcons[kind];
                const isExternal = kind === 'systemA' || kind === 'systemB';

                return (
                  <tr
                    key={step.step}
                    onClick={() => openStepInChat(step)}
                    title={`Bấm vào bước này để chuyển sang đoạn chat thực thi Step #${step.step}`}
                    className="group cursor-pointer transition-colors hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-4 text-center align-top">
                      <div
                        className={cn(
                          'mx-auto flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-black',
                          stepNumberClasses[step.status],
                        )}
                      >
                        #{step.step}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-xs leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-sm">
                        {step.task}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold',
                          platformClasses[kind],
                        )}
                      >
                        <PlatformIcon className="h-3.5 w-3.5 shrink-0" />
                        <span>{step.platform}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5 text-xs text-slate-700">
                          <ArrowDownRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                          <span className="leading-relaxed">{step.input}</span>
                        </div>
                        {step.inputFile && (
                          <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700 shadow-2xs">
                            <Paperclip className="h-3 w-3 text-slate-400" />{' '}
                            {step.inputFile}
                          </div>
                        )}
                        {step.previousStepId && (
                          <div className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 shadow-2xs">
                            <CornerDownRight className="h-3 w-3 text-blue-500" />{' '}
                            Kế thừa Step #{step.previousStepId}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      {isExternal ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            showToast(
                              `Kết quả trên nền tảng đích: ${step.output}`,
                              'info',
                            );
                          }}
                          className="flex items-start gap-1.5 text-left font-semibold text-emerald-700 hover:text-emerald-900"
                        >
                          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span className="line-clamp-2 underline decoration-emerald-300">
                            {step.output}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(event) => handleAction(event, step)}
                          className="flex items-start gap-1.5 text-left font-semibold text-blue-700 hover:text-blue-900"
                        >
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                          <div>
                            <div className="line-clamp-2 underline decoration-blue-300">
                              {step.output}
                            </div>
                            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
                              <Eye className="h-2.5 w-2.5" /> Xem Artifact trực
                              tiếp
                            </span>
                          </div>
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center align-top">
                      <StepStatusBadge
                        status={step.status}
                        hasConflict={hasConflict}
                      />
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      {step.status === 'done' && (
                        <button
                          type="button"
                          onClick={(event) => handleAction(event, step)}
                          className="ml-auto flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye className="h-3.5 w-3.5" /> Xem
                        </button>
                      )}
                      {step.status === 'current' && (
                        <button
                          type="button"
                          onClick={(event) => handleAction(event, step)}
                          className="ml-auto flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
                        >
                          <SquareCheck className="h-3.5 w-3.5" /> Duyệt
                        </button>
                      )}
                      {step.status === 'pending' && (
                        <button
                          type="button"
                          disabled
                          className="ml-auto flex cursor-not-allowed items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400"
                        >
                          <Lock className="h-3.5 w-3.5" /> Chờ
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            Toàn bộ kết quả và bằng chứng của các Step được lưu trữ tự động trên
            In0 Storage & tuân thủ chính sách doanh nghiệp.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            openArtifact(2);
            navigate(paths.chat);
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
        >
          <Play className="h-3.5 w-3.5" /> Tiếp tục phiên thực thi tại Chat
        </button>
      </div>
    </>
  );
}

export default WorkStepsTable;
