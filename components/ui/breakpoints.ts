/**
 * One set of breakpoints for the whole site, following the WinUI size classes:
 * Small ≤640px · Medium 641–1007px · Large ≥1008px.
 * https://learn.microsoft.com/en-us/windows/apps/design/layout/screen-sizes-and-breakpoints-for-responsive-design
 */

/** Viewport queries — for the shell: desktop, taskbar, Start menu, window chrome. */
export const SMALL = '@media (max-width: 640px)';
export const BELOW_LARGE = '@media (max-width: 1007px)';

export const SMALL_QUERY = '(max-width: 640px)';
export const LARGE_QUERY = '(min-width: 1008px)';

/**
 * Container queries — for anything *inside* a window. A window can be 500px wide
 * on a 4K display, so its content has to react to the pane, not the viewport.
 * Every window's scroll area declares this container (see components/window.tsx).
 */
export const PANE = 'pane';
export const PANE_SMALL = `@container ${PANE} (max-width: 640px)`;
export const PANE_BELOW_LARGE = `@container ${PANE} (max-width: 1007px)`;

/** Fluent 2's minimum touch target for web and iOS (Android is 48). */
export const TOUCH_TARGET = '44px';
