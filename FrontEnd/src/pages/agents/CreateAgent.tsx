import { useNavigate } from 'react-router-dom';

import AgentConfigForm from '../../components/agents/AgentConfigForm';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';
import { paths } from '../../routes/paths';
import type { Agent } from '../../types/agent';

function CreateAgent() {
  const navigate = useNavigate();
  const { saveAgent } = useAppData();
  const { showToast } = useToast();

  const handleSave = (agent: Agent) => {
    saveAgent(agent);
    showToast(`Đã thêm mới thành công AI Agent "${agent.name}"!`);
    navigate(paths.agents);
  };

  return (
    <AgentConfigForm
      onSave={handleSave}
      onCancel={() => navigate(paths.agents)}
    />
  );
}

export default CreateAgent;
