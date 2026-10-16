import { SlidersHorizontal } from 'lucide-react';

import { useChatFlow } from '../../hooks/useChatFlow';
import { useToast } from '../../hooks/useToast';
import type { ArtifactTarget } from '../../types/chat';

import ApprovalPreview from './ApprovalPreview';
import EmailPreview from './EmailPreview';
import EmployeeSyncPreview from './EmployeeSyncPreview';
import JobPostPreview from './JobPostPreview';
import PlanPreview from './PlanPreview';
import PreviewPanel from './PreviewPanel';

function StepArtifact({ stepIndex }: { stepIndex: number }) {
  switch (stepIndex) {
    case 0:
      return <JobPostPreview />;
    case 1:
    case 2:
      return <ApprovalPreview />;
    case 3:
      return <EmailPreview />;
    case 4:
      return <EmployeeSyncPreview />;
    default:
      return (
        <div className="p-4 text-center text-xs text-slate-400 italic">
          Bước này chưa có Artifact. In0 sẽ cập nhật khi bước được thực thi.
        </div>
      );
  }
}

/** Artifact panel next to the chat: the plan editor or the selected step's output. */
function ArtifactPreview({ target }: { target: ArtifactTarget }) {
  const { planSteps, closeArtifactPanel } = useChatFlow();
  const { showToast } = useToast();

  if (target === 'plan') {
    return (
      <PreviewPanel
        onClose={closeArtifactPanel}
        header={
          <>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="text-xs leading-tight font-bold text-slate-900">
                Tinh chỉnh Kế hoạch (Plan Editor)
              </h3>
              <span className="text-[10px] text-slate-400">
                Chỉnh sửa bước, đổi nguồn input, di chuyển thứ tự
              </span>
            </div>
          </>
        }
      >
        <PlanPreview />
      </PreviewPanel>
    );
  }

  const step = planSteps[target];

  return (
    <PreviewPanel
      onClose={closeArtifactPanel}
      onDownload={() =>
        showToast('Tải xuống Artifact sẽ khả dụng khi kết nối backend.', 'info')
      }
      header={
        <>
          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
            Step {step?.step ?? target + 1}
          </span>
          <span
            className="truncate text-xs font-bold text-slate-900"
            title={step?.task}
          >
            {step?.task}
          </span>
        </>
      }
    >
      <StepArtifact stepIndex={target} />
    </PreviewPanel>
  );
}

export default ArtifactPreview;
