export type SettingsCategory = 'knowledge' | 'policy';

/** A Knowledge or Policy document the AI agents use when making decisions. */
export interface SettingsDocument {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  fileName?: string;
  updatedAt: string;
  readOnly: boolean;
}

export interface SettingsDocumentGroup {
  systemDefault: SettingsDocument[];
  userCustom: SettingsDocument[];
}
