'use client';

import { useState, useRef, useEffect } from 'react';
import { Folder, FileText, Mail, Code, User, Briefcase } from 'lucide-react';

interface DesktopIconProps {
  name: string;
  type: 'folder' | 'file';
  onDoubleClick: () => void;
}

const iconMap: Record<string, any> = {
  'About Me': User,
  'Projects': Code,
  'Skills': FileText,
  'Experience': Briefcase,
  'Contact': Mail,
  'Resume.pdf': FileText,
};

export default function DesktopIcon({ name, type, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const lastClickTime = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    
    console.log('Icon clicked:', name, 'Time since last click:', timeSinceLastClick);
    
    if (timeSinceLastClick < 500 && timeSinceLastClick > 0) {
      console.log('Double click detected for:', name);
      onDoubleClick();
      lastClickTime.current = 0;
    } else {
      setIsSelected(!isSelected);
      lastClickTime.current = now;
    }
  };

  const IconComponent = iconMap[name] || (type === 'folder' ? Folder : FileText);

  const tooltips: Record<string, string> = {
    'About Me': 'Double-click to open - Learn about my background',
    'Projects': 'Double-click to open - View my portfolio',
    'Skills': 'Double-click to open - See my technical skills',
    'Experience': 'Double-click to open - Check my work history',
    'Contact': 'Double-click to open - Get in touch',
    'Resume.pdf': 'Double-click to open - Download my resume',
  };

  return (
    <div
      className={`flex flex-col items-center gap-1 p-2 rounded cursor-pointer select-none transition-all ${
        isSelected ? 'bg-blue-400 bg-opacity-40 border border-blue-300' : 'hover:bg-white hover:bg-opacity-20'
      }`}
      onClick={handleClick}
      title={tooltips[name] || `Open ${name}`}
    >
      <div className="relative">
        {type === 'folder' ? (
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
              <path d="M4 12 L4 52 L60 52 L60 20 L28 20 L24 12 Z" fill="#FFC107" stroke="#FFA000" strokeWidth="1"/>
              <path d="M4 12 L4 20 L60 20 L60 20 L28 20 L24 12 Z" fill="#FFD54F"/>
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
              <rect x="12" y="8" width="40" height="48" fill="white" stroke="#666" strokeWidth="1"/>
              <rect x="12" y="8" width="40" height="8" fill="#0078d4"/>
              <line x1="18" y1="22" x2="46" y2="22" stroke="#ccc" strokeWidth="2"/>
              <line x1="18" y1="28" x2="46" y2="28" stroke="#ccc" strokeWidth="2"/>
              <line x1="18" y1="34" x2="46" y2="34" stroke="#ccc" strokeWidth="2"/>
              <line x1="18" y1="40" x2="38" y2="40" stroke="#ccc" strokeWidth="2"/>
            </svg>
          </div>
        )}
      </div>
      <span className={`text-xs text-center font-medium max-w-20 break-words px-1 py-0.5 rounded ${
        isSelected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
      }`}>
        {name}
      </span>
    </div>
  );
}
