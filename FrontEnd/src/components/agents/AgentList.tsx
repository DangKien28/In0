import type { Agent } from '../../types/agent';

import AgentCard from './AgentCard';

interface AgentListProps {
  agents: Agent[];
  onConfigure: (agent: Agent) => void;
  onRun: (agent: Agent) => void;
}

function AgentList({ agents, onConfigure, onRun }: AgentListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onConfigure={onConfigure}
          onRun={onRun}
        />
      ))}
    </div>
  );
}

export default AgentList;
