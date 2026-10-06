import { useNavigate, useParams } from 'react-router-dom';

import ChatWorkspace from '../../components/chat/ChatWorkspace';
import PlanPreview from '../../components/preview/PlanPreview';
import PreviewPanel from '../../components/preview/PreviewPanel';
import { mockWorks } from '../../data/mockWorks';

function WorkDetail() {
  const { workId } = useParams();
  const navigate = useNavigate();

  const work = mockWorks.find((item) => item.id === workId);

  if (!work) {
    return (
      <section className="work-detail-page">
        <div className="empty-page">
          <h1>Work not found</h1>

          <p>The requested work could not be found.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate('/work')}
          >
            Back to Work
          </button>
        </div>
      </section>
    );
  }

  const planSteps = [
    {
      id: 'step-1',
      title: 'Collect input',
      description: 'Gather the required HR files and information.',
      status: 'completed' as const,
    },
    {
      id: 'step-2',
      title: 'Process HR task',
      description: 'In0 is currently processing this step.',
      status: 'running' as const,
    },
    {
      id: 'step-3',
      title: 'Review result',
      description: 'Waiting for HR approval before continuing.',
      status: 'waiting' as const,
    },
  ];

  return (
    <section className="work-detail-page">
      <div className="work-detail-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate('/work')}
          >
            ← Back to Work
          </button>

          <div className="work-detail-title">
            <div>
              <h1>{work.name}</h1>
              <span className="work-id">{work.id}</span>
            </div>

            <span
              className={`work-status work-status-${work.status}`}
            >
              {getStatusLabel(work.status)}
            </span>
          </div>
        </div>

        <div className="work-detail-actions">
          <button type="button" className="secondary-button">
            Pause
          </button>

          <button type="button" className="danger-button">
            Stop Work
          </button>
        </div>
      </div>

      <div className="work-detail-body">
        <div className="work-chat-area">
          <ChatWorkspace />
        </div>

        <PreviewPanel title="Work Plan" mode="plan">
          <PlanPreview
            progress={work.progress}
            steps={planSteps}
          />

          <div className="preview-section">
            <span className="preview-section-title">
              Current Step
            </span>

            <div className="preview-card">
              <strong>Process HR task</strong>

              <p>
                The current step is being processed. Review the
                conversation for the latest information.
              </p>

              <button
                type="button"
                className="secondary-button"
              >
                View Step Detail
              </button>
            </div>
          </div>
        </PreviewPanel>
      </div>
    </section>
  );
}

function getStatusLabel(status: string) {
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

export default WorkDetail;