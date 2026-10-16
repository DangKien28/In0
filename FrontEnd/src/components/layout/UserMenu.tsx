import {
  CircleHelp,
  LogOut,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockCurrentUser } from '../../data/mockUser';
import { useClickOutside } from '../../hooks/useClickOutside';
import { paths } from '../../routes/paths';

import UserAvatar from './UserAvatar';

const menuItems: { to: string; label: string; icon: LucideIcon }[] = [
  { to: paths.profile, label: 'Thông tin cá nhân', icon: User },
  { to: paths.settings, label: 'Cài đặt (Knowledge & Policy)', icon: Settings },
  { to: paths.help, label: 'Trợ giúp và phản hồi ý kiến', icon: CircleHelp },
];

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const user = mockCurrentUser;

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((value) => !value)}
        className="flex items-center gap-2 rounded-xl p-1 pl-2 transition-colors hover:bg-slate-100"
      >
        <div className="hidden text-right sm:block">
          <div className="text-xs font-bold text-slate-900">{user.name}</div>
          <div className="text-[10px] text-slate-500">{user.shortRole}</div>
        </div>
        <UserAvatar initials={user.initials} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-12 right-0 z-50 w-56 rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl"
        >
          <div className="border-b border-slate-100 px-4 py-2">
            <div className="text-xs font-bold text-slate-900">
              {user.name} (HR Manager)
            </div>
            <div className="text-[11px] text-slate-400">{user.email}</div>
          </div>

          {menuItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={close}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}

          <div className="my-1 border-t border-slate-100" />

          <Link
            to={paths.login}
            role="menuitem"
            onClick={close}
            className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
