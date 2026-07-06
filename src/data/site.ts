import {
  Brush,
  Cpu,
  Github,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Sparkles,
  Sprout,
  WandSparkles,
} from 'lucide-react';

export const siteProfile = {
  name: 'Weiyi',
  label: 'Nature Future Youth',
  headlineLines: ['复古科技，', '青春自然。', '用设计连接真实与未来。'],
  intro:
    '我专注于打造兼具自然气息、复古质感与现代交互体验的个人品牌网页、移动端界面和视觉系统。',
  avatar: '/avatar.jpg',
};

export const navItems = [
  { label: '首页', href: '/' },
  { label: '关于', href: '/#about' },
  { label: '作品', href: '/#projects' },
  { label: '全部作品', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: '服务', href: '/#services' },
  { label: '设计系统', href: '/design-system' },
  { label: '联系', href: '/#contact' },
];

export const aboutStats = [
  { value: 6, suffix: '+', label: '项目经验' },
  { value: 120, suffix: '+', label: '设计组件' },
  { value: 30, suffix: '+', label: '创意练习' },
  { value: 100, suffix: '%', label: '关注体验' },
];

export const services = [
  {
    icon: MonitorSmartphone,
    title: '个人品牌网页设计',
    description: '从首屏叙事、作品展示到联系转化，构建完整个人品牌表达。',
    tags: ['Web', 'Brand', 'Story'],
  },
  {
    icon: Sprout,
    title: '移动端 UI 设计',
    description: '为内容、工具和轻产品设计清晰、亲和、适合触摸的移动体验。',
    tags: ['Mobile', 'UX', 'Responsive'],
  },
  {
    icon: Palette,
    title: '界面视觉系统',
    description: '沉淀颜色、字体、卡片、按钮和图标规范，让页面持续统一。',
    tags: ['System', 'Token', 'UI Kit'],
  },
  {
    icon: WandSparkles,
    title: '动效与交互设计',
    description: '用轻量滚动、入场和 hover 动效提升节奏，不干扰内容阅读。',
    tags: ['Motion', 'Scroll', 'Hover'],
  },
  {
    icon: Brush,
    title: '自然风格视觉探索',
    description: '把纸张、植物、柔光和留白带入数字界面，降低冷硬感。',
    tags: ['Nature', 'Cream', 'Soft'],
  },
  {
    icon: Cpu,
    title: '复古科技风格设计',
    description: '融合 CRT、扫描线、老设备和现代组件，形成记忆点。',
    tags: ['Retro', 'Tech', 'CRT'],
  },
];

export const contacts = [
  { icon: Mail, label: 'Email', value: '1845779520@qq.com', href: 'mailto:1845779520@qq.com' },
  { icon: Github, label: 'GitHub', value: 'github.com/zaz52', href: 'https://github.com/zaz52' },
  { icon: Sparkles, label: 'X', value: '@Weiyi_Learn', href: 'https://x.com/Weiyi_Learn' },
  { icon: MessageCircle, label: '微信', value: 'Z3_March', href: 'weixin://' },
];
