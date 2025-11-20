'use client';

import { useState, useEffect } from 'react';

interface DesktopHeroProps {
  onOpenWindow: (icon: any) => void;
}

export default function DesktopHero({ onOpenWindow }: DesktopHeroProps) {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    { name: 'E-Commerce', tech: 'React, Node.js', icon: '' },
    { name: 'Task Manager', tech: 'Next.js', icon: '' },
    { name: 'Analytics', tech: 'Vue.js', icon: '' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-end md:items-center justify-center p-4 md:p-10 pointer-events-none overflow-y-auto md:overflow-hidden">
      <div className="w-full max-w-sm md:max-w-3xl space-y-3 md:space-y-8 pointer-events-auto" style={{ marginBottom: '93px' }}>

        {/* -------- PROFILE CARD ---------- */}
        <div className="
          bg-white border border-gray-200 
          rounded-xl shadow-sm p-4 md:p-8
          flex flex-col md:flex-row items-center gap-4 md:gap-8
        ">
          
          {/* Avatar - Add your image here */}
          <div className="
            w-16 h-16 md:w-24 md:h-24 rounded-lg bg-gray-200 
            flex items-center justify-center
            overflow-hidden flex-shrink-0
          ">
            {/* <img src="/your-image.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              John Doe
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Full Stack Developer
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mt-3 md:mt-5">
              <button
                onClick={() =>
                  onOpenWindow({ id: 'projects', name: 'Projects', type: 'folder', path: '/Projects' })
                }
                title="Browse my portfolio projects"
                className="
                  px-4 py-2.5 rounded-md text-sm font-medium
                  bg-gray-900 text-white 
                  hover:bg-black transition
                "
              >
                View Projects
              </button>

              <button
                onClick={() =>
                  onOpenWindow({ id: 'contact', name: 'Contact', type: 'folder', path: '/Contact' })
                }
                title="Get in touch with me"
                className="
                  px-4 py-2.5 rounded-md text-sm font-medium
                  border border-gray-300 text-gray-700
                  hover:bg-gray-50 transition
                "
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* -------- FEATURED PROJECT ---------- */}
        <div className="
          bg-white border border-gray-200 
          rounded-xl shadow-sm p-4 md:p-8
        ">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">
            Featured Project
          </h2>

          <div
            onClick={() =>
              onOpenWindow({ id: 'projects', name: 'Projects', type: 'folder', path: '/Projects' })
            }
            title="Click to view all projects"
            className="
              cursor-pointer flex items-center gap-3 md:gap-5
              p-3 md:p-5 border border-gray-200 rounded-lg
              hover:border-gray-300 bg-gray-50 hover:bg-gray-100 transition
            "
          >
            {/* Project Icon - Add your project image/icon here */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
              {/* <img src="/project-icon.jpg" alt="Project" className="w-full h-full object-cover" /> */}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-xl font-medium text-gray-900 truncate">
                {projects[currentProject].name}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {projects[currentProject].tech}
              </p>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProject(idx)}
                className={`
                  h-2 rounded-full transition-all
                  ${idx === currentProject ? 'w-6 bg-gray-900' : 'w-2 bg-gray-400'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
