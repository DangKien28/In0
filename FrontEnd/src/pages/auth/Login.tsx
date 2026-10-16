import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Field from '../../components/common/Field';
import { paths } from '../../routes/paths';
import { compactInputClass } from '../../utils/formStyles';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Authentication is not connected yet; continue to the dashboard.
    navigate(paths.home);
  };

  return (
    <section className="mx-auto max-w-md space-y-4 py-10">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Đăng Nhập In0</h2>
          <p className="text-xs text-slate-500">
            Đăng nhập tài khoản HR để quản lý quy trình
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Email:" htmlFor="login-email">
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              placeholder="email@company.vn"
              className={compactInputClass}
            />
          </Field>
          <Field label="Mật khẩu:" htmlFor="login-password">
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              className={compactInputClass}
            />
          </Field>
          <div className="flex justify-end">
            <Link
              to={paths.resetPassword}
              className="text-xs text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
