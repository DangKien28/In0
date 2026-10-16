import { Play, Settings } from 'lucide-react';

import type { Agent } from '../../types/agent';
import { cn } from '../../utils/cn';

interface AgentCardProps {
  agent: Agent;
  onConfigure: (agent: Agent) => void;
  onRun: (agent: Agent) => void;
}

function AgentCard({ agent, onConfigure, onRun }: AgentCardProps) {
  const isActive = agent.status === 'active';

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-semibold',
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-600',
            )}
          >
            {agent.role || 'AI Agent'}
          </span>
          <span
            className={cn(
              'inline-flex shrink-0 items-center text-xs font-semibold',
              isActive ? 'text-emerald-600' : 'text-slate-400',
            )}
          >
            ● {isActive ? 'Đang kích hoạt' : 'Tạm dừng'}
          </span>
        </div>
        <h4 className="mb-1 text-base font-bold text-gray-900">{agent.name}</h4>
        <p className="mb-3 text-xs text-gray-600">{agent.description}</p>
        <div className="mb-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs text-gray-700">
          <span className="mb-0.5 block font-semibold text-gray-500">
            Workflow phụ trách:
          </span>
          <span>{agent.workflow}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => onConfigure(agent)}
          className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100"
        >
          <Settings className="h-3.5 w-3.5" /> Cấu hình & Plan
        </button>
        <button
          type="button"
          onClick={() => onRun(agent)}
          disabled={!isActive}
          title={isActive ? undefined : 'Agent đang tạm dừng'}
          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-3.5 w-3.5" /> Chạy Agent
        </button>
      </div>
    </div>
  );
}

export default AgentCard;
