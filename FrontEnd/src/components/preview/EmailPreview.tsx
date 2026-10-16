import { CircleCheck, UserPlus } from 'lucide-react';

import { useChatFlow } from '../../hooks/useChatFlow';

/** Step 4 artifact: the personalised interview invitation email. */
function EmailPreview() {
  const { syncPassedCandidate } = useChatFlow();

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 font-semibold text-emerald-800">
        <span className="flex items-center gap-1.5">
          <CircleCheck className="h-4 w-4 text-emerald-600" />
          Đã gửi email mời phỏng vấn qua SendGrid Gateway
        </span>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="space-y-1 border-b border-slate-100 pb-2 text-[11px]">
          <div>
            <span className="font-bold text-slate-500">Người gửi:</span>{' '}
            recruitment@company.vn (In0 HR Agent)
          </div>
          <div>
            <span className="font-bold text-slate-500">Người nhận:</span>{' '}
            huy.lequoc@example.com (và các ứng viên đã duyệt)
          </div>
          <div>
            <span className="font-bold text-slate-500">Tiêu đề:</span> [Thư mời
            phỏng vấn] Vị trí Senior Frontend Engineer - In0 Tech
          </div>
        </div>
        <div className="space-y-2 text-xs leading-relaxed text-slate-700">
          <p>
            Chào bạn <strong>Lê Quốc Huy</strong>,
          </p>
          <p>
            Chúng tôi đã nhận và đánh giá rất cao hồ sơ ứng tuyển của bạn với
            kinh nghiệm 4 năm chuyên sâu về React & TypeScript cho vị trí Senior
            Frontend Engineer.
          </p>
          <div className="space-y-1 rounded-lg border border-slate-100 bg-slate-50 p-2.5 font-mono text-[11px]">
            <div>• Thời gian: 14:00 - 15:00, Thứ Sáu, ngày 05/10/2026</div>
            <div>• Hình thức: Google Meet (Link đính kèm)</div>
            <div>• Hội đồng phỏng vấn: Tech Lead & HR Manager</div>
          </div>
          <p className="pt-1 text-slate-500 italic">
            Trân trọng,
            <br />
            Ban Tuyển dụng & Đội ngũ In0 AI
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={syncPassedCandidate}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white shadow transition-all hover:bg-emerald-700"
      >
        <UserPlus className="h-3.5 w-3.5" /> Ứng viên Lê Quốc Huy đã PASS ➔ Đồng
        bộ sang Hệ thống B
      </button>
    </div>
  );
}

export default EmailPreview;
