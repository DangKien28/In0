import { useContext } from 'react';

import {
  AppDataContext,
  type AppDataContextValue,
} from '../context/AppDataContext';

export function useAppData(): AppDataContextValue {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData must be used inside <AppDataProvider>.');
  }

  return context;
}
