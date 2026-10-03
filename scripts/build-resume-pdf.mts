/**
 * Renders public/resume.pdf straight from data/profile.ts, so the downloadable CV
 * can never drift from what the site says. Deliberately omits referees — their
 * contact details stay out of anything public.
 *
 *   npm run resume
 */

import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { certifications, education, experience, links, profile, projects, skills } from '../data/profile.ts';

const OUT = join(dirname(dirname(fileURLToPath(import.meta.url))), 'public', 'resume.pdf');

const INK = '#111111';
const BODY = '#333333';
const MUTED = '#666666';
const RULE = '#cccccc';
const ACCENT = '#0f6cbd'; // Fluent brand

const PAGE = { size: 'A4' as const, margins: { top: 48, bottom: 52, left: 54, right: 54 } };

const doc = new PDFDocument({ ...PAGE, autoFirstPage: true, bufferPages: true });
const left = PAGE.margins.left;
const width = 595.28 - PAGE.margins.left - PAGE.margins.right;

function body(size = 9.5) {
  return doc.font('Helvetica').fontSize(size).fillColor(BODY);
}

function section(title: string) {
  // Keep a heading with at least the start of its content.
  if (doc.y > doc.page.height - PAGE.margins.bottom - 72) doc.addPage();
  doc.moveDown(0.9);
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MUTED).text(title.toUpperCase(), left, doc.y, {
    characterSpacing: 1.1,
    width,
  });
  doc.moveDown(0.25);
  const y = doc.y;
  doc.moveTo(left, y).lineTo(left + width, y).lineWidth(0.5).strokeColor(RULE).stroke();
  doc.y = y + 7;
}

/** Title on the left, dates right-aligned on the same baseline. */
function entry(title: string, org: string, dates: string) {
  const y = doc.y;
  const dateW = doc.font('Helvetica').fontSize(8.5).widthOfString(dates) + 14;
  const textW = width - dateW;
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(title, left, y, { width: textW, continued: true });
  doc.font('Helvetica').fillColor(MUTED).text(` — ${org}`, { width: textW });
  const afterText = doc.y;
  doc.font('Helvetica').fontSize(8.5).fillColor(MUTED).text(dates, left, y + 1.5, { width, align: 'right' });
  doc.y = Math.max(afterText, y + 13);
}

function meta(text: string) {
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(text, left, doc.y, { width });
  doc.moveDown(0.15);
}

function bullets(items: string[]) {
  body();
  for (const item of items) {
    const y = doc.y;
    doc.fillColor(MUTED).text('•', left + 3, y, { width: 10 });
    doc.fillColor(BODY).text(item, left + 15, y, { width: width - 15, align: 'left' });
    doc.moveDown(0.18);
  }
}

async function main() {
  await mkdir(dirname(OUT), { recursive: true });
  const stream = createWriteStream(OUT);
  doc.pipe(stream);

  // ---- Header ----
  doc.font('Helvetica-Bold').fontSize(21).fillColor(INK).text(profile.name, left, PAGE.margins.top, {
    width,
    align: 'center',
  });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(11).fillColor(BODY).text(profile.title, { width, align: 'center' });
  doc.moveDown(0.45);

  const contact = [links.email, links.phone, profile.location].join('   ·   ');
  doc.fontSize(9).fillColor(MUTED).text(contact, { width, align: 'center' });
  doc.moveDown(0.2);

  const web = [
    { label: 'linkedin.com/in/isaac-amponsah', href: links.linkedin },
    { label: 'github.com/Krem-dev', href: links.github },
    { label: 'kremlin.hashnode.dev', href: links.blog },
  ];
  const webText = web.map((w) => w.label).join('   ·   ');
  const webY = doc.y;
  doc.fontSize(9).fillColor(ACCENT).text(webText, left, webY, { width, align: 'center', link: undefined });
  // One link rectangle per entry, measured across the centred line.
  const totalW = doc.widthOfString(webText);
  let cursor = left + (width - totalW) / 2;
  const sepW = doc.widthOfString('   ·   ');
  for (const w of web) {
    const labelW = doc.widthOfString(w.label);
    doc.link(cursor, webY - 1, labelW, 11, w.href);
    cursor += labelW + sepW;
  }
  doc.moveDown(0.3);

  // ---- Profile ----
  section('Profile');
  body(9.5).text(profile.bio[0], left, doc.y, { width, align: 'justify' });
  doc.moveDown(0.3);
  body(9.5).text(profile.bio[1], left, doc.y, { width, align: 'justify' });

  // ---- Experience ----
  section('Experience');
  experience.forEach((role, i) => {
    if (i) doc.moveDown(0.5);
    entry(role.title, role.org, `${role.start} – ${role.end}`);
    meta([role.unit, role.location].filter(Boolean).join(' · '));
    bullets(role.points);
  });

  // ---- Selected projects ----
  section('Selected projects');
  const shown = projects.filter((p) => p.featured || p.metric);
  shown.forEach((p, i) => {
    if (i) doc.moveDown(0.45);
    // Don't let a project's stack line start a page on its own.
    if (doc.y > doc.page.height - PAGE.margins.bottom - 72) doc.addPage();
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK).text(p.name, left, doc.y, { continued: true, width });
    doc.font('Helvetica').fillColor(MUTED).text(`  ${p.context}`);
    body(9.5).text(p.summary, left, doc.y, { width, align: 'justify' });
    const extras = [p.metric && `${p.metric.value} ${p.metric.label}`, p.stack.slice(0, 6).join(', ')].filter(Boolean);
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(extras.join('. '), left, doc.y, { width });
  });

  // ---- Education ----
  section('Education');
  education.forEach((e, i) => {
    if (i) doc.moveDown(0.4);
    entry(e.program, e.school, `${e.start} – ${e.end}`);
    if (e.note) meta(e.note);
    if (e.points) bullets(e.points);
  });

  // ---- Certifications ----
  section('Certifications');
  const colW = (width - 18) / 2;
  const half = Math.ceil(certifications.length / 2);
  const certTop = doc.y;
  let certBottom = certTop;
  certifications.forEach((c, i) => {
    if (i === 0 || i === half) doc.y = certTop;
    const colX = left + (i < half ? 0 : colW + 18);
    doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text(`${c.name} — ${c.issuer}`, colX, doc.y, { width: colW });
    doc.y += 2;
    certBottom = Math.max(certBottom, doc.y);
  });
  doc.y = certBottom;

  // ---- Skills ----
  section('Skills');
  const labelW = 112;
  for (const group of skills) {
    const rowY = doc.y;
    doc.font('Helvetica-Bold').fontSize(9).fillColor(INK).text(group.group, left, rowY, { width: labelW });
    doc.font('Helvetica').fontSize(9).fillColor(BODY).text(group.items.join(' · '), left + labelW, rowY, {
      width: width - labelW,
    });
    doc.y = Math.max(doc.y, rowY) + 3;
  }

  // ---- Footer ----
  doc.moveDown(0.8);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text('References available on request.', left, doc.y, {
    width,
  });

  // Page numbers
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    // Writing inside the bottom margin would otherwise spill onto a new page.
    const keep = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    doc.font('Helvetica').fontSize(8).fillColor(MUTED).text(
      `${profile.name}   ·   Page ${i + 1} of ${range.count}`,
      left,
      doc.page.height - 34,
      { width, align: 'center', lineBreak: false },
    );
    doc.page.margins.bottom = keep;
  }

  doc.end();
  await new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
  console.log(`Wrote ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
