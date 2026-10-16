export type PluginType =
  'recruitment' | 'hrm' | 'email' | 'productivity' | 'custom';

/** A linked third-party system ("Phần mềm liên kết") In0 can orchestrate. */
export interface Plugin {
  id: string;
  name: string;
  code: string;
  type: PluginType;
  baseUrl: string;
  apiKey: string;
  webhookUrl: string;
  description: string;
  configured: boolean;
}

export interface PluginGuide {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
}
