import { Bell, CircleAlert, ShieldAlert } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockNotifications } from '../../data/mockChat';
import { useChatFlow } from '../../hooks/useChatFlow';
import { useClickOutside } from '../../hooks/useClickOutside';
import { paths } from '../../routes/paths';
import type { AppNotification } from '../../types/common';
import { cn } from '../../utils/cn';

const toneStyles = {
  approval: {
    box: 'bg-amber-50/70 border-amber-200/80 hover:bg-amber-100/50',
    title: 'text-amber-900',
    text: 'text-amber-700',
    icon: CircleAlert,
  },
  conflict: {
    box: 'bg-rose-50/70 border-rose-200/80 hover:bg-rose-100/50',
    title: 'text-rose-900',
    text: 'text-rose-700',
    icon: ShieldAlert,
  },
};

function NotificationsMenu() {
  const navigate = useNavigate();
  const { openArtifact } = useChatFlow();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadIds, setUnreadIds] = useState(() =>
    mockNotifications.map((n) => n.id),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  const handleOpen = (notification: AppNotification) => {
    setUnreadIds((ids) => ids.filter((id) => id !== notification.id));
    setIsOpen(false);

    if (notification.action === 'open-approval') {
      openArtifact(2);
      navigate(paths.chat);
    } else {
      navigate(paths.work);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Thông báo"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
      >
        <Bell className="h-5 w-5" />
        {unreadIds.length > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-1 pb-2">
            <span className="text-xs font-bold text-slate-900">
              Thông báo chờ xử lý ({unreadIds.length})
            </span>
            <button
              type="button"
              onClick={() => setUnreadIds([])}
              className="text-[11px] font-semibold text-blue-600"
            >
              Đã đọc tất cả
            </button>
          </div>

          <div className="mt-2 space-y-2">
            {mockNotifications.map((notification) => {
              const tone = toneStyles[notification.tone];
              const Icon = tone.icon;
              const isUnread = unreadIds.includes(notification.id);

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleOpen(notification)}
                  className={cn(
                    'block w-full space-y-1 rounded-xl border p-2.5 text-left text-xs',
                    tone.box,
                    !isUnread && 'opacity-60',
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1 font-bold',
                      tone.title,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" /> {notification.title}
                  </div>
                  <div className={cn('text-[11px]', tone.text)}>
                    {notification.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsMenu;
