import Shell from '@/components/shell';
import SiteDocument from '@/components/siteDocument';
import { certifications, experience, links, profile, skills } from '@/data/profile';

/** Person schema, so search engines can read who this is rather than infer it. */
function structuredData() {
  const [current] = experience;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: links.site,
    image: `${links.site}/avatar.jpg`,
    email: `mailto:${links.email}`,
    telephone: links.phone,
    address: { '@type': 'PostalAddress', addressCountry: 'GH', addressLocality: profile.location },
    worksFor: { '@type': 'Organization', name: current.org },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kwame Nkrumah University of Science and Technology' },
    knowsAbout: skills.flatMap((g) => g.items),
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
    })),
    sameAs: [links.linkedin, links.github, links.blog],
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Built from our own data, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <SiteDocument />
      {/* Server-rendered so it paints with the first frame: without it the plain
          document would be visible until the desktop hydrates on top. The content
          stays in the DOM and is never display:none, so it is still indexed. With
          scripting off the desktop never arrives, so the cover removes itself. */}
      <div className="app-cover" aria-hidden="true" />
      <noscript>
        <style>{`.app-cover{display:none}`}</style>
      </noscript>
      <Shell />
    </>
  );
}
