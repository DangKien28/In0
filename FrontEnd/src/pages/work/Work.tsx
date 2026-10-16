import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import WorkTable from '../../components/work/WorkTable';
import { mockWorks } from '../../data/mockWorks';
import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';

function Work() {
  const navigate = useNavigate();
  const { startNewChat } = useChatFlow();

  const handleCreateWork = () => {
    startNewChat();
    navigate(paths.chat);
  };

  return (
    <section className="mx-auto w-full max-w-[1560px] space-y-4 px-1 sm:px-2">
      <PageHeader
        title="Danh sách WORK"
        description="Theo dõi toàn bộ các phiên làm việc và trạng thái điều phối của In0."
        action={
          <Button onClick={handleCreateWork}>
            <Plus className="h-4 w-4" /> Tạo WORK mới
          </Button>
        }
      />

      <WorkTable works={mockWorks} />
    </section>
  );
}

export default Work;
