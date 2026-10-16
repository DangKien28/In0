import {
  ChevronDown,
  ChevronUp,
  Play,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { useChatFlow } from '../../hooks/useChatFlow';
import { useToast } from '../../hooks/useToast';
import type { StepInputMode } from '../../types/plan';
import { cn } from '../../utils/cn';
import { getPlatformKind, planPlatformOptions } from '../../utils/platform';

const inputModes: { value: StepInputMode; label: string }[] = [
  { value: 'text', label: 'Mô tả' },
  { value: 'file', label: 'File' },
  { value: 'previous_output', label: 'Output' },
];

/** Full plan editor shown in the artifact panel ("Tinh chỉnh Kế hoạch"). */
function PlanPreview() {
  const {
    planSteps,
    moveStep,
    addStep,
    deleteStep,
    updateStep,
    replan,
    approveAndRunPlan,
  } = useChatFlow();
  const { showToast } = useToast();
  const [instruction, setInstruction] = useState('');

  const handleDelete = (index: number) => {
    if (!deleteStep(index)) {
      showToast('Kế hoạch cần tối thiểu 1 bước!', 'info');
    }
  };

  const handleReplan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = instruction.trim();
    if (!value) return;

    replan(value);
    setInstruction('');
    showToast('✨ Đã cập nhật thêm bước vào Kế hoạch!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-slate-700">
          Danh sách các bước thực thi
        </span>
        <button
          type="button"
          onClick={addStep}
          className="flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 transition-all hover:bg-blue-100"
        >
          <Plus className="h-3.5 w-3.5" /> Thêm bước
        </button>
      </div>

      <div className="space-y-3">
        {planSteps.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === planSteps.length - 1;
          const currentMode = item.inputMode ?? 'text';
          const platformKind = getPlatformKind(item.platform);
          const selectedPlatform =
            planPlatformOptions.find((option) => option.kind === platformKind)
              ?.value ?? planPlatformOptions[1].value;

          return (
            <div
              key={`${item.step}-${item.task}`}
              className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <div className="flex flex-col items-center rounded bg-slate-100 p-0.5">
                    <button
                      type="button"
                      disabled={isFirst}
                      aria-label={`Di chuyển bước ${index + 1} lên`}
                      onClick={() => moveStep(index, -1)}
                      className="hover:text-blue-600 disabled:opacity-25"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      aria-label={`Di chuyển bước ${index + 1} xuống`}
                      onClick={() => moveStep(index, 1)}
                      className="hover:text-blue-600 disabled:opacity-25"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-700">
                    #{index + 1}
                  </span>
                  <input
                    type="text"
                    aria-label={`Tên bước ${index + 1}`}
                    defaultValue={item.task}
                    onBlur={(event) => {
                      const task = event.target.value.trim();
                      if (task && task !== item.task)
                        updateStep(index, { task });
                    }}
                    className="min-w-0 flex-1 rounded border border-transparent bg-slate-50 px-2 py-1 text-xs font-bold text-slate-900 outline-none focus:border-blue-400 focus:bg-white"
                  />
                </div>
                <button
                  type="button"
                  aria-label={`Xóa bước ${index + 1}`}
                  onClick={() => handleDelete(index)}
                  className="rounded p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <label className="block">
                  <span className="mb-0.5 block font-semibold text-slate-400">
                    Nền tảng đích:
                  </span>
                  <select
                    value={selectedPlatform}
                    onChange={(event) =>
                      updateStep(index, { platform: event.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-800"
                  >
                    {planPlatformOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <span className="mb-0.5 block font-semibold text-slate-400">
                    Chế độ Input:
                  </span>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                    {inputModes.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        aria-pressed={currentMode === mode.value}
                        onClick={() =>
                          updateStep(index, { inputMode: mode.value })
                        }
                        className={cn(
                          'flex-1 rounded py-1 text-[10px] font-semibold',
                          currentMode === mode.value
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600',
                        )}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleReplan}
        className="space-y-2 rounded-xl border border-blue-200 bg-blue-50/50 p-3"
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Chỉ đạo AI điều chỉnh kế hoạch</span>
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
            aria-label="Chỉ đạo AI điều chỉnh kế hoạch"
            placeholder="Ví dụ: Thêm 1 bước phỏng vấn tiếng Anh..."
            className="flex-1 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
          >
            Cập nhật
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={approveAndRunPlan}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-bold text-white shadow transition-all hover:bg-blue-700"
      >
        <Play className="h-3.5 w-3.5 fill-white" /> Lưu & Duyệt chạy kế hoạch
      </button>
    </div>
  );
}

export default PlanPreview;
