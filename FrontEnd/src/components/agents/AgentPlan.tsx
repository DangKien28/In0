import {
  ArrowDown,
  Info,
  Layers,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

import type { AgentPlanStep, AgentStepType } from '../../types/agent';
import type { PlatformKind } from '../../types/plan';
import { cn } from '../../utils/cn';
import {
  agentPlatformOptions,
  getPlatformKind,
  platformIcons,
} from '../../utils/platform';

const platformBadgeClasses: Record<PlatformKind, string> = {
  systemA: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  systemB: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  hitl: 'bg-amber-50 text-amber-700 border-amber-200',
  email: 'bg-purple-50 text-purple-700 border-purple-200',
  ai: 'bg-blue-50 text-blue-700 border-blue-200',
  other: 'bg-blue-50 text-blue-700 border-blue-200',
};

const typeBadgeClasses: Record<AgentStepType, string> = {
  'Tự động hóa': 'bg-blue-100 text-blue-700',
  'Phê duyệt HITL': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Kiểm định Policy':
    'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

interface AgentPlanProps {
  steps: AgentPlanStep[];
  onAddStep: (step: AgentPlanStep) => void;
  onDeleteStep: (index: number) => void;
  onReset: () => void;
}

/** Visual Plan Preview of an agent's multi-step execution plan. */
function AgentPlan({
  steps,
  onAddStep,
  onDeleteStep,
  onReset,
}: AgentPlanProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState('');
  const [platform, setPlatform] = useState<string>(
    agentPlatformOptions[0].value,
  );
  const [output, setOutput] = useState('');

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    onAddStep({
      step: steps.length + 1,
      task: trimmedTask,
      platform,
      input: 'Dữ liệu chuyển giao từ bước trước',
      output: output.trim() || 'Artifact kết quả sinh ra',
      type: platform.includes('HITL') ? 'Phê duyệt HITL' : 'Tự động hóa',
    });
    setTask('');
    setOutput('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Plan Preview</h3>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                {steps.length} Bước
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sơ đồ các bước thực thi mẫu do Agent đảm nhiệm theo Workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            title="Khôi phục các bước mẫu theo Workflow"
            className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Mặc định
          </button>
          <button
            type="button"
            onClick={() => setIsAdding((value) => !value)}
            aria-expanded={isAdding}
            className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm bước
          </button>
        </div>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="space-y-3 rounded-2xl border border-blue-200 bg-slate-50 p-4 text-xs"
        >
          <div className="flex items-center justify-between font-bold text-blue-900">
            <span>Thêm bước mới vào Plan Preview</span>
            <button
              type="button"
              aria-label="Đóng"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">
                Tên tác vụ / Bước:
              </span>
              <input
                type="text"
                required
                autoFocus
                value={task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="Ví dụ: Gửi thông báo phê duyệt Slack..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">
                Nền tảng thực thi:
              </span>
              <select
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold outline-none"
              >
                {agentPlatformOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block font-semibold text-slate-700">
                Kết quả đầu ra (Artifact):
              </span>
              <input
                type="text"
                value={output}
                onChange={(event) => setOutput(event.target.value)}
                placeholder="Ví dụ: Báo cáo kết quả / Mã xác nhận..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 font-semibold text-slate-600 hover:text-slate-900"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-1.5 font-bold text-white shadow hover:bg-blue-700"
            >
              Thêm vào sơ đồ
            </button>
          </div>
        </form>
      )}

      {steps.length === 0 ? (
        <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Layers className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold text-slate-600">
            Chưa có bước thực thi nào trong Plan Preview
          </p>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Tải mẫu bước mặc định
          </button>
        </div>
      ) : (
        <ol className="space-y-3">
          {steps.map((step, index) => {
            const kind = getPlatformKind(step.platform);
            const PlatformIcon = platformIcons[kind];

            return (
              <li key={`${index}-${step.task}`} className="space-y-1">
                <div className="relative space-y-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-xs font-black text-blue-700">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-bold',
                              platformBadgeClasses[kind],
                            )}
                          >
                            <PlatformIcon className="h-3 w-3" /> {step.platform}
                          </span>
                          <span
                            className={cn(
                              'rounded-lg px-2 py-0.5 text-[10px] font-semibold',
                              typeBadgeClasses[step.type],
                            )}
                          >
                            {step.type}
                          </span>
                        </div>
                        <h4 className="mt-1 text-xs leading-snug font-bold text-slate-900">
                          {step.task}
                        </h4>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteStep(index)}
                      title="Xóa bước này khỏi Plan"
                      aria-label={`Xóa bước ${index + 1}`}
                      className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 border-t border-slate-100 pt-2 text-[11px] sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                        Đầu vào (Input):
                      </span>
                      <span className="line-clamp-2 font-medium text-slate-700">
                        {step.input}
                      </span>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-2">
                      <span className="block text-[10px] font-semibold text-blue-500 uppercase">
                        Đầu ra (Artifact):
                      </span>
                      <span className="line-clamp-2 font-medium text-blue-900">
                        {step.output}
                      </span>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="my-1 flex justify-center" aria-hidden="true">
                    <ArrowDown className="h-4 w-4 text-blue-400" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}

      <div className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-[11px] text-slate-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <div>
          <strong>Cơ chế hoạt động Plan Preview:</strong> Sơ đồ này biểu diễn kế
          hoạch đa bước (Multi-step Execution Plan) được AI Agent tự động khởi
          tạo khi nhận lệnh từ HR. Các bước có thể được tinh chỉnh tự động hoặc
          chỉ đạo điều chỉnh trong quá trình vận hành (HITL).
        </div>
      </div>
    </div>
  );
}

export default AgentPlan;
