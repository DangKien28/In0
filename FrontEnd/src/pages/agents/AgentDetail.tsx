import { Navigate, useNavigate, useParams } from 'react-router-dom';

import AgentConfigForm from '../../components/agents/AgentConfigForm';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';
import { paths } from '../../routes/paths';
import type { Agent } from '../../types/agent';

function AgentDetail() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { agents, saveAgent } = useAppData();
  const { showToast } = useToast();

  const agent = agents.find((item) => item.id === agentId);

  if (!agent) {
    return <Navigate to={paths.agents} replace />;
  }

  const handleSave = (updated: Agent) => {
    saveAgent(updated);
    showToast(`Đã cập nhật cấu hình Agent "${updated.name}" thành công!`);
    navigate(paths.agents);
  };

  return (
    <AgentConfigForm
      key={agent.id}
      agent={agent}
      onSave={handleSave}
      onCancel={() => navigate(paths.agents)}
    />
  );
}

export default AgentDetail;
