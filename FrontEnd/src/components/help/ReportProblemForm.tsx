import { Bug, Info } from 'lucide-react';
import type { FormEvent } from 'react';

import { useToast } from '../../hooks/useToast';
import { compactInputClass, textareaClass } from '../../utils/formStyles';
import Field from '../common/Field';

function ReportProblemForm() {
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No bug-report API yet: confirm locally and clear the form.
    showToast('Cảm ơn bạn! Báo cáo sự cố đã được ghi nhận.');
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 font-bold text-rose-700">
          <Bug className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Báo Cáo Lỗi & Sự Cố
          </h3>
          <p className="text-[11px] text-slate-500">
            Giúp chúng tôi hoàn thiện nền tảng In0 tốt hơn
          </p>
        </div>
      </div>

      <div className="space-y-1 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-[11px] text-amber-900">
        <div className="flex items-center gap-1 font-bold">
          <Info className="h-3.5 w-3.5" /> Hướng dẫn báo cáo sự cố hiệu quả:
        </div>
        <p>1. Mô tả ngắn gọn hiện tượng lỗi phát sinh.</p>
        <p>
          2. Nêu rõ các bước tái hiện (Click vào đâu, chọn workflow nào,...).
        </p>
        <p>3. Đính kèm ảnh chụp màn hình (Screenshot) minh chứng lỗi.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Mô tả sự cố:" htmlFor="bug-summary">
          <input
            id="bug-summary"
            required
            placeholder="Ví dụ: Không tải được danh sách ứng viên từ bài đăng #A-JOB"
            className={compactInputClass}
          />
        </Field>
        <Field
          label="Các bước tái hiện (Steps to reproduce):"
          htmlFor="bug-steps"
        >
          <textarea
            id="bug-steps"
            rows={3}
            required
            placeholder="Bước 1: Vào trang Chat, Bước 2: Bấm nút Duyệt ứng viên, Bước 3: Xuất hiện thông báo lỗi..."
            className={textareaClass}
          />
        </Field>
        <Field
          label="Đính kèm ảnh minh chứng (Screenshots):"
          htmlFor="bug-screenshot"
        >
          <input
            id="bug-screenshot"
            type="file"
            accept="image/*"
            className="w-full text-xs text-slate-500 file:mr-2 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </Field>
        <button
          type="submit"
          className="w-full rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-rose-700"
        >
          Gửi Báo Cáo Sự Cố
        </button>
      </form>
    </div>
  );
}

export default ReportProblemForm;
