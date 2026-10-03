'use client';

import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Body1,
  Body1Strong,
  Caption1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BookOpenLightbulbColor,
  BuildingColor,
  BuildingGovernmentColor,
  LibraryColor,
  PeopleTeamColor,
  type FluentIcon,
} from '@fluentui/react-icons';
import type { GanttChartDataPoint } from '@fluentui/react-charts';
import { education, experience, type Role, type Study } from '@/data/profile';
import { PANE_SMALL } from '../ui/breakpoints';
import { useElementWidth } from '../useElementWidth';
import { Page, Section, Surface } from '../ui/win';

// d3 measures the DOM on mount, so the chart only renders in the browser.
const GanttChart = dynamic(() => import('@fluentui/react-charts').then((m) => m.GanttChart), {
  ssr: false,
});

const orgIcons: Record<string, FluentIcon> = {
  'AngloGold Ashanti': BuildingColor,
  'SleekTeq Solutions': PeopleTeamColor,
  'Volta River Authority': BuildingGovernmentColor,
  'Kwame Nkrumah University of Science and Technology': LibraryColor,
  'African Leadership X (ALX)': BookOpenLightbulbColor,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseMonth(value: string): Date {
  if (value === 'Present') return new Date();
  const [month, year] = value.split(' ');
  return new Date(Number(year), Math.max(0, months.indexOf(month)), 1);
}

function duration(start: string, end: string): string {
  const from = parseMonth(start);
  const to = parseMonth(end);
  const total = Math.max(1, (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()));
  const years = Math.floor(total / 12);
  const rest = total % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}

/** Short label for the chart's y-axis — the full name is in the card below it. */
function shortOrg(org: string): string {
  return org === 'Kwame Nkrumah University of Science and Technology' ? 'KNUST' : org.replace(' (ALX)', '');
}

/** Abbreviations for narrow panes, where a long label would leave no room for the bars. */
const abbreviations: Record<string, string> = {
  'African Leadership X': 'ALX',
  'Volta River Authority': 'VRA',
  'AngloGold Ashanti': 'AngloGold',
  'SleekTeq Solutions': 'SleekTeq',
};

const useStyles = makeStyles({
  // 4px rhythm between expander cards, as in Windows 11 Settings.
  stack: { display: 'flex', flexDirection: 'column', gap: '4px' },
  item: {
    backgroundColor: 'var(--win-card)',
    border: '1px solid var(--win-card-stroke)',
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    '& button': {
      minHeight: '68px',
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    },
    '& button:hover': { backgroundColor: 'var(--win-card-hover)' },
    // Fluent lets the end-positioned chevron grow to fill the row; give that space to the content instead.
    '& .fui-AccordionHeader__expandIcon': { flexGrow: 0 },
  },
  headerRow: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  headerText: { display: 'flex', flexDirection: 'column', minWidth: 0, textAlign: 'left' },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    whiteSpace: 'nowrap',
  },
  muted: { color: tokens.colorNeutralForeground3 },
  panel: {
    margin: 0,
    padding: `0 ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalL} 60px`,
    [PANE_SMALL]: { paddingLeft: tokens.spacingHorizontalL },
  },
  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  point: {
    position: 'relative',
    paddingLeft: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground2,
    '::before': {
      content: '""',
      position: 'absolute',
      left: '2px',
      top: '9px',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: tokens.colorNeutralForeground4,
    },
  },
  chart: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalM}`,
  },
});

function Entry({
  value,
  icon: Icon,
  title,
  org,
  meta,
  start,
  end,
  badge,
  points,
}: {
  value: string;
  icon: FluentIcon;
  title: string;
  org: string;
  meta?: string;
  start: string;
  end: string;
  badge?: { text: string; color: 'success' | 'brand' | 'informative' };
  points: string[];
}) {
  const s = useStyles();
  return (
    <AccordionItem value={value} className={s.item}>
      <AccordionHeader expandIconPosition="end" icon={<Icon fontSize={28} />}>
        <div className={s.headerRow}>
          <div className={s.headerText}>
            <Body1Strong>{title}</Body1Strong>
            <Caption1 className={s.muted}>{[org, meta].filter(Boolean).join(' · ')}</Caption1>
          </div>
          <div className={s.headerMeta}>
            {badge && (
              <Badge appearance="tint" color={badge.color}>
                {badge.text}
              </Badge>
            )}
            <Caption1 className={s.muted}>
              {start} – {end} · {duration(start, end)}
            </Caption1>
          </div>
        </div>
      </AccordionHeader>
      <AccordionPanel className={s.panel}>
        <ul className={s.points}>
          {points.map((p) => (
            <li key={p} className={s.point}>
              <Body1>{p}</Body1>
            </li>
          ))}
        </ul>
      </AccordionPanel>
    </AccordionItem>
  );
}

function timelineBars(roles: Role[], studies: Study[], narrow: boolean): GanttChartDataPoint[] {
  const bar = (name: string, start: string, end: string, legend: string, color: string) => {
    const label = shortOrg(name);
    return {
      x: { start: parseMonth(start), end: parseMonth(end) },
      y: narrow ? (abbreviations[label] ?? label) : label,
      legend,
      color,
      // The callout carries the full name, so abbreviating the axis loses nothing.
      xAxisCalloutData: `${label} · ${start} – ${end}`,
      yAxisCalloutData: duration(start, end),
    };
  };
  // Oldest first, so the chart reads top-to-bottom in the order things happened.
  return [
    ...studies.map((e) => bar(e.school, e.start, e.end, 'Study', tokens.colorPaletteBerryBackground3)),
    ...roles.map((r) => bar(r.org, r.start, r.end, 'Work', tokens.colorBrandBackground)),
  ].sort((a, b) => Number(a.x.start) - Number(b.x.start));
}

export default function Experience() {
  const s = useStyles();
  const [chartRef, chartWidth] = useElementWidth<HTMLDivElement>();
  // 0 before the first measurement — assume the roomy layout until we know better.
  const narrow = chartWidth > 0 && chartWidth < 520;
  const bars = timelineBars(experience, education, narrow);

  return (
    <Page title="Experience" subtitle="Where I've worked and studied, and what I built there.">
      <Section title="Timeline">
        <Surface className={s.chart}>
          <div ref={chartRef}>
            <GanttChart
              data={bars}
              height={narrow ? 230 : 260}
              barHeight={narrow ? 14 : 18}
              xAxisTickCount={narrow ? 3 : 6}
              margins={{ left: narrow ? 86 : 164, right: narrow ? 14 : 24, top: 16, bottom: 36 }}
              roundCorners
              legendProps={{ allowFocusOnLegends: true }}
            />
          </div>
        </Surface>
      </Section>

      <Section title="Work">
        <Accordion multiple collapsible className={s.stack} defaultOpenItems={[experience[0].org]}>
            {experience.map((r) => (
              <Entry
                key={r.org + r.title}
                value={r.org}
                icon={orgIcons[r.org] ?? BuildingColor}
                title={r.title}
                org={r.org}
                meta={[r.unit, r.location].filter(Boolean).join(' · ')}
                start={r.start}
                end={r.end}
                badge={
                  r.concurrent
                    ? { text: 'Concurrent', color: 'informative' }
                    : r.end === 'Present'
                      ? { text: 'Current', color: 'success' }
                      : undefined
                }
                points={r.points}
              />
            ))}
        </Accordion>
      </Section>

      <Section title="Education">
        <Accordion multiple collapsible className={s.stack} defaultOpenItems={[education[0].school]}>
            {education.map((e) => (
              <Entry
                key={e.school}
                value={e.school}
                icon={orgIcons[e.school] ?? LibraryColor}
                title={e.program}
                org={e.school}
                start={e.start}
                end={e.end}
                badge={e.note ? { text: e.note, color: 'brand' } : undefined}
                points={e.points ?? []}
              />
            ))}
        </Accordion>
      </Section>
    </Page>
  );
}
