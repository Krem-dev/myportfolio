export interface WindowState {
  id: string;
  title: string;
  type: 'folder' | 'file' | 'app';
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content?: string;
}

export interface DesktopIcon {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: string;
  path: string;
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileSystemItem[];
  content?: string;
}
