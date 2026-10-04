import type { Metadata, Viewport } from 'next';
import Providers from '@/components/providers';
import { links, profile } from '@/data/profile';
import './globals.css';

const description = `${profile.name}, ${profile.title}. ${profile.tagline}`;

const title = `${profile.name} | ${profile.title}`;
const ogImage = { url: '/og.png', width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  // Without this, Next can't turn the relative image paths below into the
  // absolute URLs that Open Graph and Twitter require.
  metadataBase: new URL(links.site),
  title,
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    type: 'profile',
    url: '/',
    siteName: profile.name,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
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
