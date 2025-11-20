'use client';

import { useState, useEffect } from 'react';
import { useWindowStore } from '@/store/windowStore';
import Window from './window';
import DesktopIcon from './desktopIcon';
import Taskbar from './taskbar';
import FileExplorer from './fileExplorer';
import AboutContent from './aboutContent';
import ProjectsContent from './projectsContent';
import SkillsContent from './skillsContent';
import ExperienceContent from './experienceContent';
import EducationContent from './educationContent';
import ContactContent from './contactContent';
import ResumeContent from './resumeContent';
import DesktopHero from './desktopHero';

const fileSystem = {
  '/': {
    id: 'root',
    name: 'This PC',
    type: 'folder' as const,
    path: '/',
    children: [
      {
        id: 'about',
        name: 'About Me',
        type: 'folder' as const,
        path: '/About Me',
        children: [],
      },
      {
        id: 'projects',
        name: 'Projects',
        type: 'folder' as const,
        path: '/Projects',
        children: [
          {
            id: 'project1',
            name: 'Project Alpha',
            type: 'file' as const,
            path: '/Projects/Project Alpha',
          },
          {
            id: 'project2',
            name: 'Project Beta',
            type: 'file' as const,
            path: '/Projects/Project Beta',
          },
        ],
      },
      {
        id: 'skills',
        name: 'Skills',
        type: 'folder' as const,
        path: '/Skills',
        children: [],
      },
      {
        id: 'experience',
        name: 'Experience',
        type: 'folder' as const,
        path: '/Experience',
        children: [],
      },
      {
        id: 'contact',
        name: 'Contact',
        type: 'folder' as const,
        path: '/Contact',
        children: [],
      },
      {
        id: 'resume',
        name: 'Resume.pdf',
        type: 'file' as const,
        path: '/Resume.pdf',
      },
    ],
  },
};

const desktopIcons = [
  { id: 'about', name: 'About Me', type: 'folder' as const, path: '/About Me' },
  { id: 'projects', name: 'Projects', type: 'folder' as const, path: '/Projects' },
  { id: 'skills', name: 'Skills', type: 'folder' as const, path: '/Skills' },
  { id: 'experience', name: 'Experience', type: 'folder' as const, path: '/Experience' },
  { id: 'contact', name: 'Contact', type: 'folder' as const, path: '/Contact' },
  { id: 'resume', name: 'Resume.pdf', type: 'file' as const, path: '/Resume.pdf' },
];

export default function Desktop() {
  const { windows, addWindow } = useWindowStore();
  const [windowCounter, setWindowCounter] = useState(0);

  const handleIconDoubleClick = (icon: (typeof desktopIcons)[0]) => {
    console.log('Icon double clicked:', icon.name);
    const windowId = `window-${Date.now()}-${windowCounter}`;
    setWindowCounter((prev) => prev + 1);

    addWindow({
      id: windowId,
      title: icon.name,
      type: icon.type,
      isMinimized: false,
      isMaximized: false,
      x: 50 + (windowCounter % 5) * 30,
      y: 50 + (windowCounter % 5) * 30,
      width: 800,
      height: 600,
      content: icon.path,
    });
  };

  const getWindowContent = (window: any) => {
    switch (window.content) {
      case '/About Me':
        return <AboutContent />;
      case '/Projects':
        return <ProjectsContent />;
      case '/Skills':
        return <SkillsContent />;
      case '/Experience':
        return <ExperienceContent />;
      case '/Education':
        return <EducationContent />;
      case '/Contact':
        return <ContactContent />;
      case '/Resume.pdf':
        return <ResumeContent />;
      default:
        return <FileExplorer initialPath="/" fileSystem={fileSystem} />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative p-4 grid grid-cols-2 gap-4 w-fit h-[calc(100vh-2.5rem)] content-start z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            name={icon.name}
            type={icon.type}
            onDoubleClick={() => handleIconDoubleClick(icon)}
          />
        ))}
      </div>

      <DesktopHero onOpenWindow={handleIconDoubleClick} />

      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {getWindowContent(window)}
        </Window>
      ))}

      <Taskbar onOpenWindow={handleIconDoubleClick} />
    </div>
  );
}
