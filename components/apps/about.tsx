'use client';

import {
  Avatar,
  Badge,
  Body1,
  Button,
  Caption1,
  Subtitle2,
  Title2,
  Title3,
  Tooltip,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  AppsListDetailColor,
  BuildingColor,
  CertificateColor,
  ChevronRightRegular,
  CodeBlockColor,
  DataBarVerticalAscendingColor,
  DatabaseColor,
  DocumentRegular,
  GlobeColor,
  LibraryColor,
  LightbulbColor,
  LocationRippleColor,
  MailColor,
  MailRegular,
  OpenRegular,
  PeopleColor,
  RibbonColor,
  type FluentIcon,
} from '@fluentui/react-icons';
import { certifications, education, experience, links, profile } from '@/data/profile';
import { useOpenApp } from '../appMeta';
import { GitHubIcon, LinkedInIcon } from '../brandIcons';
import { PANE_SMALL } from '../ui/breakpoints';
import { CardGroup, Page, Section, SettingCard, Surface } from '../ui/win';

const highlightIcons: Record<(typeof profile.highlights)[number]['kind'], FluentIcon> = {
  people: PeopleColor,
  data: DatabaseColor,
  cert: CertificateColor,
};

const focusIcons: FluentIcon[] = [AppsListDetailColor, CodeBlockColor, DataBarVerticalAscendingColor];

const useStyles = makeStyles({
  hero: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingHorizontalXXL,
    [PANE_SMALL]: { padding: tokens.spacingHorizontalL, gap: tokens.spacingHorizontalL },
  },
  heroText: { flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  nameRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalM },
  muted: { color: tokens.colorNeutralForeground3 },
  secondary: { color: tokens.colorNeutralForeground2 },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: tokens.spacingHorizontalM,
    [PANE_SMALL]: { gridTemplateColumns: '1fr' },
  },
  stat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  statText: { display: 'flex', flexDirection: 'column' },
  prose: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    color: tokens.colorNeutralForeground2,
  },
});

export default function About() {
  const s = useStyles();
  const openApp = useOpenApp();
  const currentRole = experience[0];
  const degree = education[0];

  return (
    <Page>
      <Surface className={s.hero}>
        <Avatar
          size={96}
          name={profile.name}
          initials={profile.initials}
          color="brand"
          image={profile.photo ? { src: profile.photo } : undefined}
          badge={{ status: 'available' }}
        />
        <div className={s.heroText}>
          <div className={s.nameRow}>
            <Title2 as="h1">{profile.name}</Title2>
            <Badge appearance="tint" color="success">
              {profile.availability}
            </Badge>
          </div>
          <Body1 className={s.secondary}>
            {currentRole.title} · {currentRole.org}
          </Body1>
          <Caption1 className={s.muted}>{profile.location}</Caption1>
          <div className={s.heroActions}>
            <Button appearance="primary" icon={<MailRegular />} onClick={() => openApp('contact')}>
              Contact me
            </Button>
            <Button icon={<DocumentRegular />} onClick={() => openApp('resume')}>
              View résumé
            </Button>
            <Tooltip content="LinkedIn" relationship="label">
              <Button as="a" href={links.linkedin} target="_blank" rel="noreferrer" appearance="subtle" icon={<LinkedInIcon size={20} />} />
            </Tooltip>
            <Tooltip content="GitHub" relationship="label">
              <Button as="a" href={links.github} target="_blank" rel="noreferrer" appearance="subtle" icon={<GitHubIcon size={20} />} />
            </Tooltip>
          </div>
        </div>
      </Surface>

      <div className={s.stats}>
        {profile.highlights.map((h) => {
          const Icon = highlightIcons[h.kind];
          return (
            <Surface key={h.label} className={s.stat}>
              <Icon fontSize={40} aria-hidden />
              <div className={s.statText}>
                <Title3>{h.value}</Title3>
                <Caption1 className={s.muted}>{h.label}</Caption1>
              </div>
            </Surface>
          );
        })}
      </div>

      <Section title="About">
        <Surface className={s.prose}>
          <Subtitle2 as="p">{profile.tagline}</Subtitle2>
          {profile.bio.map((p) => (
            <Body1 as="p" key={p}>
              {p}
            </Body1>
          ))}
        </Surface>
      </Section>

      <Section title="What I work on">
        <CardGroup>
          {profile.focus.map((f, i) => {
            const Icon = focusIcons[i % focusIcons.length];
            return (
              <SettingCard
                key={f.title}
                icon={<Icon fontSize={24} />}
                title={f.title}
                description={f.body}
                action={<ChevronRightRegular />}
                onClick={() => openApp('projects')}
              />
            );
          })}
        </CardGroup>
      </Section>

      <Section title="At a glance">
        <CardGroup>
          <SettingCard
            icon={<BuildingColor fontSize={24} />}
            title="Current role"
            description={`${currentRole.title} · ${currentRole.org}, ${currentRole.location}`}
            action={<Caption1>Since {currentRole.start}</Caption1>}
            onClick={() => openApp('experience')}
          />
          <SettingCard
            icon={<LibraryColor fontSize={24} />}
            title="Education"
            description={`${degree.program} · ${degree.school}`}
            action={degree.note && <Badge appearance="tint" color="brand">{degree.note}</Badge>}
            onClick={() => openApp('experience')}
          />
          <SettingCard
            icon={<RibbonColor fontSize={24} />}
            title="Certifications"
            description={certifications.map((c) => c.name.replace(/ \(.+\)$/, '')).slice(0, 3).join(' · ') + ` and ${certifications.length - 3} more`}
            action={<ChevronRightRegular />}
            onClick={() => openApp('skills')}
          />
          <SettingCard icon={<LocationRippleColor fontSize={24} />} title="Based in" description={profile.location} />
          <SettingCard icon={<GlobeColor fontSize={24} />} title="Languages" description={profile.languages.join(' · ')} />
          <SettingCard icon={<LightbulbColor fontSize={24} />} title="Interests" description={profile.interests.join(' · ')} />
        </CardGroup>
      </Section>

      <Section title="Connect">
        <CardGroup>
          <SettingCard
            icon={<LinkedInIcon size={24} />}
            title="LinkedIn"
            description="linkedin.com/in/isaac-amponsah"
            action={<OpenRegular />}
            href={links.linkedin}
          />
          <SettingCard
            icon={<GitHubIcon size={24} />}
            title="GitHub"
            description="github.com/Krem-dev"
            action={<OpenRegular />}
            href={links.github}
          />
          <SettingCard
            icon={<MailColor fontSize={24} />}
            title="Email"
            description={links.email}
            action={<ChevronRightRegular />}
            onClick={() => openApp('contact')}
          />
        </CardGroup>
      </Section>
    </Page>
  );
}
