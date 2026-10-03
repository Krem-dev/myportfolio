export type AppId = 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'resume';

export interface WindowState {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}
