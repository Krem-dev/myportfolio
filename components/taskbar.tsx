'use client';

import { useState, useEffect } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { Volume2, Wifi } from 'lucide-react';
import StartMenu from './startMenu';

interface TaskbarProps {
  onOpenWindow: (icon: any) => void;
}

export default function Taskbar({ onOpenWindow }: TaskbarProps) {
  const { windows, restoreWindow, minimizeWindow } = useWindowStore();
  const [time, setTime] = useState('');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = windows.filter((w) => !w.isMinimized);

  const handleWindowClick = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (window?.isMinimized) {
      restoreWindow(windowId);
    } else {
      minimizeWindow(windowId);
    }
  };

  return (
    <>
      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={onOpenWindow}
      />
      
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-t border-gray-700 flex items-center px-1 gap-1 z-40">
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="hover:bg-gray-700 p-2 transition-colors flex items-center justify-center w-12 h-full" 
          title="Start Menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <rect x="3" y="3" width="8" height="8"/>
            <rect x="13" y="3" width="8" height="8"/>
            <rect x="3" y="13" width="8" height="8"/>
            <rect x="13" y="13" width="8" height="8"/>
          </svg>
        </button>

      <div className="h-6 w-px bg-gray-700 mx-1"></div>

      <div className="flex-1 flex gap-1 items-center overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => handleWindowClick(window.id)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 h-8 text-xs transition-colors border-b-2 border-blue-500 min-w-32 max-w-48 truncate"
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 text-white text-xs h-full">
        <button className="hover:bg-gray-700 p-2 h-full transition-colors">
          <Wifi size={16} />
        </button>
        <button className="hover:bg-gray-700 p-2 h-full transition-colors">
          <Volume2 size={16} />
        </button>
        <button className="hover:bg-gray-700 px-3 h-full transition-colors flex items-center gap-2">
          <span>{time}</span>
        </button>
      </div>
    </div>
    </>
  );
}
