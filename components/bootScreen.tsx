'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@fluentui/react-components';
import { profile } from '@/data/profile';
import Monogram from './monogram';

const BOOT_MS = 1100;

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
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
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-10 bg-[#0b1020]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="Loading"
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
      >
        <Monogram size={72} />
        <span className="text-[15px] tracking-wide text-white/80">{profile.name}</span>
      </motion.div>
      <Spinner size="small" appearance="inverted" />
    </motion.div>
  );
}
