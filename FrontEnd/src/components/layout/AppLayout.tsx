import { Outlet, useMatch } from 'react-router-dom';

import { paths } from '../../routes/paths';
import { cn } from '../../utils/cn';

import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  // The chat view manages its own scroll areas, so the page itself must not scroll.
  const isChat = useMatch(paths.chat) !== null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main
          className={cn(
            'flex min-h-0 flex-1 flex-col p-4 sm:p-6',
            isChat ? 'overflow-hidden' : 'overflow-y-auto',
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
