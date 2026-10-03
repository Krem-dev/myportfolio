'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Caption1, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { DismissRegular, MaximizeRegular, SquareMultipleRegular, SubtractRegular } from '@fluentui/react-icons';
import type { WindowState } from '@/types';
import { TASKBAR_HEIGHT, useWindowStore } from '@/store/windowStore';
import { AppIcon, appById } from './appMeta';
import { useIsSmall } from './useMediaQuery';
import { PANE, PANE_SMALL, SMALL, TOUCH_TARGET } from './ui/breakpoints';

const MIN_W = 420;
const MIN_H = 320;
const TITLEBAR_H = 32;

type Edge = 'e' | 's' | 'w' | 'se' | 'sw';

const useStyles = makeStyles({
  window: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: 'var(--win-mica)',
    borderRadius: tokens.borderRadiusXLarge,
  },
  maximized: { borderRadius: 0 },
  hidden: { pointerEvents: 'none' },
  titlebar: {
    height: `${TITLEBAR_H}px`,
    flexShrink: 0,
    [SMALL]: { height: TOUCH_TARGET },
    display: 'flex',
    alignItems: 'stretch',
    userSelect: 'none',
    touchAction: 'none',
  },
  title: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalMNudge,
    paddingLeft: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
  },
  titleInactive: { color: tokens.colorNeutralForegroundDisabled },
  titleText: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  captions: { display: 'flex' },
  caption: {
    width: '46px',
    [SMALL]: { width: TOUCH_TARGET, minHeight: TOUCH_TARGET },
    border: 'none',
    background: 'transparent',
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    ':hover': { backgroundColor: 'var(--win-subtle-hover)' },
    ':active': { backgroundColor: 'var(--win-subtle-pressed)' },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}`, outlineOffset: '-2px' },
  },
  close: {
    ':hover': { backgroundColor: '#c42b1c', color: '#ffffff' },
    ':active': { backgroundColor: '#c83c31', color: '#ffffffb3' },
  },
  content: {
    flex: 1,
    minHeight: 0,
    // Window content sizes itself against this pane, not the viewport — a window
    // can be narrow on a wide screen.
    containerName: PANE,
    containerType: 'inline-size',
    // Fluent 2 asks for a 44x44 minimum touch target on web and iOS. Applied once
    // here so every window inherits it, rather than per control in six files.
    // Inline links inside prose are deliberately excluded — WCAG 2.5.8 exempts them,
    // and padding them out would wreck the résumé's document layout.
    [PANE_SMALL]: {
      '& .fui-Button, & .fui-ToolbarButton': { minHeight: TOUCH_TARGET, minWidth: TOUCH_TARGET },
      '& .fui-Input, & .fui-Textarea': { minHeight: TOUCH_TARGET },
      '& .fui-Tab': { minHeight: TOUCH_TARGET },
    },
    overflow: 'auto',
    overscrollBehavior: 'contain',
    backgroundColor: 'var(--win-layer)',
    borderTop: '1px solid var(--win-card-stroke)',
  },
  edge: { position: 'absolute', touchAction: 'none' },
  e: { top: '8px', bottom: '8px', right: 0, width: '6px', cursor: 'ew-resize' },
  w: { top: '8px', bottom: '8px', left: 0, width: '6px', cursor: 'ew-resize' },
  s: { left: '8px', right: '8px', bottom: 0, height: '6px', cursor: 'ns-resize' },
  se: { right: 0, bottom: 0, width: '12px', height: '12px', cursor: 'nwse-resize' },
  sw: { left: 0, bottom: 0, width: '12px', height: '12px', cursor: 'nesw-resize' },
});

export default function Window({ win, children }: { win: WindowState; children: ReactNode }) {
  const s = useStyles();
  const meta = appById[win.id];
  const isActive = useWindowStore((st) => st.activeId === win.id);
  const focus = useWindowStore((st) => st.focus);
  const close = useWindowStore((st) => st.close);
  const minimize = useWindowStore((st) => st.minimize);
  const toggleMaximize = useWindowStore((st) => st.toggleMaximize);
  const setBounds = useWindowStore((st) => st.setBounds);
  const isSmall = useIsSmall();
  const maximized = win.maximized || isSmall;
  const gesture = useRef<{ px: number; py: number; x: number; y: number; w: number; h: number } | null>(null);

  const startGesture = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    gesture.current = { px: e.clientX, py: e.clientY, x: win.x, y: win.y, w: win.width, h: win.height };
  };

  const onTitlePointerDown = (e: React.PointerEvent) => {
    focus(win.id);
    if (maximized || e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    startGesture(e);
  };

  const onTitlePointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight - TASKBAR_HEIGHT;
    setBounds(win.id, {
      // Keep enough of the title bar on screen to grab it again.
      x: Math.min(Math.max(g.x + e.clientX - g.px, 120 - g.w), vw - 120),
      y: Math.min(Math.max(g.y + e.clientY - g.py, 0), vh - TITLEBAR_H),
    });
  };

  const onResizeMove = (edge: Edge) => (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.px;
    const dy = e.clientY - g.py;
    const next: Partial<WindowState> = {};
    if (edge.includes('e')) next.width = Math.max(MIN_W, g.w + dx);
    if (edge.includes('s')) next.height = Math.max(MIN_H, Math.min(g.h + dy, window.innerHeight - TASKBAR_HEIGHT - g.y));
    if (edge.includes('w')) {
      const width = Math.max(MIN_W, g.w - dx);
      next.width = width;
      next.x = g.x + (g.w - width);
    }
    setBounds(win.id, next);
  };

  const endGesture = () => {
    gesture.current = null;
  };

  const bounds = maximized
    ? { left: 0, top: 0, width: '100vw', height: `calc(100dvh - ${TASKBAR_HEIGHT}px)` }
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  return (
    <motion.section
      role="dialog"
      aria-label={meta.title}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.92, y: 60, transitionEnd: { visibility: 'hidden' } }
          : { opacity: 1, scale: 1, y: 0, visibility: 'visible' }
      }
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
      onPointerDownCapture={() => !isActive && focus(win.id)}
      className={mergeClasses(s.window, maximized && s.maximized, win.minimized && s.hidden)}
      style={{
        ...bounds,
        zIndex: win.z,
        boxShadow: maximized ? 'none' : isActive ? 'var(--win-shadow-active)' : 'var(--win-shadow-inactive)',
      }}
    >
      <div
        className={s.titlebar}
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        onDoubleClick={(e) => !isSmall && !(e.target as HTMLElement).closest('button') && toggleMaximize(win.id)}
      >
        <div className={mergeClasses(s.title, !isActive && s.titleInactive)}>
          <AppIcon app={meta} size={16} />
          <Caption1 className={s.titleText}>{meta.title}</Caption1>
        </div>
        <div className={s.captions}>
          <button type="button" aria-label="Minimize" title="Minimize" className={s.caption} onClick={() => minimize(win.id)}>
            <SubtractRegular fontSize={16} />
          </button>
          {!isSmall && (
            <button
              type="button"
              aria-label={win.maximized ? 'Restore down' : 'Maximize'}
              title={win.maximized ? 'Restore down' : 'Maximize'}
              className={s.caption}
              onClick={() => toggleMaximize(win.id)}
            >
              {win.maximized ? <SquareMultipleRegular fontSize={14} /> : <MaximizeRegular fontSize={14} />}
            </button>
          )}
          <button type="button" aria-label="Close" title="Close" className={mergeClasses(s.caption, s.close)} onClick={() => close(win.id)}>
            <DismissRegular fontSize={16} />
          </button>
        </div>
      </div>

      <div className={s.content}>{children}</div>

      {!maximized &&
        (['e', 's', 'w', 'se', 'sw'] as Edge[]).map((edge) => (
          <div
            key={edge}
            aria-hidden
            className={mergeClasses(s.edge, s[edge])}
            onPointerDown={(e) => {
              e.stopPropagation();
              focus(win.id);
              startGesture(e);
            }}
            onPointerMove={onResizeMove(edge)}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
          />
        ))}
    </motion.section>
  );
}
