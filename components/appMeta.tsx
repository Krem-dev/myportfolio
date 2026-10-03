'use client';

import { useCallback } from 'react';
import {
  BriefcaseColor,
  CodeColor,
  DocumentTextColor,
  MailColor,
  PersonColor,
  WrenchScrewdriverColor,
  type FluentIcon,
} from '@fluentui/react-icons';
import type { AppId } from '@/types';
import { useWindowStore } from '@/store/windowStore';

export interface AppMeta {
  id: AppId;
  title: string;
  description: string;
  /** Fluent "Color" icon — the multi-colour style Windows 11 uses for apps. */
  icon: FluentIcon;
  size: { width: number; height: number };
}

export const apps: AppMeta[] = [
  { id: 'about', title: 'About Me', description: 'Who I am and what I do', icon: PersonColor, size: { width: 960, height: 700 } },
  { id: 'experience', title: 'Experience', description: 'Work history and education', icon: BriefcaseColor, size: { width: 960, height: 720 } },
  { id: 'projects', title: 'Projects', description: 'Selected work and results', icon: CodeColor, size: { width: 1040, height: 720 } },
  { id: 'skills', title: 'Skills', description: 'Tools, platforms and certifications', icon: WrenchScrewdriverColor, size: { width: 940, height: 700 } },
  { id: 'resume', title: 'Résumé', description: 'View or download my CV', icon: DocumentTextColor, size: { width: 900, height: 740 } },
  { id: 'contact', title: 'Contact', description: 'Send me a message', icon: MailColor, size: { width: 860, height: 640 } },
];

export const appById = Object.fromEntries(apps.map((a) => [a.id, a])) as Record<AppId, AppMeta>;

export function useOpenApp() {
  const open = useWindowStore((s) => s.open);
  return useCallback((id: AppId) => open(id, appById[id].size), [open]);
}

export function AppIcon({ app, size = 24 }: { app: AppMeta; size?: number }) {
  const Icon = app.icon;
  return <Icon fontSize={size} aria-hidden style={{ flexShrink: 0, display: 'block' }} />;
}
