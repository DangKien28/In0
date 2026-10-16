import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { mockAgents } from '../data/mockAgents';
import { mockKnowledge } from '../data/mockKnowledge';
import { mockPlugins } from '../data/mockPlugins';
import { mockPolicies } from '../data/mockPolicies';
import type { Agent } from '../types/agent';
import type { Plugin } from '../types/plugin';
import type {
  SettingsCategory,
  SettingsDocument,
  SettingsDocumentGroup,
} from '../types/settings';

import { AppDataContext } from './AppDataContext';

/** Replaces the item with the same id, or adds it at the start/end of the list. */
function upsert<T extends { id: string }>(
  items: T[],
  item: T,
  prepend: boolean,
): T[] {
  if (items.some((current) => current.id === item.id)) {
    return items.map((current) => (current.id === item.id ? item : current));
  }

  return prepend ? [item, ...items] : [...items, item];
}

/**
 * In-memory store for agents, linked systems and Knowledge/Policy documents.
 * Seeded with mock data; replace the setters with API calls once the backend exists.
 */
function AppDataProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
  const [documents, setDocuments] = useState<
    Record<SettingsCategory, SettingsDocumentGroup>
  >({ knowledge: mockKnowledge, policy: mockPolicies });

  const saveAgent = useCallback((agent: Agent) => {
    setAgents((current) => upsert(current, agent, true));
  }, []);

  const savePlugin = useCallback((plugin: Plugin) => {
    setPlugins((current) => upsert(current, plugin, false));
  }, []);

  const deletePlugin = useCallback((pluginId: string) => {
    setPlugins((current) => current.filter((plugin) => plugin.id !== pluginId));
  }, []);

  const saveDocument = useCallback(
    (category: SettingsCategory, document: SettingsDocument) => {
      setDocuments((current) => ({
        ...current,
        [category]: {
          ...current[category],
          userCustom: upsert(current[category].userCustom, document, true),
        },
      }));
    },
    [],
  );

  const deleteDocument = useCallback(
    (category: SettingsCategory, documentId: string) => {
      setDocuments((current) => ({
        ...current,
        [category]: {
          ...current[category],
          userCustom: current[category].userCustom.filter(
            (doc) => doc.id !== documentId,
          ),
        },
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      agents,
      plugins,
      documents,
      saveAgent,
      savePlugin,
      deletePlugin,
      saveDocument,
      deleteDocument,
    }),
    [
      agents,
      plugins,
      documents,
      saveAgent,
      savePlugin,
      deletePlugin,
      saveDocument,
      deleteDocument,
    ],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export default AppDataProvider;
