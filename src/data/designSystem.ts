import {
  AlertTriangle,
  Bell,
  Bookmark,
  Camera,
  Check,
  ChevronDown,
  Cloud,
  Cpu,
  FlaskConical,
  Heart,
  Home,
  Leaf,
  MessageCircle,
  Palette,
  Search,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';

export const designPrinciples = [
  { icon: Leaf, title: '自然共生', text: '植物、纸张、柔和光感作为情绪底色。' },
  { icon: Cpu, title: '复古科技', text: 'CRT、像素标签、旧设备与新工具并置。' },
  { icon: Sparkles, title: '青春活力', text: '珊瑚橙、青绿和紫蓝点亮关键动作。' },
  { icon: User, title: '简洁易用', text: '控件状态清楚，移动端优先，信息密度可控。' },
];

export const colorTokens = [
  { name: '森林绿', hex: '#176B4F', className: 'bg-[#176B4F]' },
  { name: '松石青', hex: '#2EC4C7', className: 'bg-[#2EC4C7]' },
  { name: '未来蓝', hex: '#6A7BFF', className: 'bg-[#6A7BFF]' },
  { name: '青春橙', hex: '#FF765A', className: 'bg-[#FF765A]' },
  { name: '暖纸米', hex: '#F7EFDF', className: 'bg-[#F7EFDF]' },
  { name: '复古棕', hex: '#8A6F5A', className: 'bg-[#8A6F5A]' },
  { name: '雾灰', hex: '#DAD7CE', className: 'bg-[#DAD7CE]' },
];

export const iconSet = [
  Leaf,
  Cpu,
  FlaskConical,
  Sparkles,
  Camera,
  Heart,
  Bookmark,
  Bell,
  Home,
  Settings,
  Cloud,
  MessageCircle,
];

export const spacingTokens = [4, 8, 12, 16, 20, 24, 32, 48, 64, 96];
export const radiusTokens = [4, 8, 12, 16, 24, 32, 48];

export const mobileScreens = [
  {
    title: '首页',
    eyebrow: 'Home',
    content: '科技自然 青春创造未来',
    image: 'forest',
  },
  {
    title: '发现',
    eyebrow: 'Discover',
    content: '热门话题 / 推荐内容 / 青春灵感',
    image: 'list',
  },
  {
    title: '商品',
    eyebrow: 'Store',
    content: '复古掌机 · 未来版',
    image: 'device',
  },
  {
    title: '个人中心',
    eyebrow: 'Profile',
    content: 'NatureBoy / 作品 / 收藏',
    image: 'profile',
  },
];

export const alerts = [
  { icon: Check, title: '成功', text: '设置已保存', tone: 'success' },
  { icon: AlertTriangle, title: '提醒', text: '资料还可以继续完善', tone: 'warning' },
  { icon: Bell, title: '消息', text: '你有新的项目反馈', tone: 'info' },
];

export const formOptions = ['自然', '科技', '青春', '未来'];
export const searchIcon = Search;
export const chevronIcon = ChevronDown;
export const paletteIcon = Palette;
