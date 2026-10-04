'use client';

import { useCallback, useState } from 'react';
import {
  Badge,
  Body1,
  Button,
  Caption1,
  Field,
  Input,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Spinner,
  Textarea,
  Tooltip,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BookOpenColor,
  CheckmarkRegular,
  CopyRegular,
  LocationRippleColor,
  MailColor,
  OpenRegular,
  PhoneColor,
  SendRegular,
} from '@fluentui/react-icons';
import { links, profile } from '@/data/profile';
import { GitHubIcon, LinkedInIcon } from '../brandIcons';
import { PANE_SMALL } from '../ui/breakpoints';
import { CardGroup, Page, Section, SettingCard, Surface } from '../ui/win';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXL}`,
    [PANE_SMALL]: { padding: tokens.spacingHorizontalL },
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalL,
    [PANE_SMALL]: { gridTemplateColumns: '1fr' },
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  hint: { color: tokens.colorNeutralForeground3 },
  intro: {
    display: 'flex',
    // Fluent's Card is a column by default — say row explicitly or it wins.
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingHorizontalXL,
  },
  introText: { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '2px' },
  muted: { color: tokens.colorNeutralForeground3 },
});

/** Older fallback for browsers (and embedded views) that refuse the async clipboard. */
function execCommandCopy(value: string): boolean {
  const el = document.createElement('textarea');
  el.value = value;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  try {
    el.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(el);
  }
}

/** Tracks which row was copied — and which failed, so a blocked clipboard isn't silent. */
function useCopy() {
  const [state, setState] = useState<{ key: string; ok: boolean } | null>(null);
  const copy = useCallback(async (key: string, value: string) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = execCommandCopy(value);
    }
    setState({ key, ok });
    setTimeout(() => setState((c) => (c?.key === key ? null : c)), ok ? 2000 : 4000);
  }, []);
  return { state, copy };
}

export default function Contact() {
  const s = useStyles();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  // Why the last send failed: Formspree's own message when it rejected the form, null when the request never got through.
  const [rejection, setRejection] = useState<string | null>(null);
  const { state: copyState, copy } = useCopy();

  const update = (key: keyof typeof form) => (_: unknown, data: { value: string }) =>
    setForm((f) => ({ ...f, [key]: data.value }));

  /** Hands the typed message to the visitor's own email client, fully pre-filled. */
  const openMailClient = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
    setStatus('mailto');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!links.formspreeId) {
      // No form backend configured — the visitor's email client is the only route.
      openMailClient();
      return;
    }

    setStatus('sending');
    setRejection(null);
    try {
      const res = await fetch(`https://formspree.io/f/${links.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
        // A blocked or stalled request shouldn't leave the button spinning forever.
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) {
        const data: { error?: string; errors?: { message?: string }[] } = await res.json().catch(() => ({}));
        setRejection(data.errors?.map((e) => e.message).filter(Boolean).join(' ') || data.error || `Error ${res.status}`);
        setStatus('error');
        return;
      }
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      // Network failure: offline, a work network or browser extension blocking formspree.io, or the timeout above.
      setStatus('error');
    }
  };

  const copyAction = (key: string, value: string) => {
    const done = copyState?.key === key;
    const failed = done && !copyState.ok;
    return (
      <>
        {failed && <Caption1 className={s.hint}>Select the text to copy it</Caption1>}
        <Tooltip content={done && copyState.ok ? 'Copied' : `Copy ${key}`} relationship="label">
          <Button
            size="small"
            appearance="subtle"
            icon={done && copyState.ok ? <CheckmarkRegular /> : <CopyRegular />}
            onClick={() => copy(key, value)}
          />
        </Tooltip>
      </>
    );
  };

  return (
    <Page title="Get in touch" subtitle="Tell me what you're working on and I'll get back to you.">
      <Surface className={s.intro}>
        <MailColor fontSize={48} aria-hidden />
        <div className={s.introText}>
          <Body1>{profile.name}</Body1>
          <Caption1 className={s.muted}>
            {profile.title} · {profile.location} · usually replies within a day or two
          </Caption1>
        </div>
        <Badge appearance="tint" color="success">
          {profile.availability}
        </Badge>
      </Surface>

      <Section title="Send a message">
        <Surface>
          <form className={s.form} onSubmit={submit}>
            {status === 'sent' && (
              <MessageBar intent="success">
                <MessageBarBody>
                  <MessageBarTitle>Message sent</MessageBarTitle>
                  Thanks — I&apos;ll get back to you soon.
                </MessageBarBody>
              </MessageBar>
            )}
            {status === 'mailto' && (
              <MessageBar intent="info">
                <MessageBarBody>
                  <MessageBarTitle>Opening your email app</MessageBarTitle>
                  If nothing opened, email me directly at {links.email}.
                </MessageBarBody>
              </MessageBar>
            )}
            {status === 'error' && (
              <MessageBar intent="error">
                <MessageBarBody>
                  <MessageBarTitle>Couldn&apos;t send</MessageBarTitle>
                  {rejection
                    ? `${rejection}. Fix that and try again, or send it from your own email app.`
                    : 'Your network or a browser extension may be blocking the form. Try again, or send it from your own email app.'}
                </MessageBarBody>
                <MessageBarActions>
                  <Button size="small" onClick={openMailClient}>
                    Email it instead
                  </Button>
                </MessageBarActions>
              </MessageBar>
            )}

            <div className={s.row}>
              <Field label="Name" required>
                <Input value={form.name} onChange={update('name')} autoComplete="name" />
              </Field>
              <Field label="Email" required>
                <Input type="email" value={form.email} onChange={update('email')} autoComplete="email" />
              </Field>
            </div>
            <Field label="Message" required>
              <Textarea value={form.message} onChange={update('message')} rows={6} resize="vertical" />
            </Field>

            <div className={s.actions}>
              <Button
                type="submit"
                appearance="primary"
                disabled={status === 'sending'}
                icon={status === 'sending' ? <Spinner size="tiny" /> : <SendRegular />}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
              {!links.formspreeId && (
                <Caption1 className={s.hint}>This opens your own email app with the message ready to send.</Caption1>
              )}
            </div>
          </form>
        </Surface>
      </Section>

      <Section title="Contact details">
        <CardGroup>
          <SettingCard
            icon={<MailColor fontSize={24} />}
            title="Email"
            description={links.email}
            action={copyAction('email', links.email)}
          />
          <SettingCard
            icon={<PhoneColor fontSize={24} />}
            title="Phone"
            description={links.phone}
            action={copyAction('phone', links.phone)}
          />
          <SettingCard
            icon={<LocationRippleColor fontSize={24} />}
            title="Location"
            description={profile.location}
          />
        </CardGroup>
      </Section>

      <Section title="Elsewhere">
        <CardGroup>
          <SettingCard
            icon={<LinkedInIcon size={24} />}
            title="LinkedIn"
            description="linkedin.com/in/isaac-amponsah"
            action={<OpenRegular />}
            href={links.linkedin}
          />
          <SettingCard
            icon={<GitHubIcon size={24} />}
            title="GitHub"
            description="github.com/Krem-dev"
            action={<OpenRegular />}
            href={links.github}
          />
          <SettingCard
            icon={<BookOpenColor fontSize={24} />}
            title="Blog"
            description="kremlin.hashnode.dev"
            action={<OpenRegular />}
            href={links.blog}
          />
        </CardGroup>
      </Section>
    </Page>
  );
}
