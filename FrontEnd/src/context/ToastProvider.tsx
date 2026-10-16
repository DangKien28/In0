import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import Toast from '../components/common/Toast';
import type { Toast as ToastData, ToastTone } from '../types/common';

import { ToastContext } from './ToastContext';

const TOAST_DURATION_MS = 3200;

function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      window.clearTimeout(timerRef.current);
      setToast({ id: Date.now(), message, tone });
      timerRef.current = window.setTimeout(
        () => setToast(null),
        TOAST_DURATION_MS,
      );
    },
    [],
  );

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Toast key={toast.id} message={toast.message} tone={toast.tone} />
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
