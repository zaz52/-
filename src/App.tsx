import { useState } from 'react';
import {
  Github,
  ExternalLink,
  Sparkles,
  Mail,
  MessageCircle,
  ArrowUpRight,
  Zap,
  Volume2,
  Palette,
  FolderKanban,
  Send,
} from 'lucide-react';

/* ================= 数据 ================= */

const NAV = [
  { label: '作品', href: '#projects' },
  { label: '设计', href: '#design' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
];

const profile = {
  name: '唯一',
  headline: ['复古科技，', '青春自然。'],
  sub: '用设计连接真实与未来。',
  intro:
    '我是唯一，一个持续探索 AI 工具、个人品牌网站、移动端界面和视觉系统的创作者。喜欢把复古电脑、自然植物、奶油纸张和轻科技动效放进界面里，让作品既有功能，也有记忆点。',
};

const marqueeTags = [
  'React', 'TypeScript', 'AI 工具', 'UI 设计', '动效交互', 'Tailwind CSS',
  'Vite', '开源工具', '移动端体验', '提示词工程', '产品思维', '视觉系统',
];

const projects = [
  {
    name: '乾坤之道', type: '东方术数 + AI 问事平台',
    desc: '融合周易起卦、八字、奇门、六爻与 AI 解读的东方问事工具台，围绕问题、术法和结果生成结构化洞察。',
    href: 'https://suangua.weiyiai.top/',
    tags: ['AI 问卦', '周易', 'Cloudflare'], featured: true,
  },
  {
    name: '魔方简历', type: 'AI 简历编辑器',
    desc: '免费、隐私优先的在线简历编辑器，支持 AI 润色、语法检查、本地数据存储和 PDF / JSON 导出。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    tags: ['AI 简历', '本地存储', '开源工具'], featured: true,
  },
  {
    name: 'PPT Master', type: 'AI 原生 PPTX 生成器',
    desc: '把 PDF、DOCX、URL 或 Markdown 转成真正可编辑的 PowerPoint，保留原生形状、图表、讲稿和模板风格。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    tags: ['AI 文档', 'PPTX', '可编辑'], featured: true,
  },
  {
    name: '银龄守护', type: '长辈健康关怀小程序界面',
    desc: '面向老年健康管理的移动端体验，整合饮水、睡眠、心率、药箱、语音、电台、AI 晨报和报告分析入口。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    tags: ['移动端', '健康关怀', '适老化'], featured: true,
  },
  {
    name: '虚拟资源库', type: '学习资料与素材集合',
    desc: '沉淀学习资源、设计素材、工具文件和项目资料的云端入口，方便集中整理、检索和分享。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    tags: ['资料库', '素材整理', '云端分享'], featured: false,
  },
  {
    name: '壹隅 YI CORNER', type: '个人网站（本站）',
    desc: '本站——基于 React + Tailwind 的个人网站，灵动流体浅色 UI 与 60fps 微交互设计系统。',
    href: 'https://github.com/zaz52/yi-corner',
    tags: ['React', 'Portfolio', 'Motion'], featured: false,
  },
  {
    name: '闲鱼自动回复管理系统', type: 'Python + FastAPI 自动化客服',
    desc: '面向闲鱼平台的自动化客服与虚拟商品流程系统，覆盖消息处理、自动回复、自动发货、评价和商品维护。',
    href: 'https://github.com/zaz52/xianyu-auto-reply',
    tags: ['Python', 'FastAPI', 'Automation'], featured: false,
  },
  {
    name: '闲鱼超级管家', type: '自动化工具二次开发',
    desc: '基于闲鱼自动回复系统的二次开发版本，重点重构前端 UI 和使用体验，让自动化管理工具更现代、更清晰。',
    href: 'https://github.com/zaz52/xianyu-super-butler',
    tags: ['Automation', 'UI', 'Tooling'], featured: false,
  },
  {
    name: '小说工作台', type: 'TypeScript 创作工具',
    desc: '面向小说创作流程的工作台项目，用于沉淀写作、设定、素材和内容生产相关能力。',
    href: 'https://github.com/zaz52/wei-yi',
    tags: ['TypeScript', 'Writing', 'Workbench'], featured: false,
  },
  {
    name: '个人形象顾问 Skill', type: 'Agent 形象升级提示词',
    desc: '用于个人穿搭、眼镜、色彩诊断、发型和形象升级报告的 Agent skill 与提示词集合。',
    href: 'https://github.com/zaz52/personal-style-advisor',
    tags: ['Agent Skill', 'Style', 'Prompt'], featured: false,
  },
  {
    name: 'Agent Reach', type: 'AI Agent 网络信息读取工具',
    desc: '为 AI Agent 提供跨平台读取和搜索能力，覆盖 Twitter、Reddit、YouTube、GitHub、Bilibili、小红书等公开信息源。',
    href: 'https://github.com/zaz52/Agent-Reach',
    tags: ['Agent', 'Search', 'CLI'], featured: false,
  },
  {
    name: 'GeniusFKoai', type: 'Python 实验项目',
    desc: 'GitHub 上沉淀的 Python 项目，用于记录和整理 AI、自动化或实验性代码能力。',
    href: 'https://github.com/zaz52/GeniusFKoai',
    tags: ['Python', 'AI', 'GitHub'], featured: false,
  },
  {
    name: '乾坤之道部署脚本', type: 'Python 部署辅助',
    desc: '围绕乾坤之道项目沉淀的部署与辅助脚本仓库，方便后续维护算卦相关站点和发布流程。',
    href: 'https://github.com/zaz52/yulesuangua-deploy',
    tags: ['Python', 'Deploy'], featured: false,
  },
  {
    name: 'GitHub Pages 作品集备份', type: 'HTML 静态站点备份',
    desc: '早期 GitHub Pages 个人网站仓库，作为个人网站迁移过程中的静态部署备份和历史版本。',
    href: 'https://github.com/zaz52/zaz52.github.io',
    tags: ['HTML', 'Archive'], featured: false,
  },
];

const stats = [
  { value: '14', suffix: '', label: '作品项目' },
  { value: '120', suffix: '+', label: '设计组件' },
  { value: '30', suffix: '+', label: '创意练习' },
  { value: '100', suffix: '%', label: '关注体验' },
];

const contacts = [
  { icon: Mail, label: 'Email', value: '1845779520@qq.com', href: 'mailto:1845779520@qq.com' },
  { icon: Github, label: 'GitHub', value: 'github.com/zaz52', href: 'https://github.com/zaz52' },
  { icon: Sparkles, label: 'X', value: '@Weiyi_Learn', href: 'https://x.com/Weiyi_Learn' },
  { icon: MessageCircle, label: '微信', value: 'Z3_March' },
];

const TABS = [
  { id: 'feel', label: '手感' },
  { id: 'motion', label: '动效' },
  { id: 'rhythm', label: '节奏' },
] as const;

/* ============ AURA 玻璃拟态 ============ */

const glass =
  'bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_8px_32px_rgba(31,38,135,0.08)]';
const glassSoft =
  'bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(31,38,135,0.06)]';

function SectionHead({ icon, zh, en, note }: { icon: React.ReactNode; zh: string; en: string; note: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900">
        <span className="grid size-9 translate-y-1 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200">{icon}</span>
        {zh}
        <span className="text-slate-400 font-bold text-sm tracking-widest">{en}</span>
      </h2>
      <span className={`hidden sm:inline-block rounded-full px-3 py-1 text-xs font-semibold text-slate-500 ${glassSoft}`}>{note}</span>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'feel' | 'motion' | 'rhythm'>('feel');
  const [pressCount, setPressCount] = useState(0);
  const [isBeating, setIsBeating] = useState(true);
  const activeTabIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="min-h-screen text-slate-900 font-sans pb-24 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden scroll-smooth">
      {/* 动效关键帧 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 26s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-floaty { animation: floaty 6s ease-in-out infinite; }
        @keyframes equalizer {
          0%, 100% { height: 6px; }
          50% { height: 26px; }
        }
        .animate-eq-1 { animation: equalizer 1.1s ease-in-out infinite; }
        .animate-eq-2 { animation: equalizer 0.8s ease-in-out infinite 0.2s; }
        .animate-eq-3 { animation: equalizer 1.4s ease-in-out infinite 0.4s; }
        .animate-eq-4 { animation: equalizer 0.9s ease-in-out infinite 0.1s; }
        .animate-eq-5 { animation: equalizer 1.2s ease-in-out infinite 0.3s; }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .flow-border { position: relative; }
        .flow-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 26px;
          padding: 2px;
          background: linear-gradient(115deg, #4F46E5, #22d3ee, #a78bfa, #f472b6, #4F46E5);
          background-size: 280% 280%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          animation: border-flow 3.5s linear infinite;
          pointer-events: none;
        }
        .flow-border:hover::before { opacity: 1; }
      `}</style>

      {/* 粉彩渐变网格背景 */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F4F2FD]">
        <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-violet-300/50 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-pink-200/60 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-[-10%] left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-200/50 blur-3xl animate-pulse" style={{ animationDelay: '2.1s' }} />
        <div className="absolute top-[55%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      {/* 悬浮玻璃胶囊导航 */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className={`flex items-center gap-1 sm:gap-2 rounded-full pl-4 pr-2 py-2 ${glass}`}>
          <a href="#top" className="flex items-center gap-2.5 font-bold text-base tracking-tight mr-1 sm:mr-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-sm shadow-md shadow-indigo-200">隅</span>
            <span className="hidden md:inline">壹隅 / YI CORNER</span>
            <span className="md:hidden">壹隅</span>
          </a>
          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm font-semibold text-slate-600">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3 sm:px-4 py-2 transition-all hover:bg-white/70 hover:text-indigo-600 hover:shadow-sm"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="ml-1 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            联系我
          </a>
        </div>
      </header>

      <main id="top" className="max-w-5xl mx-auto px-4 pt-32 space-y-12 relative z-10">
        {/* Hero：居中玻璃 */}
        <section className="text-center relative">
          {/* 悬浮小标签（桌面端） */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <span className={`absolute left-[4%] top-20 rounded-full px-4 py-2 text-xs font-bold text-indigo-700 animate-floaty ${glassSoft}`}>⚡ 60fps 微交互</span>
            <span className={`absolute right-[5%] top-36 rounded-full px-4 py-2 text-xs font-bold text-violet-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '1.5s' }}>🎨 玻璃拟态</span>
            <span className={`absolute left-[7%] bottom-28 rounded-full px-4 py-2 text-xs font-bold text-fuchsia-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '3s' }}>⚛️ React 驱动</span>
            <span className={`absolute right-[3%] bottom-48 rounded-full px-4 py-2 text-xs font-bold text-cyan-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '4.2s' }}>✨ 纯 CSS 动效</span>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full text-indigo-700 ${glassSoft}`}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse"></span>
            你好，我是{profile.name} 👋
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            {profile.headline[0]}<br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {profile.headline[1]}
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl font-semibold text-slate-500">{profile.sub}</p>
          <p className="mx-auto mt-5 text-base text-slate-600 leading-relaxed max-w-2xl">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="flow-border inline-flex items-center gap-2 px-7 py-3 font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 text-white rounded-full shadow-lg shadow-indigo-200 transition-all duration-200"
            >
              <FolderKanban size={16} /> 浏览作品
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-7 py-3 font-bold text-sm text-slate-700 rounded-full transition-all hover:shadow-md active:scale-95 ${glass}`}
            >
              <Send size={16} /> 联系我
            </a>
          </div>
        </section>

        {/* 跑马灯：玻璃条 */}
        <section className={`${glass} rounded-full py-3 px-2 overflow-hidden`}>
          <div className="animate-marquee gap-3">
            {[...marqueeTags, ...marqueeTags].map((tag, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-white/70 text-indigo-700 border border-white/80 shadow-sm cursor-default hover:scale-105 transition-transform"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 作品 */}
        <section id="projects" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<FolderKanban size={18} />} zh="作品" en="PROJECTS" note="点击卡片访问线上地址 / 仓库" />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {projects.map((p, i) => {
              const isWide = i === 0 || i === 3;
              const span = isWide ? 'md:col-span-4' : i >= 12 ? 'md:col-span-3' : 'md:col-span-2';
              return (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group ${glass} rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(31,38,135,0.14)] ${span} ${p.featured ? 'flow-border' : ''}`}
                >
                  <div className={isWide ? 'flex flex-col sm:flex-row gap-6' : ''}>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.featured ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200' : 'bg-white/70 text-slate-500 border border-white/80'}`}>
                          {p.featured ? '★ 精选' : p.type}
                        </span>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                      </div>
                      {p.featured && <div className="text-[11px] font-semibold text-slate-400 mb-1">{p.type}</div>}
                      <h3 className={`font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors ${isWide ? 'text-2xl' : 'text-lg'}`}>{p.name}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed mt-2 flex-1">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[10px] font-semibold bg-white/60 text-slate-500 border border-white/70 rounded-full">#{t}</span>
                        ))}
                      </div>
                    </div>
                    {isWide && (
                      <div className="hidden sm:grid place-items-center shrink-0 w-36 h-36 self-center rounded-[1.5rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-xl shadow-indigo-200 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-5xl font-extrabold text-white/95">{p.name[0]}</span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 设计 */}
        <section id="design" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Palette size={18} />} zh="设计" en="MOTION LANGUAGE" note="这个站点的母语：五种招牌动效" />
          <p className={`rounded-[1.75rem] p-5 text-sm text-slate-500 leading-relaxed ${glassSoft}`}>
            界面动效是壹隅的设计语言——下面五种微交互贯穿全站，悬浮、按压、切换都可以亲手试试。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* 1. 跑马灯 */}
            <div className={`${glass} rounded-[1.75rem] p-6 overflow-hidden md:col-span-4`}>
              <div className="text-xs font-bold text-slate-400 mb-4">01 / 无限跑马灯</div>
              <div className="overflow-hidden -mx-6">
                <div className="animate-marquee gap-2 px-6">
                  {['流畅', '无缝', '60fps', '悬停暂停', '流畅', '无缝', '60fps', '悬停暂停'].map((t, i) => (
                    <span key={i} className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-700 border border-indigo-200/50">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">首尾相接的无缝循环，鼠标悬停即暂停</p>
            </div>

            {/* 2. 流动边框 */}
            <div className={`flow-border ${glass} rounded-[1.75rem] p-6 md:col-span-2`}>
              <div className="text-xs font-bold text-slate-400 mb-4">02 / 流动边框光效</div>
              <div className="h-16 flex items-center justify-center text-sm font-bold text-slate-500">
                把鼠标悬浮上来 ✨
              </div>
              <p className="text-[11px] text-slate-400 mt-2">渐变微光沿边框缓缓流转</p>
            </div>

            {/* 3. 弹性按压 */}
            <div className={`${glass} rounded-[1.75rem] p-6 md:col-span-2`}>
              <div className="text-xs font-bold text-slate-400 mb-4">03 / 弹性按压反馈</div>
              <button
                onClick={() => setPressCount((c) => c + 1)}
                className="w-full py-3 font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-200 hover:scale-[1.02] active:scale-90 text-white rounded-full shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={15} /> 按我试试（{pressCount}）
              </button>
              <p className="text-[11px] text-slate-400 mt-4">按下回弹、悬浮上浮，有"活着"的手感</p>
            </div>

            {/* 4. 实时波形 */}
            <div className={`${glass} rounded-[1.75rem] p-6 md:col-span-4`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold text-slate-400">04 / 实时波形与呼吸</div>
                <button onClick={() => setIsBeating(!isBeating)} className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                  <Volume2 size={12} /> {isBeating ? '暂停' : '播放'}
                </button>
              </div>
              <div className="h-16 rounded-2xl bg-white/50 border border-white/70 flex items-center justify-center gap-1.5">
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-1' : 'h-3'}`}></div>
                <div className={`w-2 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-2' : 'h-4'}`}></div>
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-3' : 'h-2'}`}></div>
                <div className={`w-2 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-4' : 'h-5'}`}></div>
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-5' : 'h-2'}`}></div>
                <div className={`w-2 bg-indigo-400 rounded-full ${isBeating ? 'animate-eq-2' : 'h-3'}`}></div>
                <div className={`w-2 bg-indigo-300 rounded-full ${isBeating ? 'animate-eq-4' : 'h-4'}`}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">纯 CSS 关键帧驱动的均衡器律动</p>
            </div>

            {/* 5. Tab 滑块 */}
            <div className={`${glass} rounded-[1.75rem] p-6 md:col-span-3`}>
              <div className="text-xs font-bold text-slate-400 mb-4">05 / 平滑 Tab 滑块</div>
              <div className="relative flex bg-white/50 border border-white/60 p-1 rounded-full mb-4 text-xs font-bold">
                <div
                  aria-hidden
                  className="absolute left-1 top-1 bottom-1 rounded-full bg-white shadow-md transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ width: 'calc((100% - 0.5rem) / 3)', transform: `translateX(${activeTabIndex * 100}%)` }}
                />
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative z-10 flex-1 py-2 rounded-full transition-colors duration-200 ${activeTab === t.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="bg-white/50 border border-white/60 p-4 rounded-2xl text-xs font-medium text-slate-600 min-h-[52px]">
                {activeTab === 'feel' && '🖱️ 按压回弹、悬浮上浮——每个控件都有触感。'}
                {activeTab === 'motion' && '⚡ 60fps 微交互，弹簧曲线，零多余动画库。'}
                {activeTab === 'rhythm' && '🌊 跑马灯、波形、呼吸光斑，页面有了节奏。'}
              </div>
            </div>

            {/* 6. 呼吸光斑 */}
            <div className={`${glass} rounded-[1.75rem] p-6 relative overflow-hidden md:col-span-3`}>
              <div className="text-xs font-bold text-slate-400 mb-4 relative z-10">06 / 背景呼吸微光</div>
              <div className="h-16 relative flex items-center justify-center">
                <div className="absolute w-24 h-24 bg-violet-300/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute w-16 h-16 bg-indigo-300/60 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="relative text-sm font-bold text-slate-500">本页背景就有 ✨</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 relative z-10">柔光斑块缓慢呼吸，营造通透感</p>
            </div>
          </div>
        </section>

        {/* 关于 */}
        <section id="about" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Sparkles size={18} />} zh="关于" en="ABOUT" note="数字里的创作轨迹" />
          <div className={`${glass} rounded-[2rem] p-8 md:p-10 grid md:grid-cols-5 gap-8 items-center`}>
            <p className="text-sm text-slate-500 leading-relaxed md:col-span-2">
              <span className="block text-xl font-extrabold text-slate-900 mb-3">把想法快速做成能用的东西。</span>
              从 AI 工具、自动化脚本到移动端界面与视觉系统，我习惯把过程中沉淀的组件、动效和提示词整理成系统。这个站点既是作品集，也是实验场。
            </p>
            <div className="grid grid-cols-2 gap-6 text-center md:col-span-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900">{s.value}</span><span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">{s.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系 */}
        <section id="contact" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Send size={18} />} zh="联系" en="CONTACT" note="欢迎交流合作" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <div className="size-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-400">{c.label}</div>
                    <div className="text-sm font-bold text-slate-800 truncate">{c.value}</div>
                  </div>
                  {c.href && <ExternalLink size={15} className="ml-auto text-slate-300 shrink-0" />}
                </>
              );
              const cls = `flex items-center gap-4 ${glass} rounded-[1.75rem] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(31,38,135,0.14)]`;
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={c.label} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* 页脚 */}
        <footer className="pt-10 pb-4 text-center">
          <div className={`inline-flex flex-col items-center gap-1 rounded-full px-8 py-4 ${glassSoft}`}>
            <h3 className="text-sm font-bold text-slate-900">壹隅 YI CORNER</h3>
            <p className="text-xs text-slate-500">一隅之地 · Crafted with Motion & React</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
