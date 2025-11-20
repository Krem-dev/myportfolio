'use client';

import { useRef, useState } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { WindowState } from '@/types';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function Window({ window, children }: WindowProps) {
  const { removeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updateWindow } =
    useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = () => {
    focusWindow(window.id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeWindow(window.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(window.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    
    e.preventDefault();
    setIsDragging(true);
    focusWindow(window.id);
    
    dragStartPos.current = {
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - dragStartPos.current.x;
      const newY = moveEvent.clientY - dragStartPos.current.y;

      updateWindow(window.id, {
        x: Math.max(0, newX),
        y: Math.max(0, newY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    focusWindow(window.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.width;
    const startHeight = window.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      updateWindow(window.id, {
        width: Math.max(400, startWidth + deltaX),
        height: Math.max(300, startHeight + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (window.isMinimized) {
    return null;
  }

  const style = window.isMaximized
    ? { width: '100%', height: 'calc(100vh - 2.5rem)', top: 0, left: 0 }
    : { 
        width: `${window.width}px`, 
        height: `${window.height}px`,
        top: `${window.y}px`,
        left: `${window.x}px`,
      };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white border border-gray-300 shadow-2xl flex flex-col"
      style={{
        ...style,
        zIndex: window.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
        <div 
          className="window-titlebar bg-white text-gray-800 px-3 py-2 flex items-center justify-between cursor-move select-none border-b border-gray-200"
          onMouseDown={handleDragStart}
        >
          <span className="text-sm flex-1">{window.title}</span>
          <div className="flex">
            <button
              onClick={handleMinimize}
              className="hover:bg-gray-200 w-11 h-8 flex items-center justify-center transition-colors"
              title="Minimize"
            >
              <Minus size={14} strokeWidth={1} />
            </button>
            <button
              onClick={handleMaximize}
              className="hover:bg-gray-200 w-11 h-8 flex items-center justify-center transition-colors"
              title={window.isMaximized ? 'Restore' : 'Maximize'}
            >
              <Square size={14} strokeWidth={1} />
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-red-600 hover:text-white w-11 h-8 flex items-center justify-center transition-colors"
              title="Close"
            >
              <X size={14} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>

        {!window.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-gray-400 to-gray-300 cursor-se-resize"
            onMouseDown={handleResizeStart}
          />
        )}
      </div>
  );
}
