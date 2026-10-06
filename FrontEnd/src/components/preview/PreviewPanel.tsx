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
  return (
    <aside className="work-preview">
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
          ×
        </button>
      </div>

      <div className={`preview-content preview-mode-${mode}`}>
        {children}
      </div>
    </aside>
  );
}

export default PreviewPanel;