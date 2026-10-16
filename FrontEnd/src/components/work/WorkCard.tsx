import type { WorkTask } from '../../types/work';
import { shortenPlatform } from '../../utils/platform';

interface WorkCardProps {
  task: WorkTask;
  onClick: () => void;
}

/** A task card inside one status cell of the Home swimlane kanban. */
function WorkCard({ task, onClick }: WorkCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full cursor-pointer rounded-xl border border-slate-200/90 bg-white p-2.5 text-left shadow-2xs transition-all hover:border-blue-400 hover:shadow-xs"
    >
      <div className="line-clamp-2 text-xs leading-snug font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
        {task.name}
      </div>
      <div className="mt-1.5 flex items-center justify-between border-t border-slate-100 pt-1 text-[10px] text-slate-400">
        <span className="font-mono font-medium text-slate-500">
          Step #{task.step}
        </span>
        <span className="max-w-[110px] truncate text-slate-500">
          {shortenPlatform(task.platform)}
        </span>
      </div>
    </button>
  );
}

export default WorkCard;
