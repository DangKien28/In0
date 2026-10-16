import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';

function Header() {
  return (
    <header className="z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-slate-400 sm:inline">
          Capstone C1SE.41 • Trường Quốc tế, ĐH Duy Tân
        </span>
      </div>

      <div className="flex items-center gap-3">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
