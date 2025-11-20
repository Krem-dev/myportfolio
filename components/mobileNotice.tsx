'use client';

import { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

export default function MobileNotice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || isDismissed) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-md mx-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 flex items-start gap-3">
        <Monitor className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            Best viewed in Desktop Mode
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            This portfolio is designed as a Windows desktop experience. 
            For the best experience, enable Desktop Mode in your browser or view on a desktop device.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Double-click icons to open windows
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
