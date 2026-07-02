import {
  Bot,
  BrainCircuit,
  Cloud,
  FileText,
  Github,
  HeartPulse,
  Mail,
  MessageCircle,
  MoonStar,
  Presentation,
  Send,
  Sparkles,
  Twitter,
} from 'lucide-react';

export const profile = {
  name: 'Weiyi',
  role: 'AI 工具实践者 / Web 项目构建者',
  headline: '把想法快速做成可以被真实使用的产品',
  summary:
    '我专注用 AI 工作流、前端技术和持续迭代，把学习、工具和内容产品变成可访问的网站。这里不是一张静态名片，而是我的项目现场、方法记录和联系方式入口。',
  avatar: '/avatar.jpg',
  location: 'China / Remote',
};

export const stats = [
  { value: '5+', label: '在线作品入口' },
  { value: 'AI+Web', label: '主要方向' },
  { value: '24h', label: '持续迭代节奏' },
];

export const focusAreas = [
  {
    icon: BrainCircuit,
    title: 'AI 工作流',
    description: '把提示词、资料整理、内容生产和自动化工具整合成可复用流程。',
  },
  {
    icon: Bot,
    title: '产品原型',
    description: '快速搭建可访问、可测试、可分享的 Web 原型，而不是停留在想法。',
  },
  {
    icon: Sparkles,
    title: '真实记录',
    description: '公开展示从不会到会、从粗糙到可用的迭代过程。',
  },
];

export const websites = [
  {
    icon: Cloud,
    name: '虚拟资料库',
    description: '学习资源、工具与素材的整理入口。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    icon: MoonStar,
    name: '算卦',
    description: '在线占卜工具，用轻量交互探索自我提问。',
    href: 'https://suanguan.netlify.app/',
    accent: 'from-violet-400 to-fuchsia-500',
  },
  {
    icon: HeartPulse,
    name: '老年健康',
    description: '面向长辈健康关怀的信息平台。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    icon: FileText,
    name: '魔方简历',
    description: 'AI 驱动的在线简历编辑器，强调免费与隐私优先。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    accent: 'from-sky-400 to-indigo-500',
  },
  {
    icon: Presentation,
    name: 'PPT Master',
    description: 'AI 一键生成可编辑 PPTX，关注原生动画与排版。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    accent: 'from-amber-300 to-orange-500',
  },
];

export const projects = [
  {
    title: 'AI 工具矩阵',
    category: 'Product System',
    description:
      '围绕资料整理、简历生成、PPT 生成和轻量内容工具搭建的一组在线入口，目标是把 AI 能力变成普通用户能直接使用的界面。',
    impact: ['统一入口', '可分享链接', '持续扩展'],
    stack: ['React', 'Netlify', 'AI Workflow'],
  },
  {
    title: '健康资讯体验',
    category: 'Public Service',
    description:
      '面向老年健康主题的信息页面，重点是清晰导航、低学习成本和移动端可读性。',
    impact: ['移动优先', '信息分层', '低门槛访问'],
    stack: ['Web App', 'Content Design', 'Responsive UI'],
  },
  {
    title: '个人作品集重构',
    category: 'Portfolio',
    description:
      '从静态名片页升级为作品集系统，使用结构化数据维护内容，强化作品证据、联系方式和可信度。',
    impact: ['数据分离', '高科技视觉', '可部署构建'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

export const process = [
  '先把想法做成最小可用版本，让真实页面尽快上线。',
  '用用户能理解的语言重写功能价值，而不是只堆技术词。',
  '通过截图、链接、数据和迭代记录建立信任。',
  '持续复盘，把每个项目沉淀成下一次构建的素材。',
];

export const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: '1845779520@qq.com',
    href: 'mailto:1845779520@qq.com',
    action: '发送邮件',
  },
  {
    icon: MessageCircle,
    label: 'WeChat',
    value: 'Z3_March',
    href: 'weixin://',
    action: '搜索微信号',
  },
  {
    icon: Twitter,
    label: 'X',
    value: '@Weiyi_Learn',
    href: 'https://x.com/Weiyi_Learn',
    action: '关注动态',
  },
  {
    icon: MessageCircle,
    label: 'QQ',
    value: '1845779520',
    href: 'https://wpa.qq.com/msgrd?v=3&uin=1845779520&site=qq&menu=yes',
    action: '打开聊天',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@Weiyiusername',
    href: 'https://t.me/Weiyiusername',
    action: '发送消息',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/zaz52',
    href: 'https://github.com/zaz52',
    action: '查看代码',
  },
];
