import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AgentList from '../../components/agents/AgentList';
import Button from '../../components/common/Button';
import PageHeader from '../../components/common/PageHeader';
import { useAppData } from '../../hooks/useAppData';
import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';

function MyAgents() {
  const navigate = useNavigate();
  const { agents } = useAppData();
  const { startNewChat } = useChatFlow();

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <PageHeader
        title="Trợ lý AI của tôi"
        description="Tùy biến các Trợ lý AI chuyên trách cho từng tác vụ tuyển dụng và nhân sự."
        action={
          <Button onClick={() => navigate(paths.agentNew)}>
            <Plus className="h-4 w-4" /> Thêm mới Trợ lý
          </Button>
        }
      />

      <AgentList
        agents={agents}
        onConfigure={(agent) => navigate(paths.agentDetail(agent.id))}
        onRun={() => {
          startNewChat();
          navigate(paths.chat);
        }}
      />
    </section>
  );
}

export default MyAgents;
