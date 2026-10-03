// Brand marks aren't part of Fluent's icon set, so they live here as small inline SVGs.

type Props = { size?: number; fontSize?: number; className?: string };

export function GitHubIcon({ size, fontSize, className }: Props) {
  size = size ?? fontSize ?? 20;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function AppleIcon({ size, fontSize, className }: Props) {
  size = size ?? fontSize ?? 20;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={className}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}

export function GooglePlayIcon({ size, fontSize, className }: Props) {
  size = size ?? fontSize ?? 20;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className}>
      <path fill="#4285f4" d="M3.3 1.6a1.6 1.6 0 0 0-.5 1.2v18.4c0 .5.2.9.5 1.2l10.1-10.4L3.3 1.6Z" />
      <path fill="#ea4335" d="M3.3 1.6a1.5 1.5 0 0 1 1.4.1l11.6 6.6-2.8 2.8L3.3 1.6Z" />
      <path fill="#fbbc04" d="m16.3 8.3 3.6 2a1.5 1.5 0 0 1 0 2.6l-3.6 2-2.8-2.8 2.8-2.8Z" />
      <path fill="#34a853" d="m13.5 11.9 2.8 2.8-11.6 6.6a1.5 1.5 0 0 1-1.4.1l10.2-9.5Z" />
    </svg>
  );
}

export function LinkedInIcon({ size, fontSize, className }: Props) {
  size = size ?? fontSize ?? 20;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#0a66c2" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
