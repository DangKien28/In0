import {
  Bot,
  Briefcase,
  Cpu,
  LayoutDashboard,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { chatHistory } from '../../data/mockChat';
import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';
import { cn } from '../../utils/cn';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  iconClass: string;
  end?: boolean;
}

const navItems: NavItem[] = [
  {
    to: paths.home,
    label: 'Trang chủ (Home)',
    icon: LayoutDashboard,
    iconClass: 'text-blue-600',
    end: true,
  },
  {
    to: paths.work,
    label: 'WORK (Danh sách việc)',
    icon: Briefcase,
    iconClass: 'text-indigo-500',
  },
  {
    to: paths.plugins,
    label: 'Phần mềm liên kết',
    icon: Cpu,
    iconClass: 'text-blue-500',
  },
  {
    to: paths.agents,
    label: 'Trợ lý AI của tôi',
    icon: Users,
    iconClass: 'text-emerald-500',
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { openArtifact, startNewChat } = useChatFlow();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeChatId, setActiveChatId] = useState('chat-today-1');

  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  const handleOpenChat = (chatId: string) => {
    setActiveChatId(chatId);
    openArtifact(2);
    navigate(paths.chat);
  };

  const handleNewChat = () => {
    setActiveChatId('');
    startNewChat();
    navigate(paths.chat);
  };

  return (
    <aside
      className={cn(
        'z-30 flex shrink-0 flex-col justify-between border-r border-slate-200 bg-white transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex flex-col">
        <div
          className={cn(
            'flex h-16 items-center border-b border-slate-100 px-4',
            isCollapsed ? 'justify-center' : 'justify-between',
          )}
        >
          {!isCollapsed && (
            <Link to={paths.home} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-white shadow-md shadow-blue-500/20">
                <Bot className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                In<span className="text-blue-600">0</span>
              </span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed((value) => !value)}
            title="Thu phóng sidebar"
            aria-label="Thu phóng sidebar"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <ToggleIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map(({ to, label, icon: Icon, iconClass, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={isCollapsed ? label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition-all',
                  isCollapsed && 'justify-center',
                  isActive
                    ? 'bg-blue-50 font-bold text-blue-600'
                    : 'font-semibold text-slate-700 hover:bg-slate-100',
                )
              }
            >
              <Icon className={cn('h-4 w-4 shrink-0', iconClass)} />
              {!isCollapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="my-1 px-4">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-2 py-2">
        {!isCollapsed && (
          <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            <span>Lịch sử trò chuyện</span>
            <button
              type="button"
              onClick={handleNewChat}
              className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 normal-case hover:text-blue-700"
            >
              <Plus className="h-3.5 w-3.5" /> Mới
            </button>
          </div>
        )}

        <div className="mt-1 flex-1 space-y-1 overflow-y-auto pr-1">
          {chatHistory.map((group) => (
            <div key={group.group} className="mb-3">
              {!isCollapsed && (
                <div className="mb-1.5 px-3 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  {group.group}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    title={item.title}
                    onClick={() => handleOpenChat(item.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition-all hover:bg-gray-100 hover:text-blue-600',
                      isCollapsed && 'justify-center',
                      item.id === activeChatId
                        ? 'bg-blue-50/70 font-semibold text-blue-700'
                        : 'text-gray-700',
                    )}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-gray-400" />
                    {!isCollapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex items-center justify-between border-t border-slate-100 p-3 text-[11px] text-slate-400">
          <span>In0 MVP v1.2</span>
          <div className="flex gap-2">
            <Link to={paths.welcome} className="hover:text-blue-600">
              Welcome
            </Link>
            <span>•</span>
            <Link to={paths.login} className="hover:text-blue-600">
              Login
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
