import {
  ArrowLeft,
  Bot,
  FileText,
  GitFork,
  Save,
  Sparkles,
} from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

import {
  CUSTOM_WORKFLOW,
  DEFAULT_AGENT_PROMPT,
  getPlanTemplateForWorkflow,
  mockWorkflows,
} from '../../data/mockAgents';
import { useToast } from '../../hooks/useToast';
import type { Agent, AgentPlanStep, AgentStatus } from '../../types/agent';
import { cn } from '../../utils/cn';
import { inputClass } from '../../utils/formStyles';
import Field from '../common/Field';

import AgentPlan from './AgentPlan';

const FORM_ID = 'agent-config-form';

interface AgentConfigFormProps {
  /** Agent being edited; omit to create a new one. */
  agent?: Agent;
  onSave: (agent: Agent) => void;
  onCancel: () => void;
}

function SectionCard({
  icon,
  iconClass,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  iconClass: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-xl',
            iconClass,
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-400">{description}</p>
        </div>
      </div>
      <div className="space-y-3 text-xs">{children}</div>
    </div>
  );
}

function isKnownWorkflow(name: string) {
  return mockWorkflows.some((workflow) => workflow.name === name);
}

/** Agent configuration page body: identity, workflow, prompt and Plan Preview. */
function AgentConfigForm({ agent, onSave, onCancel }: AgentConfigFormProps) {
  const { showToast } = useToast();
  const initialWorkflow = agent?.workflow ?? mockWorkflows[0].name;
  const startsCustom = !isKnownWorkflow(initialWorkflow);

  const [name, setName] = useState(agent?.name ?? '');
  const [role, setRole] = useState(agent?.role ?? '');
  const [status, setStatus] = useState<AgentStatus>(agent?.status ?? 'active');
  const [workflowChoice, setWorkflowChoice] = useState(
    startsCustom ? CUSTOM_WORKFLOW : initialWorkflow,
  );
  const [customWorkflow, setCustomWorkflow] = useState(
    startsCustom ? initialWorkflow : '',
  );
  const [description, setDescription] = useState(agent?.description ?? '');
  const [prompt, setPrompt] = useState(
    agent?.promptTemplate ?? DEFAULT_AGENT_PROMPT,
  );
  const [planSteps, setPlanSteps] = useState<AgentPlanStep[]>(() =>
    agent?.planSteps.length
      ? agent.planSteps.map((step) => ({ ...step }))
      : getPlanTemplateForWorkflow(initialWorkflow),
  );

  const selectedWorkflow = mockWorkflows.find(
    (workflow) => workflow.name === workflowChoice,
  );

  const handleWorkflowChange = (value: string) => {
    setWorkflowChoice(value);
    setPlanSteps(getPlanTemplateForWorkflow(value));
    showToast(
      `Đã đồng bộ Plan Preview theo: ${value === CUSTOM_WORKFLOW ? 'Tùy biến' : value}`,
      'info',
    );
  };

  const handleDeleteStep = (index: number) => {
    if (planSteps.length <= 1) {
      showToast('Quy trình cần có ít nhất 1 bước!', 'info');
      return;
    }
    setPlanSteps((steps) =>
      steps
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, step: i + 1 })),
    );
    showToast('Đã xóa bước khỏi Plan Preview', 'info');
  };

  const handleAddStep = (step: AgentPlanStep) => {
    setPlanSteps((steps) => [...steps, step]);
    showToast('Đã thêm bước mới vào Plan Preview!');
  };

  const handleResetPlan = () => {
    setPlanSteps(getPlanTemplateForWorkflow(workflowChoice));
    showToast('Đã khôi phục Plan Preview về mẫu chuẩn!');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const workflow =
      workflowChoice === CUSTOM_WORKFLOW
        ? customWorkflow.trim() || 'Quy trình tùy biến cá nhân'
        : workflowChoice;

    onSave({
      id: agent?.id ?? `agent-${crypto.randomUUID()}`,
      name: name.trim(),
      role: role.trim() || 'AI Agent chuyên trách',
      status,
      workflow,
      description:
        description.trim() || 'Agent được tùy biến cấu hình bởi người dùng.',
      promptTemplate: prompt.trim(),
      planSteps,
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 px-4 shadow-xs md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            title="Quay lại danh sách Agent"
            className="flex items-center gap-1.5 rounded-lg p-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Quay lại
          </button>
          <div className="hidden h-5 w-px bg-slate-200 sm:block" />
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {agent ? `Cấu hình AI Agent: ${agent.name}` : 'Cấu hình AI Agent'}
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Thiết lập danh tính Agent, liên kết Workflow chuyên trách và trực
              quan hóa Plan Preview.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
          >
            Hủy
          </button>
          <button
            type="submit"
            form={FORM_ID}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700"
          >
            <Save className="h-3.5 w-3.5" /> Lưu cấu hình Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <form
          id={FORM_ID}
          onSubmit={handleSubmit}
          className="space-y-5 lg:col-span-5"
        >
          <SectionCard
            icon={<Bot className="h-4 w-4" />}
            iconClass="bg-blue-50 text-blue-600"
            title="Tên Agent"
            description="Định danh chuyên môn của AI Agent trong hệ thống"
          >
            <Field label="Tên Agent" htmlFor="agent-name" required>
              <input
                id="agent-name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ví dụ: CV Screener & Evaluator Agent"
                className={inputClass}
              />
            </Field>
            <Field
              label="Vai trò / Chuyên trách (Role)"
              htmlFor="agent-role"
              required
            >
              <input
                id="agent-role"
                required
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Ví dụ: Chuyên gia sàng lọc & đối chiếu CV"
                className={inputClass}
              />
            </Field>
            <fieldset>
              <legend className="mb-1 block font-bold text-slate-700">
                Trạng thái hoạt động
              </legend>
              <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="agent-status"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                    className="accent-blue-600"
                  />
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />{' '}
                    Đang kích hoạt
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="agent-status"
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')}
                    className="accent-blue-600"
                  />
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-slate-400" /> Tạm
                    dừng
                  </span>
                </label>
              </div>
            </fieldset>
          </SectionCard>

          <SectionCard
            icon={<GitFork className="h-4 w-4" />}
            iconClass="bg-indigo-50 text-indigo-600"
            title="Workflow"
            description="Gán quy trình công việc và hệ thống đích cho Agent phụ trách"
          >
            <Field
              label="Chọn quy trình Workflow"
              htmlFor="agent-workflow"
              required
            >
              <select
                id="agent-workflow"
                value={workflowChoice}
                onChange={(event) => handleWorkflowChange(event.target.value)}
                className={cn(
                  inputClass,
                  'font-semibold focus:border-indigo-500',
                )}
              >
                {mockWorkflows.map((workflow) => (
                  <option key={workflow.id} value={workflow.name}>
                    {workflow.name}
                  </option>
                ))}
                <option value={CUSTOM_WORKFLOW}>
                  -- Tùy biến Workflow mới... --
                </option>
              </select>
            </Field>

            {workflowChoice === CUSTOM_WORKFLOW && (
              <Field
                label="Tên Workflow tùy biến:"
                htmlFor="agent-workflow-custom"
              >
                <input
                  id="agent-workflow-custom"
                  value={customWorkflow}
                  onChange={(event) => setCustomWorkflow(event.target.value)}
                  placeholder="Nhập tên workflow mới..."
                  className={inputClass}
                />
              </Field>
            )}

            <div className="space-y-1 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-xs">
              {selectedWorkflow ? (
                <>
                  <div className="flex items-center justify-between gap-2 font-bold text-indigo-900">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
                      <span className="truncate">{selectedWorkflow.name}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[10px] font-bold text-indigo-500">
                      {planSteps.length} Bước
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                    {selectedWorkflow.description}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />{' '}
                    Workflow tùy biến cá nhân hóa
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Bạn có thể tự định nghĩa quy trình, đặt tên workflow và tinh
                    chỉnh các bước trong sơ đồ <strong>Plan Preview</strong> bên
                    phải.
                  </p>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard
            icon={<FileText className="h-4 w-4" />}
            iconClass="bg-emerald-50 text-emerald-600"
            title="Mô tả"
            description="Mô tả chức năng và System Prompt điều khiển hành vi của Agent"
          >
            <Field label="Mô tả ngắn gọn:" htmlFor="agent-desc">
              <input
                id="agent-desc"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tóm tắt ngắn gọn chức năng của Agent để hiển thị trên danh sách..."
                className={cn(inputClass, 'focus:border-emerald-500')}
              />
            </Field>
            <Field
              label="Mô tả chi tiết & Prompt Template"
              htmlFor="agent-prompt"
              required
            >
              <textarea
                id="agent-prompt"
                required
                rows={5}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Nhập chỉ đạo chi tiết cho Agent: tiêu chuẩn đối soát CV, quy định chính sách ngân sách lương, điều kiện kích hoạt phê duyệt HITL..."
                className={cn(
                  inputClass,
                  'p-3.5 font-mono leading-relaxed focus:border-emerald-500',
                )}
              />
            </Field>
          </SectionCard>
        </form>

        <div className="space-y-4 lg:col-span-7">
          <AgentPlan
            steps={planSteps}
            onAddStep={handleAddStep}
            onDeleteStep={handleDeleteStep}
            onReset={handleResetPlan}
          />
        </div>
      </div>
    </section>
  );
}

export default AgentConfigForm;
