interface PlanStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'running' | 'waiting';
}

interface PlanPreviewProps {
  progress: number;
  steps: PlanStep[];
  onStepClick?: (step: PlanStep) => void;
}

function PlanPreview({
  progress,
  steps,
  onStepClick,
}: PlanPreviewProps) {
  return (
    <>
      <div className="preview-progress">
        <div className="preview-progress-header">
          <span>Overall Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="table-progress-track">
          <div
            className="table-progress-value"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="plan-section">
        <div className="plan-section-header">
          <span>Plan</span>
          <span>{steps.length} Steps</span>
        </div>

        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={`plan-step ${step.status}`}
            onClick={() => onStepClick?.(step)}
          >
            <div className="plan-step-number">
              {step.status === 'completed' ? '✓' : index + 1}
            </div>

            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default PlanPreview;