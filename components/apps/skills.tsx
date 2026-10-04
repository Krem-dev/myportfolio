'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Badge,
  Body1,
  Caption1,
  Tag,
  TagGroup,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BotColor,
  CloudColor,
  CodeColor,
  DatabaseColor,
  HeadsetColor,
  GlobeColor,
  LinkMultipleColor,
  OpenRegular,
  PhoneColor,
  RibbonColor,
  AppsColor,
  type FluentIcon,
} from '@fluentui/react-icons';
import type { HorizontalBarChartWithAxisDataPoint } from '@fluentui/react-charts';
import { certifications, projects, skills } from '@/data/profile';
import { PANE_SMALL } from '../ui/breakpoints';
import { useElementWidth } from '../useElementWidth';
import { CardGroup, Page, Section, SettingCard, Surface } from '../ui/win';

// d3 measures the DOM on mount, so the chart only renders in the browser.
const HorizontalBarChartWithAxis = dynamic(
  () => import('@fluentui/react-charts').then((m) => m.HorizontalBarChartWithAxis),
  { ssr: false },
);

const groupIcons: Record<string, FluentIcon> = {
  Languages: CodeColor,
  'Microsoft Platform': AppsColor,
  'Backend & Web': GlobeColor,
  Mobile: PhoneColor,
  'Integration & GIS': LinkMultipleColor,
  'Data & Reporting': DatabaseColor,
  Infrastructure: CloudColor,
  'Embedded & AI': BotColor,
  'Support & Delivery': HeadsetColor,
};

const useStyles = makeStyles({
  chartCard: { padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalS}` },
  chartNote: { display: 'block', padding: `0 ${tokens.spacingHorizontalL} ${tokens.spacingVerticalM}`, color: tokens.colorNeutralForeground3 },
  group: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  groupLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    width: '200px',
    flexShrink: 0,
    [PANE_SMALL]: { width: 'auto' },
  },
  // Fluent's TagGroup keeps tags on one line; long groups need to wrap.
  groupTags: { flex: '1 1 320px', minWidth: 0, '& > *': { flexWrap: 'wrap' } },
  muted: { color: tokens.colorNeutralForeground3 },
});

/**
 * How many of the listed projects each skill area actually appears in, counted
 * from the project stacks rather than from a self-assessed proficiency score.
 */
function useProjectReach(): HorizontalBarChartWithAxisDataPoint[] {
  return useMemo(
    () =>
      skills
        .map((g) => {
          const items = g.items.map((i) => i.toLowerCase());
          const count = projects.filter((p) => p.stack.some((t) => items.includes(t.toLowerCase()))).length;
          return { group: g.group, count };
        })
        .filter((g) => g.count > 0)
        .sort((a, b) => a.count - b.count)
        // One colour throughout: the bar length is the only thing carrying meaning.
        .map((g) => ({
          x: g.count,
          y: g.group,
          color: tokens.colorBrandBackground,
          xAxisCalloutData: g.group,
          yAxisCalloutData: `${g.count} of ${projects.length} projects`,
        })),
    [],
  );
}

export default function Skills() {
  const s = useStyles();
  const reach = useProjectReach();
  const [chartRef, chartWidth] = useElementWidth<HTMLDivElement>();
  // 0 before the first measurement, so assume the roomy layout until we know better.
  const narrow = chartWidth > 0 && chartWidth < 520;
  // Project counts are whole numbers, so the axis shouldn't offer halves.
  const wholeNumberTicks = useMemo(
    () => Array.from({ length: Math.max(...reach.map((d) => d.x)) + 1 }, (_, i) => i),
    [reach],
  );

  return (
    <Page title="Skills" subtitle="The platforms and tools I use day to day, and the certifications behind them.">
      <Section title="Certifications">
        <CardGroup>
          {certifications.map((c) => (
            <SettingCard
              key={c.name}
              icon={<RibbonColor fontSize={24} />}
              title={c.name}
              description={c.issuer}
              href={c.credentialUrl}
              action={
                <>
                  {c.date && <Caption1 className={s.muted}>{c.date}</Caption1>}
                  {c.credentialUrl ? (
                    <Badge appearance="tint" color="success" icon={<OpenRegular />}>
                      Verify
                    </Badge>
                  ) : (
                    <Badge appearance="tint" color="informative">
                      Certificate
                    </Badge>
                  )}
                </>
              }
            />
          ))}
        </CardGroup>
      </Section>

      <Section title="Where the work sits">
        <Surface>
          <div className={s.chartCard} ref={chartRef}>
            <HorizontalBarChartWithAxis
              data={reach}
              height={narrow ? 260 : 300}
              barHeight={narrow ? 12 : 16}
              hideLegend
              margins={{ left: narrow ? 122 : 160, right: narrow ? 18 : 32, top: 8, bottom: 40 }}
              tickValues={wholeNumberTicks}
            />
          </div>
          <Caption1 className={s.chartNote}>
            Counted from the stacks of the {projects.length} projects listed on this site, not a self-rated
            proficiency score.
          </Caption1>
        </Surface>
      </Section>

      <Section title="Technical skills">
        <CardGroup>
          {skills.map((g) => {
            const Icon = groupIcons[g.group] ?? CodeColor;
            return (
              <Surface key={g.group} className={s.group}>
                <div className={s.groupLabel}>
                  <Icon fontSize={24} aria-hidden />
                  <Body1>{g.group}</Body1>
                </div>
                <div className={s.groupTags}>
                  <TagGroup aria-label={g.group}>
                    {g.items.map((i) => (
                      <Tag key={i} appearance="outline" size="small">
                        {i}
                      </Tag>
                    ))}
                  </TagGroup>
                </div>
              </Surface>
            );
          })}
        </CardGroup>
      </Section>
    </Page>
  );
}
