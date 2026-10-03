'use client';

import { tokens } from '@fluentui/react-components';
import { profile } from '@/data/profile';

/** Personal mark used for the Start button and boot screen. Flat brand colour, Windows 11 style. */
export default function Monogram({ size = 24 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(4, Math.round(size * 0.2)),
        background: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.42),
        fontWeight: 600,
        letterSpacing: '-0.02em',
        flexShrink: 0,
      }}
    >
      {profile.initials}
    </span>
  );
}
