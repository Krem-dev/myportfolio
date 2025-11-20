'use client';

import { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronLeft, Home } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileItem[];
  content?: string;
}

interface FileExplorerProps {
  initialPath: string;
  fileSystem: Record<string, FileItem>;
}

export default function FileExplorer({ initialPath, fileSystem }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentItem = fileSystem[currentPath];
  const items = currentItem?.children || [];

  const handleNavigate = (path: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleHome = () => {
    setHistory([initialPath]);
    setHistoryIndex(0);
    setCurrentPath(initialPath);
  };

  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-white border-b border-gray-200 p-1 flex items-center gap-1">
        <button
          onClick={handleBack}
          disabled={historyIndex === 0}
          className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors"
          title="Back"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={handleForward}
          disabled={historyIndex === history.length - 1}
          className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors"
          title="Forward"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={handleHome}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Home"
        >
          <Home size={16} />
        </button>
        
        <div className="flex-1 mx-2 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 flex items-center gap-1 overflow-x-auto">
          <span className="text-gray-500">📁</span>
          <span>This PC</span>
          {pathParts.map((part, idx) => (
            <span key={idx} className="flex items-center">
              <span className="mx-1 text-gray-400">&gt;</span>
              <button
                onClick={() => handleNavigate('/' + pathParts.slice(0, idx + 1).join('/'))}
                className="hover:underline"
              >
                {part}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-white">
        <div className="grid grid-cols-5 gap-3 auto-rows-max">
          {items.map((item) => (
            <div
              key={item.id}
              onDoubleClick={() => item.type === 'folder' && handleNavigate(item.path)}
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-50 cursor-pointer transition-colors group border border-transparent hover:border-blue-200"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {item.type === 'folder' ? (
                  <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow">
                    <path d="M4 12 L4 52 L60 52 L60 20 L28 20 L24 12 Z" fill="#FFC107" stroke="#FFA000" strokeWidth="1"/>
                    <path d="M4 12 L4 20 L60 20 L60 20 L28 20 L24 12 Z" fill="#FFD54F"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow">
                    <rect x="12" y="8" width="40" height="48" fill="white" stroke="#999" strokeWidth="1"/>
                    <rect x="12" y="8" width="40" height="8" fill="#0078d4"/>
                    <line x1="18" y1="22" x2="46" y2="22" stroke="#ddd" strokeWidth="2"/>
                    <line x1="18" y1="28" x2="46" y2="28" stroke="#ddd" strokeWidth="2"/>
                    <line x1="18" y1="34" x2="46" y2="34" stroke="#ddd" strokeWidth="2"/>
                  </svg>
                )}
              </div>
              <span className="text-xs text-center text-gray-800 max-w-20 break-words">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
