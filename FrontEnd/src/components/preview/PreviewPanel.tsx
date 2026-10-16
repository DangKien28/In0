import { Download, X } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

const MIN_WIDTH = 320;
const MAX_WIDTH = 900;
const KEYBOARD_STEP = 24;

interface PreviewPanelProps {
  /** Title area of the panel header (step badge, plan editor title, ...). */
  header: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onDownload?: () => void;
}

function clampWidth(width: number) {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width));
}

/**
 * Right-hand "full artifact" panel next to the chat. It starts at ~45% of the
 * row (as in the template); on large screens it can be resized by dragging (or
 * arrow keys on) its left edge, after which it keeps a fixed pixel width.
 */
function PreviewPanel({
  header,
  children,
  onClose,
  onDownload,
}: PreviewPanelProps) {
  /** Custom width in px once the user has resized; null keeps the default. */
  const [width, setWidth] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const panelRef = useRef<HTMLElement>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const currentWidth = () =>
    width ?? panelRef.current?.getBoundingClientRect().width ?? MIN_WIDTH;

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    startX.current = event.clientX;
    startWidth.current = currentWidth();
    setIsResizing(true);
  };

  const handleResizeKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setWidth(clampWidth(currentWidth() + KEYBOARD_STEP));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setWidth(clampWidth(currentWidth() - KEYBOARD_STEP));
    }
  };

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent) => {
      const delta = startX.current - event.clientX;
      setWidth(clampWidth(startWidth.current + delta));
    };

    const handlePointerUp = () => setIsResizing(false);

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing]);

  return (
    <aside
      ref={panelRef}
      aria-label="Artifact"
      style={
        width === null
          ? undefined
          : ({ '--preview-width': `${width}px` } as CSSProperties)
      }
      className="relative flex min-h-0 w-full max-w-full min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs lg:w-[var(--preview-width,48%)] lg:max-w-[65%] xl:w-[var(--preview-width,45%)]"
    >
      <div
        role="separator"
        tabIndex={0}
        aria-label="Thay đổi độ rộng panel Artifact"
        aria-orientation="vertical"
        aria-valuenow={width ?? undefined}
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        onPointerDown={handleResizeStart}
        onKeyDown={handleResizeKey}
        className="absolute top-0 bottom-0 left-0 z-10 hidden w-1.5 cursor-col-resize transition-colors hover:bg-blue-200 focus-visible:bg-blue-300 focus-visible:outline-none lg:block"
      />

      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">{header}</div>
        <div className="flex shrink-0 items-center gap-1.5">
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              title="Tải xuống tệp"
              aria-label="Tải xuống tệp"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            title="Đóng panel (Xem chat toàn màn hình)"
            aria-label="Đóng panel Artifact"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="scroll-panel min-h-0 flex-1 space-y-4 p-4">
        {children}
      </div>
    </aside>
  );
}

export default PreviewPanel;
