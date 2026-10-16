import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Field from '../../components/common/Field';
import { useToast } from '../../hooks/useToast';
import { paths } from '../../routes/paths';
import { compactInputClass } from '../../utils/formStyles';

function ResetPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // The OTP endpoint is not connected yet.
    showToast('Yêu cầu khôi phục mật khẩu đã được ghi nhận.', 'info');
    navigate(paths.login);
  };

  return (
    <section className="mx-auto max-w-md space-y-4 py-10">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Khôi Phục Mật Khẩu
          </h2>
          <p className="text-xs text-slate-500">
            Nhập email, In0 sẽ gửi mã xác thực OTP về hộp thư của bạn
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Email:" htmlFor="reset-email">
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              placeholder="email@company.vn"
              className={compactInputClass}
            />
          </Field>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700"
          >
            Gửi Mã OTP Xác Thực
          </button>
          <div className="text-center">
            <Link
              to={paths.login}
              className="text-xs text-slate-500 hover:underline"
            >
              Quay lại Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
