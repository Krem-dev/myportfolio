'use client';

import { useSyncExternalStore } from 'react';
import { Caption1, PresenceBadge, Tooltip, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { AppsColor, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { profile } from '@/data/profile';
import { TASKBAR_HEIGHT, useWindowStore } from '@/store/windowStore';
import { useThemeStore } from '@/store/themeStore';
import { AppIcon, apps, appById, useOpenApp } from './appMeta';
import { SMALL, TOUCH_TARGET } from './ui/breakpoints';

const CLOCK_TICK_MS = 15_000;

/** Current time, refreshed every 15s; null during SSR so server and client markup match. */
function useClock() {
  const tick = useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, CLOCK_TICK_MS);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / CLOCK_TICK_MS),
    () => null,
  );
  return tick === null ? null : new Date();
}

const useStyles = makeStyles({
  bar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: `${TASKBAR_HEIGHT}px`,
    zIndex: 9000,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${tokens.spacingHorizontalS}`,
    backgroundColor: 'var(--win-acrylic)',
    backdropFilter: 'blur(30px) saturate(1.5)',
    borderTop: '1px solid var(--win-acrylic-stroke)',
  },
  side: { flex: 1, display: 'flex', alignItems: 'center' },
  sideStart: { [SMALL]: { flex: '0 0 auto' } },
  sideEnd: { justifyContent: 'flex-end', gap: tokens.spacingHorizontalXS, [SMALL]: { flex: '0 0 auto' } },
  leftDesktopOnly: { [SMALL]: { display: 'none' } },
  center: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    [SMALL]: {
      flex: 1,
      justifyContent: 'flex-start',
      // Six pinned apps plus Start exceed a 360px phone at a 44px touch target,
      // so the strip scrolls rather than squeezing the targets below the minimum.
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '::-webkit-scrollbar': { display: 'none' },
    },
  },
  button: {
    position: 'relative',
    height: '40px',
    minWidth: '40px',
    flexShrink: 0,
    // Fluent 2 sets a 44x44 minimum touch target for web and iOS.
    [SMALL]: { height: TOUCH_TARGET, minWidth: TOUCH_TARGET },
    border: 'none',
    background: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalS,
    cursor: 'default',
    ':hover': { backgroundColor: 'var(--win-subtle-hover)' },
    ':active': { backgroundColor: 'var(--win-subtle-pressed)' },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}`, outlineOffset: '-2px' },
  },
  buttonOn: { backgroundColor: 'var(--win-subtle-hover)' },
  widget: { padding: `0 ${tokens.spacingHorizontalM}` },
  indicator: {
    position: 'absolute',
    bottom: '2px',
    left: '50%',
    height: '3px',
    width: '6px',
    transform: 'translateX(-50%)',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground3,
    transitionProperty: 'width, background-color',
    transitionDuration: tokens.durationFast,
  },
  indicatorActive: { width: '16px', backgroundColor: tokens.colorCompoundBrandBackground },
  clock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: `0 ${tokens.spacingHorizontalS}`,
    lineHeight: '16px',
    [SMALL]: { display: 'none' },
  },
});

export default function Taskbar({ startOpen, onToggleStart }: { startOpen: boolean; onToggleStart: () => void }) {
  const s = useStyles();
  const windows = useWindowStore((st) => st.windows);
  const activeId = useWindowStore((st) => st.activeId);
  const activate = useWindowStore((st) => st.activate);
  const openApp = useOpenApp();
  const { mode, toggle } = useThemeStore();
  const now = useClock();

  return (
    <footer className={s.bar}>
      <div className={mergeClasses(s.side, s.leftDesktopOnly)}>
        <button type="button" className={mergeClasses(s.button, s.widget)} onClick={() => openApp('contact')}>
          <PresenceBadge status="available" size="small" />
          <Caption1>{profile.availability}</Caption1>
        </button>
      </div>

      <nav aria-label="Apps" className={s.center}>
        <Tooltip content="Start" relationship="label" positioning="above">
          <button type="button" aria-expanded={startOpen} onClick={onToggleStart} className={mergeClasses(s.button, startOpen && s.buttonOn)}>
            <AppsColor fontSize={24} />
          </button>
        </Tooltip>
        {apps.map((app) => {
          const win = windows.find((w) => w.id === app.id);
          const isActive = activeId === app.id && !win?.minimized;
          return (
            <Tooltip key={app.id} content={app.title} relationship="label" positioning="above">
              <button
                type="button"
                onClick={() => activate(app.id, appById[app.id].size)}
                className={mergeClasses(s.button, isActive && s.buttonOn)}
              >
                <AppIcon app={app} size={24} />
                {win && <span className={mergeClasses(s.indicator, isActive && s.indicatorActive)} />}
              </button>
            </Tooltip>
          );
        })}
      </nav>

      <div className={mergeClasses(s.side, s.sideEnd)}>
        <Tooltip content={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} relationship="label" positioning="above">
          <button type="button" onClick={toggle} className={s.button}>
            {mode === 'dark' ? <WeatherSunnyRegular fontSize={18} /> : <WeatherMoonRegular fontSize={18} />}
          </button>
        </Tooltip>
        {now && (
          <div className={s.clock}>
            <Caption1>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Caption1>
            <Caption1>{now.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })}</Caption1>
          </div>
        )}
      </div>
    </footer>
  );
}
