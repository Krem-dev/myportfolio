'use client';

import type { ReactNode } from 'react';
import {
  Button,
  Caption1,
  Link,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowDownloadRegular, DocumentPdfRegular } from '@fluentui/react-icons';
import { certifications, education, experience, links, profile, projects, skills } from '@/data/profile';
import { PANE_SMALL } from '../ui/breakpoints';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: 'var(--win-mica)' },
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: 'var(--win-acrylic)',
    borderBottom: '1px solid var(--win-card-stroke)',
    backdropFilter: 'blur(20px)',
  },
  barLabel: { paddingLeft: tokens.spacingHorizontalS, color: tokens.colorNeutralForeground2 },
  scroll: { flex: 1, overflow: 'auto', padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXL} 48px` },

  // The résumé itself is a document, so it stays on white paper in both themes.
  paper: {
    maxWidth: '820px',
    margin: '0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '48px 56px 56px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: '0 2px 8px rgb(0 0 0 / 0.12), 0 12px 40px rgb(0 0 0 / 0.14)',
    fontSize: '13.5px',
    lineHeight: '1.55',
    [PANE_SMALL]: { padding: '28px 22px 32px' },
  },
  head: { textAlign: 'center' },
  name: { margin: 0, fontSize: '28px', fontWeight: tokens.fontWeightSemibold, letterSpacing: '-0.02em', color: '#111111' },
  role: { margin: '2px 0 0', fontSize: '15px', color: '#555555' },
  contact: { margin: '10px 0 0', fontSize: '12.5px', color: '#666666' },

  heading: {
    margin: '26px 0 10px',
    paddingBottom: '4px',
    borderBottom: '1px solid #d4d4d4',
    fontSize: '11px',
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#777777',
  },
  entry: { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', columnGap: '16px' },
  entryTitle: { fontWeight: tokens.fontWeightSemibold, color: '#111111' },
  entryOrg: { color: '#555555' },
  dates: { fontSize: '12px', whiteSpace: 'nowrap', color: '#777777' },
  meta: { margin: '1px 0 0', fontSize: '12px', color: '#777777' },
  para: { margin: '0 0 8px', ':last-of-type': { marginBottom: 0 } },
  summary: { margin: '2px 0 0' },
  list: { margin: '6px 0 0', paddingLeft: '18px' },
  item: { marginBottom: '3px' },
  stack: { paddingLeft: '20px' },
  block: { marginBottom: '14px', ':last-child': { marginBottom: 0 } },
  certs: { display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '24px', rowGap: '3px', margin: 0, padding: 0, listStyle: 'none', [PANE_SMALL]: { gridTemplateColumns: '1fr' } },
  skillRow: { display: 'flex', gap: '10px', marginBottom: '3px', [PANE_SMALL]: { flexDirection: 'column', gap: '1px' } },
  skillLabel: { width: '148px', flexShrink: 0, fontWeight: tokens.fontWeightSemibold, color: '#111111' },
  footnote: { marginTop: '22px', fontSize: '12px', fontStyle: 'italic', color: '#888888' },
});

function Heading({ children }: { children: ReactNode }) {
  return <h3 className={useStyles().heading}>{children}</h3>;
}

function Entry({ title, org, dates }: { title: string; org: string; dates: string }) {
  const s = useStyles();
  return (
    <div className={s.entry}>
      <div>
        <span className={s.entryTitle}>{title}</span>
        <span className={s.entryOrg}> · {org}</span>
      </div>
      <span className={s.dates}>{dates}</span>
    </div>
  );
}

export default function Resume() {
  const s = useStyles();
  const shown = projects.filter((p) => p.featured || p.metric);

  return (
    <div className={s.root}>
      <div className={s.bar}>
        <Caption1 className={s.barLabel}>{profile.name} · Résumé</Caption1>
        <Toolbar size="small">
          {links.resumePdf && (
            <>
              <ToolbarButton
                icon={<DocumentPdfRegular />}
                onClick={() => window.open(links.resumePdf, '_blank', 'noopener')}
              >
                Open PDF
              </ToolbarButton>
              <ToolbarDivider />
              <Button
                as="a"
                href={links.resumePdf}
                download="Isaac Yaw Amponsah CV.pdf"
                appearance="primary"
                size="small"
                icon={<ArrowDownloadRegular />}
              >
                Download
              </Button>
            </>
          )}
        </Toolbar>
      </div>

      <div className={s.scroll}>
        <article id="resume-print" className={s.paper}>
          <header className={s.head}>
            <h2 className={s.name}>{profile.name}</h2>
            <p className={s.role}>{profile.title}</p>
            <p className={s.contact}>
              {links.email} · {links.phone} · {profile.location}
            </p>
            <p className={s.contact}>
              <Link href={links.linkedin}>linkedin.com/in/isaac-amponsah</Link> ·{' '}
              <Link href={links.github}>github.com/Krem-dev</Link> ·{' '}
              <Link href={links.blog}>kremlin.hashnode.dev</Link>
            </p>
          </header>

          <Heading>Profile</Heading>
          <p className={s.para}>{profile.bio[0]}</p>
          <p className={s.para}>{profile.bio[1]}</p>

          <Heading>Experience</Heading>
          {experience.map((r) => (
            <div key={r.org + r.title} className={s.block}>
              <Entry title={r.title} org={r.org} dates={`${r.start} – ${r.end}`} />
              <p className={s.meta}>{[r.unit, r.location].filter(Boolean).join(' · ')}</p>
              <ul className={s.list}>
                {r.points.map((p) => (
                  <li key={p} className={s.item}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Heading>Selected projects</Heading>
          {shown.map((p) => (
            <div key={p.id} className={s.block}>
              <span className={s.entryTitle}>{p.name}</span>
              <span className={s.entryOrg}> {p.context}</span>
              <p className={s.summary}>{p.summary}</p>
              <p className={s.meta}>
                {[p.metric && `${p.metric.value} ${p.metric.label}`, p.stack.slice(0, 6).join(', ')]
                  .filter(Boolean)
                  .join('. ')}
              </p>
            </div>
          ))}

          <Heading>Education</Heading>
          {education.map((e) => (
            <div key={e.school} className={s.block}>
              <Entry title={e.program} org={e.school} dates={`${e.start} – ${e.end}`} />
              {e.note && <p className={s.meta}>{e.note}</p>}
              {e.points && (
                <ul className={s.list}>
                  {e.points.map((p) => (
                    <li key={p} className={s.item}>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <Heading>Certifications</Heading>
          <ul className={s.certs}>
            {certifications.map((c) => (
              <li key={c.name}>
                {c.name} <span className={s.entryOrg}>· {c.issuer}</span>
              </li>
            ))}
          </ul>

          <Heading>Skills</Heading>
          {skills.map((g) => (
            <div key={g.group} className={s.skillRow}>
              <div className={s.skillLabel}>{g.group}</div>
              <div>{g.items.join(' · ')}</div>
            </div>
          ))}

          <p className={s.footnote}>References available on request.</p>
        </article>
      </div>
    </div>
  );
}
