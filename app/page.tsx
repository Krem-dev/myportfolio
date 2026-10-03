'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from '@/components/bootScreen';
import Desktop from '@/components/desktop';

type Phase = 'checking' | 'booting' | 'ready';

const noopSubscribe = () => () => {};

/** Show the boot animation once per browser session, and never with reduced motion. */
function readInitialPhase(): Phase {
  let booted = false;
  try {
    booted = sessionStorage.getItem('booted') === '1';
  } catch {}
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return booted || reducedMotion ? 'ready' : 'booting';
}

export default function Home() {
  const initialPhase = useSyncExternalStore<Phase>(noopSubscribe, readInitialPhase, () => 'checking');
  const [bootDone, setBootDone] = useState(false);
  const phase: Phase = bootDone ? 'ready' : initialPhase;

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('booted', '1');
    } catch {}
    setBootDone(true);
  }, []);

  return (
    <>
      {phase !== 'checking' && <Desktop />}
      <AnimatePresence>{phase === 'booting' && <BootScreen key="boot" onComplete={finishBoot} />}</AnimatePresence>
    </>
  );
}
