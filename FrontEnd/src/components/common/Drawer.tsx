import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

/** Right-hand sliding panel with a blurred backdrop. */
function Drawer({ open, title, onClose, footer, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 flex h-full w-full flex-col justify-between overflow-hidden border border-slate-200/90 bg-white shadow-2xl transition-all duration-300 sm:top-4 sm:right-4 sm:bottom-4 sm:h-[calc(100vh-2rem)] sm:max-w-lg sm:rounded-3xl',
          open ? 'translate-x-0' : 'translate-x-[110%]',
        )}
      >
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 p-4">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
}

export default Drawer;
