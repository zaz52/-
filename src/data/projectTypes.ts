import type { LucideIcon } from 'lucide-react';

export type ProjectIconKey = 'cloud' | 'fileText' | 'heartPulse' | 'presentation' | 'sparkles';

export type ProjectPalette = 'blue' | 'orange' | 'mint' | 'emerald' | 'cyan' | 'violet';

export type ProjectRecord = {
  id: string;
  iconKey: ProjectIconKey;
  name: string;
  type: string;
  description: string;
  href: string;
  cover: string;
  tags: string[];
  palette: ProjectPalette;
  featured?: boolean;
};

export type ProjectView = ProjectRecord & {
  icon: LucideIcon;
};
