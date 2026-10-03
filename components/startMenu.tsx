'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Body1Strong,
  Button,
  Caption1,
  Persona,
  SearchBox,
  Tooltip,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { SMALL, TOUCH_TARGET } from './ui/breakpoints';
import { ChevronRightRegular, MailColor, PowerRegular, type FluentIcon } from '@fluentui/react-icons';
import { links, profile, projects } from '@/data/profile';
import { TASKBAR_HEIGHT, useWindowStore } from '@/store/windowStore';
import type { AppId } from '@/types';
import { AppIcon, apps, appById, useOpenApp } from './appMeta';
import { GitHubIcon, LinkedInIcon } from './brandIcons';

type LinkItem = { name: string; hint: string; href: string; icon: FluentIcon | typeof GitHubIcon };

const externalLinks: LinkItem[] = [
  { name: 'LinkedIn', hint: 'linkedin.com/in/isaac-amponsah', href: links.linkedin, icon: LinkedInIcon },
  { name: 'GitHub', hint: 'github.com/Krem-dev', href: links.github, icon: GitHubIcon },
  { name: 'Email', hint: links.email, href: `mailto:${links.email}`, icon: MailColor },
];

const useStyles = makeStyles({
  overlay: { position: 'fixed', inset: 0, zIndex: 9100 },
  panel: {
    position: 'fixed',
    left: '50%',
    zIndex: 9200,
    width: 'min(642px, calc(100vw - 16px))',
    maxHeight: 'min(726px, calc(100dvh - 72px))',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: 'var(--win-acrylic)',
    backdropFilter: 'blur(30px) saturate(1.5)',
    boxShadow: 'var(--win-flyout-shadow)',
  },
  search: { padding: `32px 32px ${tokens.spacingVerticalS}`, [SMALL]: { padding: '20px 16px 8px' } },
  searchBox: { width: '100%', maxWidth: 'none' },
  body: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: `0 24px ${tokens.spacingVerticalL}`,
    [SMALL]: { padding: '0 8px 12px' },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '32px',
    margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalXS}`,
    padding: `0 ${tokens.spacingHorizontalS} 0 ${tokens.spacingHorizontalM}`,
  },
  pinned: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    [SMALL]: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  tile: {
    border: 'none',
    background: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
    padding: '14px 4px 10px',
    cursor: 'default',
    [SMALL]: { minHeight: TOUCH_TARGET },
    ':hover': { backgroundColor: 'var(--win-subtle-hover)' },
    ':active': { backgroundColor: 'var(--win-subtle-pressed)' },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}` },
  },
  tileLabel: { maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  list: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2px',
    [SMALL]: { gridTemplateColumns: '1fr' },
  },
  row: {
    border: 'none',
    background: 'transparent',
    textDecoration: 'none',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    textAlign: 'left',
    cursor: 'default',
    minWidth: 0,
    [SMALL]: { minHeight: TOUCH_TARGET },
    ':hover': { backgroundColor: 'var(--win-subtle-hover)' },
    ':active': { backgroundColor: 'var(--win-subtle-pressed)' },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}` },
  },
  rowText: { display: 'flex', flexDirection: 'column', minWidth: 0 },
  secondary: { color: tokens.colorNeutralForeground3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  empty: { padding: '40px 0', textAlign: 'center', color: tokens.colorNeutralForeground3 },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${tokens.spacingVerticalM} 48px`,
    borderTop: '1px solid var(--win-acrylic-stroke)',
    backgroundColor: 'var(--win-subtle-pressed)',
    [SMALL]: { padding: '12px 16px' },
  },
  persona: {
    border: 'none',
    background: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalS,
    margin: `0 -${tokens.spacingHorizontalS}`,
    cursor: 'default',
    color: 'inherit',
    ':hover': { backgroundColor: 'var(--win-subtle-hover)' },
  },
});

function StartPanel({ onClose }: { onClose: () => void }) {
  const s = useStyles();
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const openApp = useOpenApp();
  const closeAll = useWindowStore((st) => st.closeAll);

  useEffect(() => {
    const t = setTimeout(() => searchRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const matchedApps = useMemo(() => apps.filter((a) => !q || `${a.title} ${a.description}`.toLowerCase().includes(q)), [q]);
  const matchedLinks = externalLinks.filter((l) => !q || `${l.name} ${l.hint}`.toLowerCase().includes(q));
  const matchedProjects = projects.filter((p) =>
    q ? `${p.name} ${p.summary} ${p.stack.join(' ')}`.toLowerCase().includes(q) : p.featured,
  );

  const launch = (id: AppId) => {
    openApp(id);
    onClose();
  };

  return (
    <>
      <div className={s.search}>
        <SearchBox
          className={s.searchBox}
          input={{ ref: searchRef }}
          placeholder="Search apps, projects and links"
          value={query}
          onChange={(_, d) => setQuery(d.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && matchedApps[0]) launch(matchedApps[0].id);
          }}
        />
      </div>

      <div className={s.body}>
        {matchedApps.length > 0 && (
          <>
            <div className={s.heading}>
              <Body1Strong>Pinned</Body1Strong>
            </div>
            <div className={s.pinned}>
              {matchedApps.map((app) => (
                <button key={app.id} type="button" className={s.tile} onClick={() => launch(app.id)}>
                  <AppIcon app={app} size={32} />
                  <Caption1 className={s.tileLabel}>{app.title}</Caption1>
                </button>
              ))}
            </div>
          </>
        )}

        {matchedProjects.length > 0 && (
          <>
            <div className={s.heading}>
              <Body1Strong>{q ? 'Projects' : 'Recommended'}</Body1Strong>
              {!q && (
                <Button size="small" appearance="subtle" icon={<ChevronRightRegular />} iconPosition="after" onClick={() => launch('projects')}>
                  All projects
                </Button>
              )}
            </div>
            <div className={s.list}>
              {matchedProjects.slice(0, 6).map((p) => (
                <button key={p.id} type="button" className={s.row} onClick={() => launch('projects')}>
                  <AppIcon app={appById.projects} size={32} />
                  <span className={s.rowText}>
                    <Caption1>{p.name}</Caption1>
                    <Caption1 className={s.secondary}>{p.metric ? `${p.metric.value} ${p.metric.label}` : p.context}</Caption1>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {matchedLinks.length > 0 && (
          <>
            <div className={s.heading}>
              <Body1Strong>Links</Body1Strong>
            </div>
            <div className={s.list}>
              {matchedLinks.map(({ name, hint, href, icon: Icon }) => (
                <a key={name} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={s.row}>
                  <Icon fontSize={24} size={24} />
                  <span className={s.rowText}>
                    <Caption1>{name}</Caption1>
                    <Caption1 className={s.secondary}>{hint}</Caption1>
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

        {!matchedApps.length && !matchedProjects.length && !matchedLinks.length && (
          <Caption1 as="p" className={s.empty}>
            No results for “{query}”
          </Caption1>
        )}
      </div>

      <div className={s.footer}>
        <button type="button" className={s.persona} onClick={() => launch('about')}>
          <Persona
            name={profile.name}
            secondaryText={profile.title}
            avatar={{ initials: profile.initials, color: 'brand', image: profile.photo ? { src: profile.photo } : undefined }}
            size="medium"
          />
        </button>
        <Tooltip content="Close all windows" relationship="label">
          <Button
            appearance="subtle"
            icon={<PowerRegular />}
            aria-label="Close all windows"
            onClick={() => {
              closeAll();
              onClose();
            }}
          />
        </Tooltip>
      </div>
    </>
  );
}

export default function StartMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useStyles();
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className={s.overlay} onPointerDown={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-label="Start"
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%', transition: { duration: 0.12 } }}
            transition={{ duration: 0.25, ease: [0.1, 0.9, 0.2, 1] }}
            className={s.panel}
            style={{ bottom: TASKBAR_HEIGHT + 12 }}
          >
            <StartPanel onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
