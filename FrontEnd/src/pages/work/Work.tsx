import { useNavigate } from 'react-router-dom';

import { mockWorks } from '../../data/mockWorks';
import type { Work as WorkType } from '../../types/work';

function Work() {
  const navigate = useNavigate();

  const handleOpenWork = (work: WorkType) => {
    navigate(`/work/${work.id}`);
  };

  return (
    <section className="work-page">
      <div className="page-header">
        <div>
          <h1>Work</h1>
          <p>View and manage your HR work.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate('/work/create')}
        >
          + Create Work
        </button>
      </div>

      <div className="work-table-wrapper">
        <table className="work-table">
          <thead>
            <tr>
              <th>Work</th>
              <th>Plugins</th>
              <th>Progress &amp; Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mockWorks.map((work) => (
              <tr key={work.id}>
                <td>
                  <button
                    type="button"
                    className="work-name-button"
                    onClick={() => handleOpenWork(work)}
                  >
                    <span>{work.name}</span>
                    <small>{work.id}</small>
                  </button>
                </td>

                <td>
                  <span className="plugin-text">HR System</span>
                </td>

                <td>
                  <div className="table-progress">
                    <div className="table-progress-row">
                      <div className="table-progress-track">
                        <div
                          className="table-progress-value"
                          style={{ width: `${work.progress}%` }}
                        />
                      </div>

                      <span>{work.progress}%</span>
                    </div>

                    <span
                      className={`work-status work-status-${work.status}`}
                    >
                      {getStatusLabel(work.status)}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="work-time">
                    {work.updatedAt ?? '-'}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className="table-action"
                    onClick={() => handleOpenWork(work)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getStatusLabel(status: WorkType['status']) {
  switch (status) {
    case 'in-progress':
      return 'In Progress';

    case 'waiting-approval':
      return 'Waiting for Approval';

    case 'completed':
      return 'Completed';

    case 'permission-required':
      return 'Permission Required';

    case 'conflict':
      return 'Conflict';

    default:
      return status;
  }
}

export default Work;