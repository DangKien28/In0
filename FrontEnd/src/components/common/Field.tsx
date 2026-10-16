import type { ReactNode } from 'react';

import { labelClass } from '../../utils/formStyles';

interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control wrapper used by every form in the app. */
function Field({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {hint && <div className="mb-1 text-[11px] text-slate-400">{hint}</div>}
      {children}
    </div>
  );
}

export default Field;
