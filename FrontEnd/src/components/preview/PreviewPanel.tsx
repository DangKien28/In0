
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type PreviewMode =
  | 'plan'
  | 'files'
  | 'output'
  | 'step'
  | 'artifact'
  | 'required-input'
  | 'approval'
  | 'conflict'
  | 'execution';

interface PreviewPanelProps {
  title: string;
  mode?: PreviewMode;
  children: ReactNode;
  onClose?: () => void;
}

function PreviewPanel({
  title,
  mode = 'plan',
  children,
  onClose,
}: PreviewPanelProps) {
  const [width, setWidth] = useState(390);
  const [isResizing, setIsResizing] = useState(false);

  const startX = useRef(0);
  const startWidth = useRef(390);

  const handleResizeStart = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    startX.current = event.clientX;
    startWidth.current = width;
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent) => {
      const delta = startX.current - event.clientX;
      const nextWidth = Math.min(
        900,
        Math.max(280, startWidth.current + delta),
      );

      setWidth(nextWidth);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
    };

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
      className="work-preview"
      aria-label={`${title} preview`}
      style={{ '--preview-width': `${width}px` } as React.CSSProperties}
    >
      <div
        className="preview-resizer"
        role="separator"
        aria-label="Resize preview panel"
        aria-orientation="vertical"
        onPointerDown={handleResizeStart}
      />

      <div className="preview-header">
        <div>
          <span className="preview-label">PREVIEW</span>
          <h2>{title}</h2>
        </div>

        <button
          type="button"
          className="preview-close"
          aria-label="Close preview"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <div className={`preview-content preview-mode-${mode}`}>
        {children}
      </div>
    </aside>
  );
}

export default PreviewPanel;
