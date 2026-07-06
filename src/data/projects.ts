import { Cloud, FileText, HeartPulse, Presentation } from 'lucide-react';

export const projects = [
  {
    icon: FileText,
    name: '魔方简历',
    type: 'AI 简历编辑器',
    description: 'AI 驱动的在线简历编辑器，强调免费与隐私优先。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    tags: ['AI', 'Resume', 'Productivity'],
    palette: 'blue',
  },
  {
    icon: Presentation,
    name: 'PPT Master',
    type: 'AI 文档工具',
    description: 'AI 一键生成可编辑 PPTX，关注原生动画与排版。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    tags: ['AI', 'PPTX', 'Presentation'],
    palette: 'orange',
  },
  {
    icon: HeartPulse,
    name: '老年健康',
    type: '健康资讯平台',
    description: '面向长辈健康关怀的信息平台，强调移动端可读性。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    tags: ['Health', 'Mobile', 'Content'],
    palette: 'mint',
  },
  {
    icon: Cloud,
    name: '虚拟资料库',
    type: '资源整理入口',
    description: '学习资源、工具与素材的整理入口。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    tags: ['Resource', 'Collection'],
    palette: 'cyan',
  },
];
