import type { Metadata, Viewport } from 'next';
import Providers from '@/components/providers';
import { profile } from '@/data/profile';
import './globals.css';

const description = `${profile.name} — ${profile.title}. ${profile.tagline}`;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — ${profile.title}`,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#dfeaff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Every avatar on the site is this one file. Preloading it here (rather than
            relying on the boot screen, which only runs once per session) means no
            window ever paints initials first and swaps to the photo a moment later. */}
        {profile.photo && <link rel="preload" as="image" href={profile.photo} fetchPriority="high" />}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
