import type { Work, WorkStatus } from '../../types/work';

interface WorkCardProps {
  work: Work;
  onClick?: (work: Work) => void;
}

const statusLabels: Record<WorkStatus, string> = {
  'in-progress': 'In Progress',
  'waiting-approval': 'Waiting for Approval',
  completed: 'Completed',
  'permission-required': 'Permission Required',
  conflict: 'Conflict',
};

function WorkCard({ work, onClick }: WorkCardProps) {
  return (
    <button
      type="button"
      className="work-card"
      onClick={() => onClick?.(work)}
    >
      <div className="work-card-header">
        <span className="work-card-name">{work.name}</span>

        <span className={`work-status work-status-${work.status}`}>
          {statusLabels[work.status]}
        </span>
      </div>

      <div className="work-card-progress">
        <div className="work-progress-track">
          <div
            className="work-progress-value"
            style={{ width: `${work.progress}%` }}
          />
        </div>

        <span>{work.progress}%</span>
      </div>

      {work.updatedAt && (
        <span className="work-card-time">{work.updatedAt}</span>
      )}
    </button>
  );
}

export default WorkCard;