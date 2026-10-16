import { ArrowLeft, Play } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/common/Button';
import WorkStepsTable from '../../components/work/WorkStepsTable';
import { getWorkSteps, mockWorks } from '../../data/mockWorks';
import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';

function WorkDetail() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const { openArtifact } = useChatFlow();

  const work = mockWorks.find((item) => item.id === workId);

  if (!work) {
    return (
      <section className="mx-auto w-full max-w-xl space-y-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-lg font-bold text-slate-900">
          Không tìm thấy WORK
        </h1>
        <p className="text-xs text-slate-500">
          WORK bạn yêu cầu không tồn tại hoặc đã bị xóa.
        </p>
        <Button onClick={() => navigate(paths.work)}>Quay lại danh sách</Button>
      </section>
    );
  }

  const handleContinueChat = () => {
    openArtifact(2);
    navigate(paths.chat);
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to={paths.work}
            className="mb-1 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Quay lại danh sách
          </Link>
          <h1 className="text-xl font-bold text-slate-900">{work.title}</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            {work.statusText} • Tiến độ {work.currentStep} • {work.targetSystem}
          </p>
        </div>
        <Button onClick={handleContinueChat} className="shrink-0 font-semibold">
          <Play className="h-3.5 w-3.5" /> Tiếp tục phiên chat
        </Button>
      </div>

      <div className="space-y-4 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <WorkStepsTable
          steps={getWorkSteps(work)}
          hasConflict={work.status === 'conflict'}
        />
      </div>
    </section>
  );
}

export default WorkDetail;
