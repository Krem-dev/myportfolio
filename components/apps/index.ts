import type { ComponentType } from 'react';
import type { AppId } from '@/types';
import About from './about';
import Projects from './projects';
import Skills from './skills';
import Experience from './experience';
import Contact from './contact';
import Resume from './resume';

export const appComponents: Record<AppId, ComponentType> = {
  about: About,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  contact: Contact,
  resume: Resume,
};
