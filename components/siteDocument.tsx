import { certifications, education, experience, links, profile, projects, skills } from '@/data/profile';

/**
 * The page as a plain document: a server component, so every word is in the
 * exported HTML.
 *
 * The desktop is a fixed overlay that mounts after hydration, and each of its
 * windows only renders once its icon is clicked — so without this, a crawler
 * (or anyone without JavaScript) sees a title and nothing else. This carries the
 * same content the windows show, which is what makes it a fallback rather than
 * cloaking: it is built from data/profile.ts, exactly like the UI above it.
 */
export default function SiteDocument() {
  const [first, ...rest] = experience;

  return (
    <main className="doc" id="content">
      <header>
        <h1>{profile.name}</h1>
        <p className="doc-lead">
          {profile.title} — {first.title} at {first.org}, {profile.location}.
        </p>
        <p>{profile.tagline}</p>
        <ul className="doc-inline">
          {profile.highlights.map((h) => (
            <li key={h.label}>
              <strong>{h.value}</strong> {h.label}
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="doc-about">
        <h2 id="doc-about">About</h2>
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section aria-labelledby="doc-experience">
        <h2 id="doc-experience">Experience</h2>
        {[first, ...rest].map((role) => (
          <article key={role.org + role.title}>
            <h3>
              {role.title}, {role.org}
            </h3>
            <p className="doc-meta">
              {[role.unit, role.location].filter(Boolean).join(' · ')} · {role.start} to {role.end}
            </p>
            <ul>
              {role.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="doc-projects">
        <h2 id="doc-projects">Projects</h2>
        {projects.map((project) => (
          <article key={project.id}>
            <h3>{project.name}</h3>
            <p className="doc-meta">
              {project.context} · {project.category}
            </p>
            <p>{project.summary}</p>
            <ul>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="doc-meta">Built with {project.stack.join(', ')}.</p>
            {project.links && (
              <p>
                {project.links.live && <a href={project.links.live}>Visit {project.name}</a>}
                {project.links.appStore && <a href={project.links.appStore}>{project.name} on the App Store</a>}
                {project.links.playStore && <a href={project.links.playStore}>{project.name} on Google Play</a>}
                {project.links.code && <a href={project.links.code}>{project.name} source code</a>}
              </p>
            )}
          </article>
        ))}
      </section>

      <section aria-labelledby="doc-skills">
        <h2 id="doc-skills">Skills</h2>
        <dl>
          {skills.map((group) => (
            <div key={group.group}>
              <dt>{group.group}</dt>
              <dd>{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="doc-education">
        <h2 id="doc-education">Education and certifications</h2>
        {education.map((study) => (
          <article key={study.school}>
            <h3>
              {study.program}, {study.school}
            </h3>
            <p className="doc-meta">
              {study.start} to {study.end}
              {study.note ? ` · ${study.note}` : ''}
            </p>
            {study.points && (
              <ul>
                {study.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
        <ul>
          {certifications.map((c) => (
            <li key={c.name}>
              {c.credentialUrl ? <a href={c.credentialUrl}>{c.name}</a> : c.name} — {c.issuer}
              {c.date ? `, ${c.date}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="doc-contact">
        <h2 id="doc-contact">Contact</h2>
        <ul className="doc-inline">
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={links.phoneHref}>{links.phone}</a>
          </li>
          <li>
            <a href={links.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={links.github}>GitHub</a>
          </li>
          <li>
            <a href={links.blog}>Blog</a>
          </li>
          <li>
            <a href="/resume.pdf">Download CV (PDF)</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
