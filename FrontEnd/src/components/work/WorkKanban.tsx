import { Briefcase, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { mockWorks } from '../../data/mockWorks';
import { paths } from '../../routes/paths';
import type { TaskStatus } from '../../types/work';
import { cn } from '../../utils/cn';

import WorkCard from './WorkCard';

interface KanbanColumn {
  status: Exclude<TaskStatus, 'done'>;
  title: string;
  headerClass: string;
  dotClass: string;
  cellClass: string;
}

const columns: KanbanColumn[] = [
  {
    status: 'running',
    title: 'In0 đang thực hiện',
    headerClass: 'bg-blue-50/70 border-blue-200/80 text-blue-800',
    dotClass: 'bg-blue-600 animate-pulse',
    cellClass: 'bg-blue-50/40 border-blue-100/70',
  },
  {
    status: 'waiting_3rd',
    title: 'Chờ hệ thống đích',
    headerClass: 'bg-slate-100/80 border-slate-200 text-slate-700',
    dotClass: 'bg-slate-400',
    cellClass: 'bg-slate-50/70 border-slate-100',
  },
  {
    status: 'conflict',
    title: 'Xung đột cần kiểm tra',
    headerClass: 'bg-rose-50/70 border-rose-200/80 text-rose-800',
    dotClass: 'bg-rose-500',
    cellClass: 'bg-rose-50/35 border-rose-100/60',
  },
  {
    status: 'waiting_approval',
    title: 'Chờ duyệt (HITL)',
    headerClass: 'bg-amber-50/80 border-amber-200/80 text-amber-800',
    dotClass: 'bg-amber-500',
    cellClass: 'bg-amber-50/45 border-amber-100/70',
  },
];

/**
 * Swimlane matrix: one row per WORK, one column per task status. Each cell lists
 * the WORK's tasks currently in that status.
 */
function WorkKanban() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Bảng tiến độ công việc theo quy trình
          </h3>
        </div>
        <Link
          to={paths.work}
          className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition-all hover:bg-blue-100"
        >
          Xem danh sách <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1060px]">
            <div className="grid grid-cols-12 items-center border-b border-slate-200 bg-slate-50/90 px-4 py-3 text-xs font-bold text-slate-700">
              <div className="col-span-3 flex items-center gap-2 pr-3 text-[11px] tracking-wider text-slate-800 uppercase">
                <Briefcase className="h-4 w-4 text-slate-500" />
                <span>WORK (Quy trình)</span>
              </div>
              <div className="col-span-9 grid grid-cols-4 gap-2.5 text-center">
                {columns.map((column) => (
                  <div
                    key={column.status}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-xl border px-2 py-1.5 text-[11px]',
                      column.headerClass,
                    )}
                  >
                    <span
                      className={cn('h-2 w-2 rounded-full', column.dotClass)}
                    />
                    <span>{column.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {mockWorks.map((work) => {
                const openWork = () => navigate(paths.workDetail(work.id));

                return (
                  <div
                    key={work.id}
                    className="grid grid-cols-12 items-stretch px-4 py-3 transition-colors hover:bg-slate-50/50"
                  >
                    <div className="col-span-3 flex flex-col justify-between border-r border-slate-100 pr-4">
                      <div>
                        <Link
                          to={paths.workDetail(work.id)}
                          title={work.title}
                          className="text-xs leading-snug font-bold text-slate-900 transition-colors hover:text-blue-600"
                        >
                          {work.shortTitle}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                          <span>
                            Tiến độ:{' '}
                            <strong className="font-mono font-semibold text-blue-600">
                              {work.currentStep}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>{work.targetSystem}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-9 grid grid-cols-4 items-stretch gap-2.5 pl-4">
                      {columns.map((column) => {
                        const tasks = work.tasks.filter(
                          (task) => task.status === column.status,
                        );

                        return (
                          <div
                            key={column.status}
                            className={cn(
                              'flex flex-col justify-start rounded-2xl border p-2',
                              column.cellClass,
                            )}
                          >
                            {tasks.length === 0 ? (
                              <div className="flex h-full min-h-[46px] items-center justify-center p-1.5 text-center text-[11px] text-slate-300 italic">
                                —
                              </div>
                            ) : (
                              <div className="flex h-full flex-col justify-start space-y-1.5">
                                {tasks.map((task) => (
                                  <WorkCard
                                    key={task.id}
                                    task={task}
                                    onClick={openWork}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkKanban;
