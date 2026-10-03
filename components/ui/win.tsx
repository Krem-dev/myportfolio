'use client';

// Windows 11 layout primitives built on Fluent UI v9.
// Every window composes these so spacing, type and surfaces stay identical across the app.

import type { ReactNode } from 'react';
import {
  Body1,
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  Title2,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { PANE_SMALL } from './breakpoints';

const useStyles = makeStyles({
  page: {
    minHeight: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--win-layer)',
    padding: `${tokens.spacingVerticalXXL} 36px 40px`,
    [PANE_SMALL]: {
      padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalL} 32px`,
    },
  },
  inner: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalL,
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  sectionTitle: {
    paddingLeft: tokens.spacingHorizontalXXS,
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  card: {
    backgroundColor: 'var(--win-card)',
    border: '1px solid var(--win-card-stroke)',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: 'none',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    minHeight: '68px',
    justifyContent: 'center',
  },
  cardInteractive: {
    ':hover': { backgroundColor: 'var(--win-card-hover)' },
    ':hover:active': { backgroundColor: 'var(--win-card)' },
  },
  icon: {
    width: '24px',
    height: '24px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: tokens.colorNeutralForeground3,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& *': { whiteSpace: 'nowrap' },
    paddingLeft: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground2,
  },
  surface: {
    backgroundColor: 'var(--win-card)',
    border: '1px solid var(--win-card-stroke)',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: 'none',
  },
});

export function Page({ title, subtitle, actions, children }: { title?: string; subtitle?: ReactNode; actions?: ReactNode; children: ReactNode }) {
  const s = useStyles();
  return (
    <div className={s.page}>
      <div className={s.inner}>
        {title && (
          <header className={s.header}>
            <div className={s.headerText}>
              <Title2 as="h1">{title}</Title2>
              {subtitle && <Body1 className={s.subtitle}>{subtitle}</Body1>}
            </div>
            {actions}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  const s = useStyles();
  return (
    <section className={s.section}>
      {title && (
        <Body1Strong as="h2" className={s.sectionTitle}>
          {title}
        </Body1Strong>
      )}
      {children}
    </section>
  );
}

/** Stack of setting cards with the 4px rhythm used in Windows 11 Settings. */
export function CardGroup({ children }: { children: ReactNode }) {
  return <div className={useStyles().group}>{children}</div>;
}

/** Windows 11 "setting card": icon, title, description and a trailing action. */
export function SettingCard({
  icon,
  title,
  description,
  action,
  onClick,
  href,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const s = useStyles();
  const interactive = Boolean(onClick || href);
  // Fluent Card always renders a div, so link cards navigate on click (Card makes them focusable and Enter-activatable).
  const handleClick = href
    ? () => (href.startsWith('http') ? window.open(href, '_blank', 'noopener') : window.location.assign(href))
    : onClick;
  return (
    <Card
      onClick={handleClick}
      role={href ? 'link' : undefined}
      className={mergeClasses(s.card, interactive && s.cardInteractive)}
    >
      <CardHeader
        image={icon ? <span className={s.icon}>{icon}</span> : undefined}
        header={<Body1>{title}</Body1>}
        description={description ? <Caption1 className={s.description}>{description}</Caption1> : undefined}
        action={action ? <div className={s.action}>{action}</div> : undefined}
      />
    </Card>
  );
}

/** Flat Windows 11 card surface for free-form content. */
export function Surface({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const s = useStyles();
  return (
    <Card className={mergeClasses(s.surface, className)} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Card>
  );
}
