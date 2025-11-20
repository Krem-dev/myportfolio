'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw, Heart, X, Quote } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (icon: any) => void;
}

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "The function of good software is to make the complex appear simple.", author: "Grady Booch" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentQuote((p) => (p + 1) % quotes.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: 1, name: 'About Me', icon: '👤', path: '/About Me', tooltip: 'Learn about my background' },
    { id: 2, name: 'Projects', icon: '💼', path: '/Projects', tooltip: 'View my portfolio' },
    { id: 3, name: 'Skills', icon: '🚀', path: '/Skills', tooltip: 'See my technical skills' },
    { id: 4, name: 'Experience', icon: '⭐', path: '/Experience', tooltip: 'Check my work history' },
    { id: 5, name: 'Education', icon: '🎓', path: '/Education', tooltip: 'View my education' },
    { id: 6, name: 'Contact', icon: '📧', path: '/Contact', tooltip: 'Get in touch' },
    { id: 7, name: 'Resume', icon: '📄', path: '/Resume.pdf', tooltip: 'Download my resume' },
    { id: 8, name: 'GitHub', icon: '🐙', path: 'https://github.com', tooltip: 'Visit my GitHub' },
    { id: 9, name: 'LinkedIn', icon: '💼', path: 'https://linkedin.com', tooltip: 'Connect on LinkedIn' },
    { id: 10, name: 'Portfolio', icon: '🎨', path: '/Projects', tooltip: 'Browse my work' },
    { id: 11, name: 'Blog', icon: '📝', path: '/Blog', tooltip: 'Read my articles' },
    { id: 12, name: 'Certificates', icon: '🏆', path: '/Education', tooltip: 'View certifications' },
  ];

  const recommended = [
    { id: 1, name: 'Resume_2024.pdf', icon: '📄', time: 'Just now' },
    { id: 2, name: 'Portfolio_Project', icon: '📁', time: '2 hours ago' },
    { id: 3, name: 'Meeting_Notes.docx', icon: '📘', time: 'Yesterday' },
    { id: 4, name: 'Design_Mockup.fig', icon: '🎨', time: '2 days ago' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Blur background */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      />

      {/* WINDOWS 11 START MENU */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          fixed bottom-14 left-4 md:left-6 z-50
          w-[calc(100vw-2rem)] md:w-[580px]
          h-[calc(100vh-8rem)] md:h-[720px]
          max-h-[720px]
          bg-white/95 backdrop-blur-2xl
          border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.15)]
          rounded-xl overflow-hidden 
          flex flex-col
        "
      >
        {/* Search */}
        <div className="px-7 pt-7 pb-5">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search for apps, settings, and documents"
              className="
                w-full py-3 pl-12 pr-4
                bg-gray-50
                border border-gray-200
                rounded-lg shadow-sm
                text-sm text-gray-900 placeholder-gray-500
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                transition-all
              "
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-7 pb-6">

          {/* Pinned Apps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-gray-900">Pinned</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                All apps <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    if (app.path.startsWith('http')) {
                      window.open(app.path, '_blank');
                    } else {
                      onOpenWindow({ id: app.id, name: app.name, type: 'folder', path: app.path });
                      onClose();
                    }
                  }}
                  title={app.tooltip}
                  className="
                    group flex flex-col items-center justify-center gap-2
                    p-3 rounded-lg
                    hover:bg-gray-100
                    transition-all duration-150
                  "
                >
                  <div className="text-3xl">
                    {app.icon}
                  </div>
                  <span className="text-[10px] text-gray-700 text-center leading-tight font-medium">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="h-32"></div>

          {/* Quick Links */}
          <div className="mb-10 border-t border-gray-200 pt-12">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">📧</span>
                <span className="text-sm text-gray-700 font-medium">Email Me</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">📄</span>
                <span className="text-sm text-gray-700 font-medium">Resume</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">💼</span>
                <span className="text-sm text-gray-700 font-medium">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">🐙</span>
                <span className="text-sm text-gray-700 font-medium">GitHub</span>
              </a>
            </div>
          </div>

          {/* Quote Slider - At Bottom - Bigger */}
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 relative overflow-hidden min-h-[140px] flex flex-col justify-center">
              <Quote className="absolute top-4 right-4 text-blue-200" size={48} />
              <div className="relative">
                <p className="text-gray-800 text-base leading-relaxed mb-4 pr-12">
                  {quotes[currentQuote].text}
                </p>
                <p className="text-gray-600 text-sm font-medium">
                  — {quotes[currentQuote].author}
                </p>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuote(idx)}
                    className={`
                      h-2 rounded-full transition-all
                      ${idx === currentQuote ? "w-10 bg-blue-500" : "w-2 bg-gray-300 hover:bg-gray-400"}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="
          border-t border-gray-200 bg-gray-50
          px-7 py-4 flex items-center justify-between
        ">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white">
              JD
            </div>
            <span className="text-sm font-medium text-gray-900">John Doe</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.location.reload()}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw size={18} className="text-gray-700" />
            </button>

            <button
              onClick={() => window.open('mailto:your.email@example.com?subject=Recommendation')}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition"
              title="Recommend"
            >
              <Heart size={18} className="text-gray-700" />
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition"
              title="Power"
            >
              <X size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
