'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 50;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + (100 / steps);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-12">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-24 h-24"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.rect
            x="10"
            y="10"
            width="35"
            height="35"
            fill="#0078d4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          <motion.rect
            x="55"
            y="10"
            width="35"
            height="35"
            fill="#0078d4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.rect
            x="10"
            y="55"
            width="35"
            height="35"
            fill="#0078d4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.rect
            x="55"
            y="55"
            width="35"
            height="35"
            fill="#0078d4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.svg>

        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-sm"
          >
            {progress < 100 ? 'Loading...' : 'Ready'}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
