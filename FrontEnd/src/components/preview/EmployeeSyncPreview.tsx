import { Check } from 'lucide-react';

import { scenarioPassCandidate } from '../../data/mockScenario';

/** Step 5 artifact: the employee record created on Hệ thống B (HRM). */
function EmployeeSyncPreview() {
  const candidate = scenarioPassCandidate;

  const fields = [
    {
      label: 'Họ và tên:',
      value: candidate.name,
      className: 'font-bold text-slate-900',
    },
    {
      label: 'Mã NV (Core HRM ID):',
      value: candidate.employeeId,
      className: 'font-bold font-mono text-blue-700',
    },
    {
      label: 'Phòng ban:',
      value: candidate.department,
      className: 'font-semibold text-slate-800',
    },
    {
      label: 'Vị trí:',
      value: `${candidate.position} (${candidate.roleLevel})`,
      className: 'font-semibold text-slate-800',
    },
    {
      label: 'Email công vụ:',
      value: candidate.email,
      className: 'font-mono text-[11px] text-slate-800',
    },
    {
      label: 'Mức lương thỏa thuận:',
      value: candidate.salaryOffer,
      className: 'font-bold text-emerald-700',
    },
  ];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
          <Check className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-900">
            Hồ sơ nhân viên đã đồng bộ sang Hệ thống B!
          </div>
          <div className="text-[10px] text-emerald-700">
            Mã NV:{' '}
            <strong className="rounded bg-emerald-200/60 px-1 py-0.5 font-mono">
              {candidate.employeeId}
            </strong>{' '}
            • Ngày bắt đầu: {candidate.startDate}
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <h4 className="border-b border-slate-100 pb-2 text-xs font-bold text-slate-800">
          Thông tin nhân viên mới (Đã map theo schema Hệ thống B)
        </h4>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {fields.map((field) => (
            <div
              key={field.label}
              className="rounded-lg border border-slate-100 bg-slate-50 p-2.5"
            >
              <span className="mb-0.5 block text-[10px] text-slate-400">
                {field.label}
              </span>
              <span className={field.className}>{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeSyncPreview;
