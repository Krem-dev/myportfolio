'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Caption1, makeStyles, tokens } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';
import { profile } from '@/data/profile';
import UserTile from './userTile';

const BOOT_MS = 1100;

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXXXL,
    // Matches --win-wallpaper in dark mode, so the fade-out has nothing to jump to.
    backgroundColor: '#0b1020',
  },
  mark: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
  },
  name: { color: 'rgb(255 255 255 / 0.8)', letterSpacing: '0.02em' },
});

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const s = useStyles();

  useEffect(() => {
    const timer = setTimeout(onComplete, BOOT_MS);
    const skip = () => onComplete();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={s.root}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="Loading"
    >
      <motion.div
        className={s.mark}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
      >
        <UserTile size={72} />
        <Caption1 className={s.name}>{profile.name}</Caption1>
      </motion.div>
      <Spinner size="small" appearance="inverted" />
    </motion.div>
  );
}
