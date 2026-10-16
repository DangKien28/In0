import { createContext } from 'react';

import type { ToastTone } from '../types/common';

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
