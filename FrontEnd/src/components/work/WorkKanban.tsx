import { useNavigate } from 'react-router-dom';

import { mockWorks } from '../../data/mockWorks';
import type { Work, WorkStatus } from '../../types/work';

import WorkCard from './WorkCard';

interface KanbanColumn {
  status: WorkStatus;
  title: string;
}

const columns: KanbanColumn[] = [
  {
    status: 'in-progress',
    title: 'In Progress',
  },
  {
    status: 'waiting-approval',
    title: 'Waiting for Approval',
  },
  {
    status: 'completed',
    title: 'Completed',
  },
];

function WorkKanban() {
  const navigate = useNavigate();

  const handleWorkClick = (work: Work) => {
    navigate(`/work/${work.id}`);
  };

  return (
    <section className="work-overview">
      <div className="work-overview-header">
        <div>
          <h2>Current Work</h2>
          <p>View your active work and approvals.</p>
        </div>

        <button
          type="button"
          className="view-all-work"
          onClick={() => navigate('/work')}
        >
          View all
        </button>
      </div>

      <div className="work-kanban">
        {columns.map((column) => {
          const works = mockWorks.filter(
            (work) => work.status === column.status,
          );

          return (
            <div className="work-column" key={column.status}>
              <div className="work-column-header">
                <span>{column.title}</span>

                <span className="work-column-count">{works.length}</span>
              </div>

              <div className="work-column-content">
                {works.length > 0 ? (
                  works.map((work) => (
                    <WorkCard
                      key={work.id}
                      work={work}
                      onClick={handleWorkClick}
                    />
                  ))
                ) : (
                  <div className="work-column-empty">
                    No work
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WorkKanban;