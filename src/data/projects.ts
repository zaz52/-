import { Cloud, FileText, HeartPulse, Presentation, Sparkles } from 'lucide-react';
import type { ProjectIconKey, ProjectRecord } from './projectTypes';

export const projectIcons = {
  cloud: Cloud,
  fileText: FileText,
  heartPulse: HeartPulse,
  presentation: Presentation,
  sparkles: Sparkles,
} satisfies Record<ProjectIconKey, typeof Cloud>;

export const defaultProjects: ProjectRecord[] = [
  {
    id: 'magic-resume',
    iconKey: 'fileText',
    name: '魔方简历',
    type: 'AI 简历编辑器',
    description: 'AI 驱动的在线简历编辑器，强调免费与隐私优先。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    cover: '/covers/magic-resume.png',
    tags: ['AI', 'Resume', 'Productivity'],
    palette: 'blue',
    featured: true,
  },
  {
    id: 'ppt-master',
    iconKey: 'presentation',
    name: 'PPT Master',
    type: 'AI 文档工具',
    description: 'AI 一键生成可编辑 PPTX，关注原生动画与排版。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    cover: '/covers/ppt-master.svg',
    tags: ['AI', 'PPTX', 'Presentation'],
    palette: 'orange',
  },
  {
    id: 'elder-health',
    iconKey: 'heartPulse',
    name: '老年健康',
    type: '健康资讯平台',
    description: '面向长辈健康关怀的信息平台，强调移动端可读性。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    cover: '/covers/elder-health.png',
    tags: ['Health', 'Mobile', 'Content'],
    palette: 'mint',
  },
  {
    id: 'yulesuangua',
    iconKey: 'sparkles',
    name: '乾坤之道',
    type: 'AI + 周易工具',
    description: '把传统卦象与 AI 解读结合，提供更具仪式感的在线问事体验。',
    href: 'https://yulesuangua.pages.dev/',
    cover: '/covers/yulesuangua.svg',
    tags: ['AI', 'Divination', 'Cloudflare'],
    palette: 'emerald',
  },
  {
    id: 'resource-vault',
    iconKey: 'cloud',
    name: '虚拟资料库',
    type: '资源整理入口',
    description: '学习资源、工具与素材的整理入口。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    cover: '/covers/resource-vault.svg',
    tags: ['Resource', 'Collection'],
    palette: 'cyan',
  },
];

export const hydrateProjects = (records: ProjectRecord[]) => records.map((project) => ({
  ...project,
  icon: projectIcons[project.iconKey] ?? Sparkles,
}));

export const projects = hydrateProjects(defaultProjects);
