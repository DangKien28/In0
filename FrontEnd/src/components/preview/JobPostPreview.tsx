import { CircleCheck } from 'lucide-react';

/** Step 1 artifact: the job post published on Hệ thống A. */
function JobPostPreview() {
  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-2.5 font-semibold text-blue-800">
        <span className="flex items-center gap-1.5">
          <CircleCheck className="h-4 w-4 text-blue-600" />
          Bài đăng đã xuất bản thành công lên Hệ thống A
        </span>
        <span className="font-mono text-[11px] text-blue-600">#A-JOB-8942</span>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="border-b border-slate-100 pb-2.5">
          <span className="mb-1.5 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            Đang nhận hồ sơ
          </span>
          <h2 className="text-sm font-bold text-slate-900">
            Senior Frontend React Engineer (TypeScript / Next.js)
          </h2>
          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
            <span>📍 Đà Nẵng / Remote</span>
            <span>💰 28,000,000 - 38,000,000 VNĐ</span>
            <span>📅 Hạn: 30/10/2026</span>
          </div>
        </div>

        <div>
          <h4 className="mb-1 font-bold text-slate-800">Mô tả công việc:</h4>
          <ul className="list-inside list-disc space-y-1 leading-relaxed text-slate-600">
            <li>
              Kiến trúc Frontend, xây dựng web application hiệu năng cao với
              React & TypeScript.
            </li>
            <li>
              Phối hợp cùng Product Team và Backend Team thiết kế API Contract
              và Design System.
            </li>
            <li>
              Tối ưu hóa Core Web Vitals, bảo đảm độ trễ và tính khả dụng của hệ
              thống.
            </li>
          </ul>
        </div>

        <div className="border-t border-slate-100 pt-2">
          <h4 className="mb-1 font-bold text-slate-800">Yêu cầu ứng viên:</h4>
          <ul className="list-inside list-disc space-y-1 leading-relaxed text-slate-600">
            <li>
              3+ năm kinh nghiệm làm việc với ReactJS, Next.js và TypeScript.
            </li>
            <li>
              Hiểu sâu về State Management (Zustand, Redux) và REST/GraphQL API.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobPostPreview;
