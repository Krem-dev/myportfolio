'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Caption1, makeStyles, tokens } from '@fluentui/react-components';
import { TASKBAR_HEIGHT, useWindowStore } from '@/store/windowStore';
import { AppIcon, apps, useOpenApp } from './appMeta';
import { appComponents } from './apps';
import ProfileWidget from './profileWidget';
import StartMenu from './startMenu';
import Taskbar from './taskbar';
import { useIsSmall } from './useMediaQuery';
import { BELOW_LARGE, SMALL, SMALL_QUERY } from './ui/breakpoints';
import Window from './window';

const useStyles = makeStyles({
  desktop: {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    backgroundColor: 'var(--win-wallpaper)',
    backgroundImage: 'var(--win-wallpaper-image)',
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
  },
  surface: { position: 'absolute', top: 0, left: 0, right: 0, overflowY: 'auto' },
  desktopLayout: {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingHorizontalS,
  },
  iconGrid: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateRows: 'repeat(auto-fill, 92px)',
    gridAutoColumns: '80px',
    alignContent: 'start',
    gap: '2px',
  },
  icon: {
    border: 'none',
    background: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalS} 2px`,
    cursor: 'default',
    ':hover': { backgroundColor: 'rgb(255 255 255 / 0.12)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.14)' },
    ':active': { backgroundColor: 'rgb(255 255 255 / 0.2)' },
    ':focus-visible': { outline: '1px solid rgb(255 255 255 / 0.7)' },
  },
  iconLabel: { textAlign: 'center', textShadow: '0 1px 2px rgb(0 0 0 / 0.75), 0 0 6px rgb(0 0 0 / 0.35)' },
  widget: { width: '380px', alignSelf: 'flex-start', [BELOW_LARGE]: { display: 'none' } },
  mobileLayout: {
    minHeight: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalL}`,
    [SMALL]: { gap: tokens.spacingVerticalXL, padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalM}` },
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: tokens.spacingVerticalL,
    // Narrow phones (320px) still need room for three readable labels.
    '@media (max-width: 360px)': { gap: tokens.spacingHorizontalXS },
  },
});

export default function Desktop() {
  const s = useStyles();
  const windows = useWindowStore((st) => st.windows);
  const openApp = useOpenApp();
  const clampWindows = useWindowStore((st) => st.clampWindows);
  const isSmall = useIsSmall();
  const [startOpen, setStartOpen] = useState(false);
  const closeStart = useCallback(() => setStartOpen(false), []);

  // Greet desktop visitors with the About window instead of an empty desktop.
  useEffect(() => {
    if (!window.matchMedia(SMALL_QUERY).matches) openApp('about');
  }, [openApp]);

  // A window placed on a wide viewport must not be left stranded off-screen when
  // the viewport shrinks (rotation, split screen, a dragged browser edge).
  useEffect(() => {
    const onResize = () => clampWindows();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [clampWindows]);

  const icons = apps.map((app) => (
    <button key={app.id} type="button" className={s.icon} onClick={() => openApp(app.id)}>
      <AppIcon app={app} size={isSmall ? 48 : 40} />
      <Caption1 className={s.iconLabel}>{app.title}</Caption1>
    </button>
  ));

  return (
    <main className={s.desktop}>
      <div className={s.surface} style={{ bottom: TASKBAR_HEIGHT }}>
        {isSmall ? (
          <div className={s.mobileLayout}>
            <ProfileWidget />
            <nav aria-label="Apps" className={s.mobileGrid}>
              {icons}
            </nav>
          </div>
        ) : (
          <div className={s.desktopLayout}>
            <nav aria-label="Desktop" className={s.iconGrid}>
              {icons}
            </nav>
            <ProfileWidget className={s.widget} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {windows.map((w) => {
          const Content = appComponents[w.id];
          return (
            <Window key={w.id} win={w}>
              <Content />
            </Window>
          );
        })}
      </AnimatePresence>

      <StartMenu open={startOpen} onClose={closeStart} />
      <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen((o) => !o)} />
    </main>
  );
}
