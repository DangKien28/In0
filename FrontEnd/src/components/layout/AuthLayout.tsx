import { Bot } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

import { paths } from '../../routes/paths';

/** Minimal shell for Welcome / Login / Reset password (no sidebar or top bar). */
function AuthLayout() {
  return (
    <div className="min-h-screen overflow-y-auto bg-slate-50 px-4 text-slate-800">
      <header className="mx-auto flex h-16 max-w-5xl items-center">
        <Link to={paths.welcome} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-white shadow-md shadow-blue-500/20">
            <Bot className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            In<span className="text-blue-600">0</span>
          </span>
        </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
