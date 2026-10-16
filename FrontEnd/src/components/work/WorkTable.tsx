import { Clock, Cpu } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';
import type { Work, WorkStatus } from '../../types/work';
import { cn } from '../../utils/cn';
import ProgressBar from '../common/ProgressBar';

const statusStyles: Record<WorkStatus, { text: string; bar: string }> = {
  waiting_approval: { text: 'text-amber-800', bar: 'bg-amber-500' },
  conflict: { text: 'text-rose-800', bar: 'bg-rose-500' },
  running: { text: 'text-blue-700', bar: 'bg-blue-600' },
  waiting_3rd: { text: 'text-slate-700', bar: 'bg-slate-500' },
  done: { text: 'text-emerald-800', bar: 'bg-emerald-600' },
};

interface WorkTableProps {
  works: Work[];
}

/** WORK list table; clicking a row opens its detail page. */
function WorkTable({ works }: WorkTableProps) {
  const navigate = useNavigate();
  const { openArtifact } = useChatFlow();

  const handleApprove = (event: MouseEvent) => {
    event.stopPropagation();
    openArtifact(2);
    navigate(paths.chat);
  };

  const handleResolve = (event: MouseEvent, work: Work) => {
    event.stopPropagation();
    navigate(paths.workDetail(work.id));
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            <tr>
              <th className="w-[32%] py-4 pr-4 pl-6 sm:pl-8 lg:w-[30%]">
                Tên WORK
              </th>
              <th className="w-[24%] px-6 py-4 lg:w-[22%]">
                Phần mềm liên kết
              </th>
              <th className="w-[44%] py-4 pr-6 pl-4 sm:pr-8 lg:w-[48%]">
                Hoạt động hiện tại
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {works.map((work) => {
              const style = statusStyles[work.status];

              return (
                <tr
                  key={work.id}
                  tabIndex={0}
                  onClick={() => navigate(paths.workDetail(work.id))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter')
                      navigate(paths.workDetail(work.id));
                  }}
                  title={`Bấm vào để xem chi tiết các bước của ${work.shortTitle}`}
                  className="group cursor-pointer transition-colors hover:bg-blue-50/50 focus-visible:bg-blue-50/50 focus-visible:outline-none"
                >
                  <td className="py-5 pr-4 pl-6 align-top sm:pl-8">
                    <div className="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {work.shortTitle}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{work.updatedAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top text-xs font-medium text-slate-600">
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-slate-700">
                      <Cpu className="h-3.5 w-3.5 text-slate-500" />
                      <span>{work.targetSystem}</span>
                    </div>
                  </td>
                  <td className="py-5 pr-6 pl-4 align-top sm:pr-8">
                    <div className="space-y-1.5">
                      <div
                        className={cn(
                          'flex flex-wrap items-center gap-1.5 leading-snug font-bold',
                          style.text,
                        )}
                      >
                        <span>{work.activityLabel}</span>
                        {work.status === 'waiting_approval' && (
                          <button
                            type="button"
                            onClick={handleApprove}
                            className="ml-1 rounded bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-amber-600"
                          >
                            Duyệt
                          </button>
                        )}
                        {work.status === 'conflict' && (
                          <button
                            type="button"
                            onClick={(event) => handleResolve(event, work)}
                            className="ml-1 rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-rose-700"
                          >
                            Sửa
                          </button>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="shrink-0 font-medium italic">
                          {work.activityStep}
                        </span>
                        <ProgressBar
                          value={work.progress}
                          barClassName={style.bar}
                          className="w-32 shrink-0 sm:w-44"
                        />
                        <span className="shrink-0 font-mono text-[11px] font-bold text-slate-600">
                          {work.progress}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkTable;
