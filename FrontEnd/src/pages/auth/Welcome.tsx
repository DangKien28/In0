import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

import { paths } from '../../routes/paths';

function Welcome() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
        <Bot className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-slate-900">
        Chào mừng đến với In0
      </h1>
      <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-600">
        Nền tảng AI Agent thông minh tự động hóa toàn diện quy trình nhân sự: từ
        đăng tuyển trên Hệ thống A, chấm điểm CV, gửi thư mời phỏng vấn đến đồng
        bộ hồ sơ vào Hệ thống B.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to={paths.home}
          className="rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
        >
          Truy cập Trang chủ (Dashboard)
        </Link>
        <Link
          to={paths.login}
          className="rounded-2xl bg-slate-100 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        >
          Đăng nhập / Đổi mật khẩu
        </Link>
      </div>
    </section>
  );
}

export default Welcome;
