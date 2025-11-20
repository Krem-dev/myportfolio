'use client';

import { useState, useEffect } from 'react';
import BootScreen from '@/components/bootScreen';
import Desktop from '@/components/desktop';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('booted');
    if (hasBooted) {
      setBootComplete(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true');
    setBootComplete(true);
  };

  return (
    <>
      {!bootComplete && <BootScreen onComplete={handleBootComplete} />}
      {bootComplete && <Desktop />}
    </>
  );
}
