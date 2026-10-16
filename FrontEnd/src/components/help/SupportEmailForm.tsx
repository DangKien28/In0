import { Mail } from 'lucide-react';
import type { FormEvent } from 'react';

import { mockCurrentUser } from '../../data/mockUser';
import { useToast } from '../../hooks/useToast';
import { compactInputClass, textareaClass } from '../../utils/formStyles';
import Field from '../common/Field';

function SupportEmailForm() {
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No support-ticket API yet: confirm locally and clear the form.
    showToast('Yêu cầu trợ giúp đã được ghi nhận!');
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Gửi Email Trợ Giúp
          </h3>
          <p className="text-[11px] text-slate-500">
            Đội ngũ kỹ sư sẽ phản hồi trong vòng 2 giờ
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Email của bạn:" htmlFor="support-email">
          <input
            id="support-email"
            type="email"
            required
            defaultValue={mockCurrentUser.email}
            className={compactInputClass}
          />
        </Field>
        <Field label="Chủ đề cần hỗ trợ:" htmlFor="support-subject">
          <input
            id="support-subject"
            required
            placeholder="Ví dụ: Lỗi xác thực token API Hệ thống A..."
            className={compactInputClass}
          />
        </Field>
        <Field label="Nội dung chi tiết:" htmlFor="support-body">
          <textarea
            id="support-body"
            rows={4}
            required
            placeholder="Mô tả cụ thể câu hỏi hoặc thắc mắc của bạn..."
            className={textareaClass}
          />
        </Field>
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-blue-700"
        >
          Gửi Email Trợ Giúp
        </button>
      </form>
    </div>
  );
}

export default SupportEmailForm;
