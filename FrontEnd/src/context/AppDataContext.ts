import { createContext } from 'react';

import type { Agent } from '../types/agent';
import type { Plugin } from '../types/plugin';
import type {
  SettingsCategory,
  SettingsDocument,
  SettingsDocumentGroup,
} from '../types/settings';

export interface AppDataContextValue {
  agents: Agent[];
  plugins: Plugin[];
  documents: Record<SettingsCategory, SettingsDocumentGroup>;
  /** Inserts a new agent (first in the list) or replaces the one with the same id. */
  saveAgent: (agent: Agent) => void;
  /** Inserts a new plugin or replaces the one with the same id. */
  savePlugin: (plugin: Plugin) => void;
  deletePlugin: (pluginId: string) => void;
  /** Inserts a new user document (first in the list) or replaces an existing one. */
  saveDocument: (
    category: SettingsCategory,
    document: SettingsDocument,
  ) => void;
  deleteDocument: (category: SettingsCategory, documentId: string) => void;
}

export const AppDataContext = createContext<AppDataContextValue | null>(null);
