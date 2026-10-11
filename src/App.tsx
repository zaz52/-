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

function SectionHead({ icon, zh, en, note }: { icon: React.ReactNode; zh: string; en: string; note: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
        <span className="text-indigo-600">{icon}</span> {zh} <span className="text-slate-400 font-semibold text-sm">{en}</span>
      </h2>
      <span className="text-xs text-slate-500 font-medium">{note}</span>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'feel' | 'motion' | 'rhythm'>('feel');
  const [pressCount, setPressCount] = useState(0);
  const [isBeating, setIsBeating] = useState(true);
  const activeTabIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden scroll-smooth">
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
          border-radius: 14px;
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
        .flow-border-xl::before { border-radius: 20px; }
      `}</style>

      {/* 背景呼吸微光 */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-96 left-[-100px] w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* 顶栏 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 font-bold text-base tracking-tight">
            <span className="w-5 h-5 bg-indigo-600 rounded-md inline-block shadow-sm animate-bounce"></span>
            <span>壹隅 / YI CORNER</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
              个人网站
            </span>
          </a>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-indigo-600 transition-colors">{n.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="max-w-5xl mx-auto px-4 pt-10 space-y-14 relative z-10">
        {/* Hero：个人介绍 */}
        <section className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            你好，我是{profile.name} 👋
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {profile.headline[0]}<br />{profile.headline[1]}
          </h1>
          <p className="mt-3 text-lg md:text-xl font-semibold text-indigo-600">{profile.sub}</p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-3xl">{profile.intro}</p>
          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href="#projects"
              className="flow-border flex items-center gap-2 px-5 py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:shadow-lg active:scale-90 text-white rounded-xl shadow-sm transition-all duration-200"
            >
              <FolderKanban size={16} /> 浏览作品
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 font-bold text-sm bg-white hover:bg-slate-50 hover:shadow-md active:scale-95 text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-all"
            >
              <Send size={16} /> 联系我
            </a>
          </div>
        </section>

        {/* 跑马灯：技能标签 */}
        <section className="bg-white border border-slate-200/80 rounded-2xl py-3.5 px-2 overflow-hidden shadow-sm">
          <div className="animate-marquee gap-4">
            {[...marqueeTags, ...marqueeTags].map((tag, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border bg-indigo-50 text-indigo-700 border-indigo-100 shadow-xs cursor-default hover:scale-105 transition-transform"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 作品 */}
        <section id="projects" className="space-y-5 scroll-mt-24">
          <SectionHead icon={<FolderKanban size={18} />} zh="作品" en="PROJECTS" note="点击卡片访问线上地址 / 仓库" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={`group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300 flex flex-col ${p.featured ? 'flow-border flow-border-xl' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${p.featured ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {p.featured ? '★ 精选' : p.type}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                </div>
                {p.featured && <div className="text-[11px] font-semibold text-slate-400 mb-1">{p.type}</div>}
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-100 rounded">#{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 设计：动效语言 */}
        <section id="design" className="space-y-5 scroll-mt-24">
          <SectionHead icon={<Palette size={18} />} zh="设计" en="MOTION LANGUAGE" note="这个站点的母语：五种招牌动效" />
          <p className="text-sm text-slate-500 leading-relaxed">
            界面动效是壹隅的设计语言——下面五种微交互贯穿全站，悬浮、按压、切换都可以亲手试试。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. 跑马灯 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm overflow-hidden">
              <div className="text-xs font-bold text-slate-400 mb-3">01 / 无限跑马灯</div>
              <div className="overflow-hidden -mx-5">
                <div className="animate-marquee gap-2 px-5">
                  {['流畅', '无缝', '60fps', '悬停暂停', '流畅', '无缝', '60fps', '悬停暂停'].map((t, i) => (
                    <span key={i} className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">首尾相接的无缝循环，鼠标悬停即暂停</p>
            </div>

            {/* 2. 流动边框 */}
            <div className="flow-border flow-border-xl bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-slate-400 mb-3">02 / 流动边框光效</div>
              <div className="h-16 flex items-center justify-center text-sm font-bold text-slate-500">
                把鼠标悬浮上来 ✨
              </div>
              <p className="text-[11px] text-slate-400 mt-1">渐变微光沿边框缓缓流转</p>
            </div>

            {/* 3. 弹性按压 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-slate-400 mb-3">03 / 弹性按压反馈</div>
              <button
                onClick={() => setPressCount((c) => c + 1)}
                className="w-full py-2.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-90 text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Zap size={15} /> 按我试试（{pressCount}）
              </button>
              <p className="text-[11px] text-slate-400 mt-3">按下回弹、悬浮上浮，有“活着”的手感</p>
            </div>

            {/* 4. 实时波形 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-slate-400">04 / 实时波形与呼吸</div>
                <button onClick={() => setIsBeating(!isBeating)} className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                  <Volume2 size={12} /> {isBeating ? '暂停' : '播放'}
                </button>
              </div>
              <div className="h-16 border border-slate-100 bg-slate-50/80 rounded-xl flex items-center justify-center gap-1.5">
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-1' : 'h-3'}`}></div>
                <div className={`w-2 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-2' : 'h-4'}`}></div>
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-3' : 'h-2'}`}></div>
                <div className={`w-2 bg-indigo-500 rounded-full ${isBeating ? 'animate-eq-4' : 'h-5'}`}></div>
                <div className={`w-2 bg-indigo-600 rounded-full ${isBeating ? 'animate-eq-5' : 'h-2'}`}></div>
                <div className={`w-2 bg-cyan-500 rounded-full ${isBeating ? 'animate-eq-2' : 'h-3'}`}></div>
                <div className={`w-2 bg-violet-500 rounded-full ${isBeating ? 'animate-eq-4' : 'h-4'}`}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">纯 CSS 关键帧驱动的均衡器律动</p>
            </div>

            {/* 5. Tab 滑块 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-bold text-slate-400 mb-3">05 / 平滑 Tab 滑块</div>
              <div className="relative flex bg-slate-100 p-1 rounded-xl mb-3 text-xs font-bold">
                <div
                  aria-hidden
                  className="absolute left-1 top-1 bottom-1 rounded-lg bg-white shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ width: 'calc((100% - 0.5rem) / 3)', transform: `translateX(${activeTabIndex * 100}%)` }}
                />
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative z-10 flex-1 py-1.5 rounded-lg transition-colors duration-200 ${activeTab === t.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-medium text-slate-600 min-h-[52px]">
                {activeTab === 'feel' && '🖱️ 按压回弹、悬浮上浮——每个控件都有触感。'}
                {activeTab === 'motion' && '⚡ 60fps 微交互，弹簧曲线，零多余动画库。'}
                {activeTab === 'rhythm' && '🌊 跑马灯、波形、呼吸光斑，页面有了节奏。'}
              </div>
            </div>

            {/* 6. 呼吸光斑 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="text-xs font-bold text-slate-400 mb-3 relative z-10">06 / 背景呼吸微光</div>
              <div className="h-16 relative flex items-center justify-center">
                <div className="absolute w-24 h-24 bg-purple-300/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute w-16 h-16 bg-cyan-300/60 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="relative text-sm font-bold text-slate-500">本页背景就有 ✨</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 relative z-10">柔光斑块缓慢呼吸，营造通透感</p>
            </div>
          </div>
        </section>

        {/* 关于 */}
        <section id="about" className="space-y-5 scroll-mt-24">
          <SectionHead icon={<Sparkles size={18} />} zh="关于" en="ABOUT" note="数字里的创作轨迹" />
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {s.value}<span className="text-indigo-600">{s.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mt-6 max-w-3xl">
              从 AI 工具、自动化脚本到移动端界面与视觉系统，我习惯把想法快速做成能用的东西，再把过程中沉淀的组件、动效和提示词整理成系统。这个站点既是作品集，也是实验场。
            </p>
          </div>
        </section>

        {/* 联系 */}
        <section id="contact" className="space-y-5 scroll-mt-24">
          <SectionHead icon={<Send size={18} />} zh="联系" en="CONTACT" note="欢迎交流合作" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-400">{c.label}</div>
                    <div className="text-sm font-bold text-slate-800 truncate">{c.value}</div>
                  </div>
                  {c.href && <ExternalLink size={15} className="ml-auto text-slate-300 shrink-0" />}
                </>
              );
              const cls = "flex items-center gap-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all";
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={c.label} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* 页脚 */}
        <footer className="border-t border-slate-200 pt-8 pb-4 text-center">
          <h3 className="text-sm font-bold text-slate-900">壹隅 YI CORNER</h3>
          <p className="text-xs text-slate-500 mt-1">一隅之地 · Crafted with Motion & React</p>
        </footer>
      </main>
    </div>
  );
}
