'use client';

import { Fragment } from 'react';
import {
  Body1,
  Button,
  Caption1,
  Divider,
  Persona,
  Subtitle2,
  Tooltip,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { ArrowRightRegular, MailRegular } from '@fluentui/react-icons';
import { links, profile } from '@/data/profile';
import { useOpenApp } from './appMeta';
import { GitHubIcon, LinkedInIcon } from './brandIcons';

const useStyles = makeStyles({
  widget: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: 'var(--win-acrylic)',
    backdropFilter: 'blur(30px) saturate(1.5)',
    boxShadow: 'var(--win-flyout-shadow)',
    color: tokens.colorNeutralForeground1,
  },
  tagline: { color: tokens.colorNeutralForeground2 },
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto 1fr',
    gap: tokens.spacingHorizontalM,
  },
  stat: { display: 'flex', flexDirection: 'column', gap: '2px' },
  statLabel: { color: tokens.colorNeutralForeground3 },
  actions: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalS },
  links: { marginLeft: 'auto', display: 'flex' },
});

/** Windows 11 widget-style card that introduces the person behind the desktop. */
export default function ProfileWidget({ className }: { className?: string }) {
  const s = useStyles();
  const openApp = useOpenApp();

  return (
    <aside aria-label="Profile" className={mergeClasses(s.widget, className)}>
      <Persona
        size="huge"
        name={profile.name}
        secondaryText={profile.title}
        tertiaryText={profile.location}
        presence={{ status: 'available' }}
        avatar={{ initials: profile.initials, color: 'brand', image: profile.photo ? { src: profile.photo } : undefined }}
        primaryText={<Subtitle2>{profile.name}</Subtitle2>}
      />

      <Body1 className={s.tagline}>{profile.tagline}</Body1>

      <div className={s.stats}>
        {profile.highlights.map((h, i) => (
          <Fragment key={h.label}>
            {i > 0 && <Divider vertical />}
            <div className={s.stat}>
              <Subtitle2>{h.value}</Subtitle2>
              <Caption1 className={s.statLabel}>{h.label}</Caption1>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={s.actions}>
        <Button appearance="primary" icon={<ArrowRightRegular />} iconPosition="after" onClick={() => openApp('projects')}>
          View projects
        </Button>
        <Button onClick={() => openApp('about')}>About me</Button>
        <div className={s.links}>
          <Tooltip content="LinkedIn" relationship="label">
            <Button as="a" href={links.linkedin} target="_blank" rel="noreferrer" appearance="subtle" icon={<LinkedInIcon size={18} />} />
          </Tooltip>
          <Tooltip content="GitHub" relationship="label">
            <Button as="a" href={links.github} target="_blank" rel="noreferrer" appearance="subtle" icon={<GitHubIcon size={18} />} />
          </Tooltip>
          <Tooltip content="Email" relationship="label">
            <Button as="a" href={`mailto:${links.email}`} appearance="subtle" icon={<MailRegular />} />
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
