import {
  Briefcase,
  Cpu,
  Layers,
  Mail,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

import type { PlatformKind } from '../types/plan';

/** Classifies a free-text platform name (e.g. "Hệ thống A (Tuyển dụng)"). */
export function getPlatformKind(platform: string): PlatformKind {
  if (platform.includes('Hệ thống A')) return 'systemA';
  if (platform.includes('Hệ thống B')) return 'systemB';
  if (platform.includes('HITL') || platform.includes('HR')) return 'hitl';
  if (platform.includes('Email') || platform.includes('SendGrid'))
    return 'email';
  if (platform.includes('AI Engine')) return 'ai';
  return 'other';
}

export const platformIcons: Record<PlatformKind, LucideIcon> = {
  systemA: Briefcase,
  systemB: Users,
  hitl: UserCheck,
  email: Mail,
  ai: Cpu,
  other: Layers,
};

/** Compact label for tight spaces: "Hệ thống A" → "HT A". */
export function shortenPlatform(platform: string): string {
  return platform.replace('Hệ thống ', 'HT ');
}

/** Platforms offered when editing a chat execution plan. */
export const planPlatformOptions = [
  {
    value: 'Hệ thống A (Tuyển dụng)',
    label: 'Hệ thống A (Tuyển dụng)',
    kind: 'systemA',
  },
  { value: 'In0 AI Engine', label: 'In0 AI Engine', kind: 'ai' },
  { value: 'HR & In0 HITL', label: 'HR & In0 HITL', kind: 'hitl' },
  { value: 'Email Delivery Gateway', label: 'Email Gateway', kind: 'email' },
  {
    value: 'Hệ thống B (Core HRM)',
    label: 'Hệ thống B (HRM)',
    kind: 'systemB',
  },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  kind: PlatformKind;
}>;

/** Platforms offered when adding a step to an agent's Plan Preview. */
export const agentPlatformOptions = [
  { value: 'In0 AI Engine', label: 'In0 AI Engine' },
  { value: 'Hệ thống A (Tuyển dụng)', label: 'Hệ thống A (Tuyển dụng)' },
  { value: 'Hệ thống B (HRM)', label: 'Hệ thống B (HRM)' },
  { value: 'HR & In0 HITL', label: 'HR & In0 HITL (Phê duyệt)' },
  { value: 'Email Gateway (SendGrid)', label: 'Email Gateway (SendGrid)' },
] as const;
