import { Github, Mail, MessageCircle, Sparkles } from 'lucide-react';
import contacts from './contacts.json';

const icons = {
  mail: Mail,
  github: Github,
  sparkles: Sparkles,
  message: MessageCircle,
} as const;

export interface SiteContact {
  icon: keyof typeof icons;
  label: string;
  value: string;
  href?: string;
}

/**
 * 网站联系方式：改 src/data/contacts.json 即可（GitHub 网页上直接编辑也行），
 * 提交后 Netlify / Worker 自动重新部署生效。
 * icon 取值：mail | github | sparkles | message
 */
export const defaultContacts = (contacts as SiteContact[]).map((c) => ({
  ...c,
  icon: icons[c.icon] ?? MessageCircle,
}));
