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

  if (!isOpen) return null;

  return (
    <>
      {/* Blur background */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity"
      />

      {/* WINDOWS 11 START MENU */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          animate-slide-up
          fixed bottom-14 left-4 md:left-6 z-50
          w-[calc(100vw-2rem)] md:w-[640px]
          h-[calc(100vh-8rem)] md:h-[720px]
          max-h-[720px]
          bg-white/85 backdrop-blur-xl
          border border-white/20 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_50px_-12px_rgba(0,0,0,0.2)]
          rounded-xl overflow-hidden 
          flex flex-col
        "
      >
        {/* Search */}
        <div className="px-6 pt-6 pb-4">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              placeholder="Search for apps, settings, and documents"
              className="
                w-full py-2.5 pl-12 pr-4
                bg-[#f3f3f3]
                border-b-2 border-transparent focus:border-blue-500
                rounded-full
                text-sm text-gray-900 placeholder-gray-500
                focus:outline-none focus:bg-white
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6">

          {/* Pinned Apps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-bold text-gray-900 tracking-wide">Pinned</h3>
              <button className="
                px-2 py-1 rounded hover:bg-gray-100
                text-xs text-gray-600 hover:text-gray-900 font-medium 
                flex items-center gap-1 transition-colors
              ">
                All apps <span>›</span>
              </button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
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
                    group flex flex-col items-center gap-2
                    p-2 rounded-md
                    hover:bg-white/60 hover:shadow-sm active:scale-95
                    transition-all duration-150
                  "
                >
                  <div className="text-3xl p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                    {app.icon}
                  </div>
                  <span className="text-[11px] text-gray-700 text-center font-medium line-clamp-1 w-full">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended / Quick Links */}
          <div className="mb-6">
             <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-bold text-gray-900 tracking-wide">Recommended</h3>
              <button className="
                px-2 py-1 rounded hover:bg-gray-100
                text-xs text-gray-600 hover:text-gray-900 font-medium 
                flex items-center gap-1 transition-colors
              ">
                More <span>›</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="mailto:your.email@example.com" className="
                flex items-center gap-3 p-2 rounded-md 
                hover:bg-gray-100 group transition-colors
              ">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full">
                  📧
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-black">Email Me</span>
                  <span className="text-xs text-gray-500">Get in touch directly</span>
                </div>
              </a>

              <a href="/Resume.pdf" target="_blank" className="
                flex items-center gap-3 p-2 rounded-md 
                hover:bg-gray-100 group transition-colors
              ">
                <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-600 rounded-full">
                  📄
                </div>
                 <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-black">Resume.pdf</span>
                  <span className="text-xs text-gray-500">Professional background</span>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" className="
                flex items-center gap-3 p-2 rounded-md 
                hover:bg-gray-100 group transition-colors
              ">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-[#0077b5] rounded-full">
                  💼
                </div>
                 <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-black">LinkedIn</span>
                  <span className="text-xs text-gray-500">Connect professionally</span>
                </div>
              </a>

              <a href="https://github.com" target="_blank" className="
                flex items-center gap-3 p-2 rounded-md 
                hover:bg-gray-100 group transition-colors
              ">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-900 rounded-full">
                  🐙
                </div>
                 <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-black">GitHub</span>
                  <span className="text-xs text-gray-500">View source code</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quote Slider */}
          <div className="mt-auto">
            <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border border-blue-100/50 rounded-xl p-6 relative overflow-hidden">
              <div className="flex gap-4">
                <div className="text-blue-300 mt-1">
                   <Quote size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 font-medium italic">
                    "{quotes[currentQuote].text}"
                  </p>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    — {quotes[currentQuote].author}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-1.5 mt-3">
                {quotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuote(idx)}
                    className={`
                      h-1.5 rounded-full transition-all duration-300
                      ${idx === currentQuote ? "w-6 bg-blue-400" : "w-1.5 bg-gray-200 hover:bg-gray-300"}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="
          border-t border-gray-200/60 bg-gray-50/50 backdrop-blur-sm
          px-6 md:px-8 py-4 flex items-center justify-between
        ">
          <div className="flex items-center gap-3 hover:bg-white/50 p-1.5 -ml-1.5 rounded-md transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              JD
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-semibold text-gray-900">John Doe</span>
               <span className="text-[10px] text-gray-500">Pro User</span>
            </div>
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
