'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Badge,
  Body1,
  Body1Strong,
  Breadcrumb,
  BreadcrumbButton,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  Caption1,
  Card,
  CardHeader,
  CounterBadge,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavSectionHeader,
  Subtitle2,
  Tab,
  TabList,
  Tag,
  TagGroup,
  Title2,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import {
  AppsListColor,
  ArrowLeftRegular,
  ArrowRightRegular,
  BookOpenColor,
  BotColor,
  BuildingColor,
  BuildingMultipleColor,
  CheckmarkCircleColor,
  ChevronRightRegular,
  CodeBlockColor,
  DismissRegular,
  ZoomInRegular,
  FormColor,
  GlobeColor,
  HeartColor,
  LockShieldColor,
  OpenRegular,
  PeopleInterwovenColor,
  PhoneColor,
  ScanPersonColor,
  SettingsColor,
  type FluentIcon,
} from '@fluentui/react-icons';
import { projects, type Project, type ProjectCategory } from '@/data/profile';
import { AppleIcon, GitHubIcon, GooglePlayIcon } from '../brandIcons';

import { PANE_SMALL } from '../ui/breakpoints';
import { CardGroup, Section, SettingCard, Surface } from '../ui/win';

type Filter = 'All' | ProjectCategory;

const categoryIcons: Record<Filter, FluentIcon> = {
  All: AppsListColor,
  Enterprise: BuildingColor,
  Mobile: PhoneColor,
  Web: GlobeColor,
  'Embedded & AI': BotColor,
  Systems: SettingsColor,
};

const categoryLabels: Record<Filter, string> = {
  All: 'All projects',
  Enterprise: 'Enterprise',
  Mobile: 'Mobile',
  Web: 'Web',
  'Embedded & AI': 'Embedded & AI',
  Systems: 'Systems',
};

const projectIcons: Record<string, FluentIcon> = {
  subsidy: BookOpenColor,
  'asset-mgmt': BuildingMultipleColor,
  evitals: HeartColor,
  'jugop-hub': PeopleInterwovenColor,
  'mine-entry': LockShieldColor,
  safedrive: ScanPersonColor,
  'internship-portal': FormColor,
  'simple-shell': CodeBlockColor,
};

const filters = Object.keys(categoryLabels) as Filter[];

/** The drawer costs 260px, so it only earns its place in a reasonably wide pane. */
const PANE_NAV_HIDDEN = '@container pane (max-width: 859px)';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'var(--win-mica)',
  },
  // Below the Medium size class the drawer gives way to a tab strip.
  navWrap: { display: 'flex', [PANE_NAV_HIDDEN]: { display: 'none' } },
  nav: {
    width: '260px',
    flexShrink: 0,
    backgroundColor: 'transparent',
    borderRight: 'none',
  },
  navCount: { marginLeft: 'auto' },
  pane: {
    flex: 1,
    minWidth: 0,
    overflowY: 'auto',
    backgroundColor: 'var(--win-layer)',
    borderTopLeftRadius: tokens.borderRadiusXLarge,
    borderLeft: '1px solid var(--win-card-stroke)',
    [PANE_NAV_HIDDEN]: { borderRadius: 0, borderLeft: 'none' },
  },
  inner: {
    maxWidth: '960px',
    margin: '0 auto',
    boxSizing: 'border-box',
    padding: `${tokens.spacingVerticalXXL} 36px 40px`,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
    [PANE_SMALL]: { padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalL} 32px` },
  },
  header: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  muted: { color: tokens.colorNeutralForeground3 },
  secondary: { color: tokens.colorNeutralForeground2 },
  narrowTabs: {
    display: 'none',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    margin: `0 -${tokens.spacingHorizontalS}`,
    [PANE_NAV_HIDDEN]: { display: 'block' },
  },

  featured: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: tokens.spacingHorizontalM,
  },
  featuredCard: {
    backgroundColor: 'var(--win-card)',
    border: '1px solid var(--win-card-stroke)',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: 'none',
    padding: tokens.spacingHorizontalL,
    gap: tokens.spacingVerticalM,
    ':hover': { backgroundColor: 'var(--win-card-hover)' },
    ':hover:active': { backgroundColor: 'var(--win-card)' },
  },
  featuredMetric: { display: 'flex', flexDirection: 'column' },
  // Keeps featured cards the same height whatever the summary length.
  featuredSummary: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
  },

  rowCard: {
    backgroundColor: 'var(--win-card)',
    border: '1px solid var(--win-card-stroke)',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: 'none',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    ':hover': { backgroundColor: 'var(--win-card-hover)' },
    ':hover:active': { backgroundColor: 'var(--win-card)' },
  },
  rowAction: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    whiteSpace: 'nowrap',
    '& *': { whiteSpace: 'nowrap' },
    paddingLeft: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground2,
    [PANE_SMALL]: { '& > :first-child': { display: 'none' } },
  },
  icon40: { width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  breadcrumb: {
    '& button, & span': { fontSize: tokens.fontSizeHero700, lineHeight: tokens.lineHeightHero700, fontWeight: tokens.fontWeightSemibold },
    [PANE_SMALL]: {
      '& button, & span': { fontSize: tokens.fontSizeBase500, lineHeight: tokens.lineHeightBase500 },
    },
  },
  crumbParent: { color: tokens.colorNeutralForeground3 },
  hero: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingHorizontalXL,
  },
  heroText: { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  badges: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS, marginTop: tokens.spacingVerticalXS },
  heroActions: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  metric: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },
  prose: { padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`, color: tokens.colorNeutralForeground2 },
  tags: { padding: tokens.spacingHorizontalL, '& > *': { flexWrap: 'wrap' } },

  posterCard: {
    padding: tokens.spacingHorizontalL,
    gap: tokens.spacingVerticalS,
    cursor: 'zoom-in',
    ':hover': { backgroundColor: 'var(--win-card-hover)' },
  },
  posterFrame: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusMedium,
    border: '1px solid var(--win-card-stroke)',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    maxHeight: '420px',
  },
  posterImage: { width: '100%', height: 'auto', display: 'block' },
  posterFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  posterDialog: { maxWidth: '96vw', width: 'min(900px, 96vw)' },
  // Fit the whole poster in the viewport rather than forcing a scroll through it.
  posterFull: {
    display: 'block',
    margin: '0 auto',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '72vh',
  },
  pager: { display: 'flex', justifyContent: 'space-between', gap: tokens.spacingHorizontalM },
});

function ProjectIcon({ project, size }: { project: Project; size: number }) {
  const Icon = projectIcons[project.id] ?? CodeBlockColor;
  return <Icon fontSize={size} aria-hidden />;
}

function ProjectList({ filter, onOpen }: { filter: Filter; onOpen: (id: string) => void }) {
  const s = useStyles();
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const featured = filter === 'All' ? projects.filter((p) => p.featured) : [];
  const rest = filter === 'All' ? projects.filter((p) => !p.featured) : list;

  return (
    <>
      {featured.length > 0 && (
        <Section title="Featured">
          <div className={s.featured}>
            {featured.map((p) => (
              <Card key={p.id} className={s.featuredCard} onClick={() => onOpen(p.id)}>
                <CardHeader
                  image={<ProjectIcon project={p} size={32} />}
                  header={<Body1Strong>{p.name}</Body1Strong>}
                  description={<Caption1 className={s.muted}>{p.context}</Caption1>}
                />
                {p.metric ? (
                  <div className={s.featuredMetric}>
                    <Title3>{p.metric.value}</Title3>
                    <Caption1 className={s.muted}>{p.metric.label}</Caption1>
                  </div>
                ) : (
                  <Caption1 className={mergeClasses(s.secondary, s.featuredSummary)}>{p.summary}</Caption1>
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section title={filter === 'All' ? 'More projects' : `${list.length} ${list.length === 1 ? 'project' : 'projects'}`}>
        <CardGroup>
          {rest.map((p) => (
            <Card key={p.id} className={s.rowCard} onClick={() => onOpen(p.id)}>
              <CardHeader
                image={
                  <span className={s.icon40}>
                    <ProjectIcon project={p} size={32} />
                  </span>
                }
                header={<Body1>{p.name}</Body1>}
                description={<Caption1 className={s.muted}>{p.context}</Caption1>}
                action={
                  <div className={s.rowAction}>
                    <Caption1>{p.metric ? `${p.metric.value} ${p.metric.label}` : p.stack.slice(0, 2).join(' · ')}</Caption1>
                    <ChevronRightRegular />
                  </div>
                }
              />
            </Card>
          ))}
        </CardGroup>
      </Section>
    </>
  );
}

function ProjectDetail({ project, onBack, onOpen }: { project: Project; onBack: () => void; onOpen: (id: string) => void }) {
  const s = useStyles();
  const [posterOpen, setPosterOpen] = useState(false);
  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <Breadcrumb aria-label="Breadcrumb" size="large" className={s.breadcrumb}>
        <BreadcrumbItem>
          <BreadcrumbButton className={s.crumbParent} onClick={onBack}>
            Projects
          </BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>{project.name}</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>

      <Surface className={s.hero}>
        <ProjectIcon project={project} size={64} />
        <div className={s.heroText}>
          <Subtitle2>{project.name}</Subtitle2>
          <Caption1 className={s.muted}>{project.context}</Caption1>
          <div className={s.badges}>
            <Badge appearance="tint" color="informative">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge appearance="tint" color="brand">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <div className={s.heroActions}>
          {project.links?.live && (
            <Button as="a" href={project.links.live} target="_blank" rel="noreferrer" appearance="primary" icon={<OpenRegular />}>
              Visit site
            </Button>
          )}
          {project.links?.appStore && (
            <Button as="a" href={project.links.appStore} target="_blank" rel="noreferrer" appearance="primary" icon={<AppleIcon size={16} />}>
              App Store
            </Button>
          )}
          {project.links?.playStore && (
            <Button as="a" href={project.links.playStore} target="_blank" rel="noreferrer" icon={<GooglePlayIcon size={16} />}>
              Google Play
            </Button>
          )}
          {project.links?.code && (
            <Button as="a" href={project.links.code} target="_blank" rel="noreferrer" icon={<GitHubIcon size={16} />}>
              View source
            </Button>
          )}
          {!project.links && (
            <Caption1 className={s.muted}>Internal system · walkthrough available on request</Caption1>
          )}
        </div>
      </Surface>

      {project.metric && (
        <Surface className={s.metric}>
          <Title2>{project.metric.value}</Title2>
          <Body1 className={s.secondary}>{project.metric.label}</Body1>
        </Surface>
      )}

      <Section title="Overview">
        <Surface className={s.prose}>
          <Body1 as="p">{project.summary}</Body1>
        </Surface>
      </Section>

      <Section title="What I did">
        <CardGroup>
          {project.highlights.map((h) => (
            <SettingCard key={h} icon={<CheckmarkCircleColor fontSize={24} />} title={h} />
          ))}
        </CardGroup>
      </Section>

      {project.image && (
        <Section title="Poster">
          <Dialog open={posterOpen} onOpenChange={(_, d) => setPosterOpen(d.open)}>
            <Surface
              className={s.posterCard}
              onClick={() => setPosterOpen(true)}
              ariaLabel={`Enlarge the ${project.name} poster`}
            >
                <div className={s.posterFrame}>
                  <Image
                    className={s.posterImage}
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    unoptimized
                  />
                </div>
                <div className={s.posterFooter}>
                  <Caption1 className={s.muted}>{project.image.caption}</Caption1>
                  <Caption1 className={s.secondary}>
                    <ZoomInRegular /> Click to enlarge
                  </Caption1>
                </div>
            </Surface>
            <DialogSurface className={s.posterDialog}>
              <DialogBody>
                <DialogTitle
                  action={
                    <Button
                      appearance="subtle"
                      icon={<DismissRegular />}
                      aria-label="Close"
                      onClick={() => setPosterOpen(false)}
                    />
                  }
                >
                  {project.name} poster
                </DialogTitle>
                <DialogContent>
                  <Image
                    className={s.posterFull}
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    unoptimized
                  />
                </DialogContent>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </Section>
      )}

      <Section title="Built with">
        <Surface className={s.tags}>
          <TagGroup aria-label="Technologies">
            {project.stack.map((t) => (
              <Tag key={t} appearance="outline" size="small">
                {t}
              </Tag>
            ))}
          </TagGroup>
        </Surface>
      </Section>

      <div className={s.pager}>
        {prev ? (
          <Button appearance="subtle" icon={<ArrowLeftRegular />} onClick={() => onOpen(prev.id)}>
            {prev.name}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after" onClick={() => onOpen(next.id)}>
            {next.name}
          </Button>
        )}
      </div>
    </>
  );
}

export default function Projects() {
  const s = useStyles();
  const [filter, setFilter] = useState<Filter>('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? projects.find((p) => p.id === openId) : undefined;

  const counts = useMemo(
    () => Object.fromEntries(filters.map((f) => [f, f === 'All' ? projects.length : projects.filter((p) => p.category === f).length])),
    [],
  );

  const selectFilter = (f: Filter) => {
    setFilter(f);
    setOpenId(null);
  };

  return (
    <div className={s.root}>
      <div className={s.navWrap}>
        <NavDrawer
          open
          type="inline"
          className={s.nav}
          selectedValue={open ? open.category : filter}
          onNavItemSelect={(_, d) => selectFilter(d.value as Filter)}
        >
          <NavDrawerBody>
            <NavSectionHeader>Categories</NavSectionHeader>
            {filters.map((f) => {
              const Icon = categoryIcons[f];
              return (
                <NavItem key={f} value={f} icon={<Icon fontSize={20} />}>
                  {categoryLabels[f]}
                  <CounterBadge className={s.navCount} count={counts[f]} appearance="ghost" color="informative" size="small" />
                </NavItem>
              );
            })}
          </NavDrawerBody>
        </NavDrawer>
      </div>

      <div className={s.pane} key={open?.id ?? filter}>
        <div className={s.inner}>
          {open ? (
            <ProjectDetail project={open} onBack={() => setOpenId(null)} onOpen={setOpenId} />
          ) : (
            <>
              <header className={s.header}>
                <Title2 as="h1">{filter === 'All' ? 'Projects' : categoryLabels[filter]}</Title2>
                <Body1 className={s.muted}>
                  Production systems I&apos;ve built and shipped at work, plus selected personal and academic projects.
                </Body1>
              </header>
              <div className={s.narrowTabs}>
                <TabList selectedValue={filter} onTabSelect={(_, d) => selectFilter(d.value as Filter)}>
                  {filters.map((f) => (
                    <Tab key={f} value={f}>
                      {categoryLabels[f]}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <ProjectList filter={filter} onOpen={setOpenId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
