# Isaac Yaw Amponsah: Portfolio

A Windows 11-style portfolio built with Next.js and Fluent UI v9. Visitors land on a desktop with the About window already open; on phones it becomes a home screen and apps open full-screen.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All text lives in [`data/profile.ts`](data/profile.ts): name, bio, projects, experience, education, certifications, skills and links. Every window reads from it, so update it once and the whole site (including the printable résumé) follows.

Optional extras:

- **Photo:** add a square image at `public/avatar.jpg` and set `photo: '/avatar.jpg'`.
- **Résumé PDF:** add `public/resume.pdf` and set `resumePdf: '/resume.pdf'` to show a Download button. Leave references and phone numbers out of the public copy.
- **Contact form delivery:** create a form at [formspree.io](https://formspree.io) and set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`. Without it, the form opens the visitor's email app with the message pre-filled.

## Structure

| Path | What it is |
| --- | --- |
| `components/desktop.tsx` | Desktop, phone home screen and window layer |
| `components/window.tsx` | Window frame: drag, resize, minimize, maximize |
| `components/taskbar.tsx`, `startMenu.tsx` | Taskbar and searchable Start menu |
| `components/apps/` | The content of each window |
| `components/appMeta.tsx` | App list: titles, icons, default sizes |
| `store/` | Window manager and theme state (Zustand) |
