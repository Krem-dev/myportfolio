'use client';

import { useState } from 'react';
import Image from 'next/image';
import { tokens } from '@fluentui/react-components';
import { profile } from '@/data/profile';

/**
 * The personal mark on the boot screen — the photo, the way Windows shows an
 * account picture at sign-in. Initials are only a fallback for when there is no
 * photo set, or it fails to load.
 */
export default function UserTile({ size = 72 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  if (profile.photo && !failed) {
    return (
      <Image
        src={profile.photo}
        alt=""
        aria-hidden
        width={size}
        height={size}
        // Never lazy — this is the first thing painted. The preload itself lives in
        // app/layout.tsx so it applies even when the boot screen is skipped.
        loading="eager"
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: '0 0 0 2px rgb(255 255 255 / 0.25)',
        }}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
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
