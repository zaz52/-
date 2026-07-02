import {
  ArrowRight,
  ExternalLink,
  Github,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  alerts,
  chevronIcon as ChevronDown,
  colorTokens,
  designPrinciples,
  formOptions,
  iconSet,
  mobileScreens,
  paletteIcon as Palette,
  radiusTokens,
  searchIcon as Search,
  spacingTokens,
} from './data/designSystem';
import {
  contacts,
  process,
  profile,
  projects,
  websites,
} from './data/portfolio';
import './styles.css';

const navItems = [
  { label: '作品', href: '#work' },
  { label: '系统', href: '#system' },
  { label: '案例', href: '#cases' },
  { label: '联系', href: '#contact' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#123f34] text-[#17382f]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(247,239,223,0.9),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(46,196,199,0.28),transparent_26%),linear-gradient(180deg,#123f34_0%,#0c3028_100%)]" />
      <div className="fixed inset-x-0 top-0 z-50 border-b border-[#1f5c4c]/20 bg-[#f7efdf]/88 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3 font-black tracking-tight text-[#0e4d41]">
            <span className="grid size-10 place-items-center rounded-full border border-[#176B4F]/25 bg-[#e9f0d8] text-sm">
              NFY
            </span>
            <span>Weiyi Design</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-bold text-[#315a4f] hover:text-[#ff765a]">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary">
              直接联系
              <ArrowRight size={16} />
            </a>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-2xl border border-[#176B4F]/20 bg-white/40 md:hidden"
            aria-label="打开导航菜单"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-[#176B4F]/15 bg-[#f7efdf] px-5 py-3 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-[#315a4f]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <main id="top" className="mx-auto max-w-[1500px] px-3 py-3 md:px-5 md:py-5">
        <div className="paper-shell">
          <Hero />
          <Principles />
          <PortfolioWork />
          <DesignSystem />
          <ProjectCases />
          <ProcessAndContact />
        </div>
      </main>

      <footer className="mx-auto flex max-w-[1500px] items-center justify-between px-5 pb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#d8e6d0]/80">
        <span>Nature · Future · Youth · Creation</span>
        <span className="hidden md:inline">Design with nature, build the future.</span>
        <span>© 2026 Weiyi</span>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative grid gap-8 overflow-hidden rounded-[2rem] border border-[#dccfb9] bg-[#fbf4e7] px-5 py-8 md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-12">
      <BotanicalCorner />
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#176B4F]/20 bg-[#eef3df] px-4 py-2 text-sm font-bold text-[#176B4F]">
          <span className="size-2 rounded-full bg-[#2ec4c7]" />
          复古科技 · 青春自然 UI Design System
        </div>
        <h1 className="display-title">
          <span className="title-line title-green">复古科技</span>
          <span className="title-dot">·</span>
          <span className="title-line title-coral">青春自然</span>
        </h1>
        <p className="mt-4 text-2xl font-black italic text-[#143e35] md:text-5xl">Web / Mobile / Components</p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#52675d] md:text-lg">
          这套系统把暖纸质感、森林植物、CRT 复古设备和明亮青年感组合起来，用于个人作品集、内容社区、工具产品和移动端应用。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#system" className="btn-primary px-6 py-4">
            查看 UI 系统
            <ArrowRight size={18} />
          </a>
          <a href="https://github.com/zaz52" target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-4">
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
      <div className="relative z-10">
        <RetroComputer />
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="mt-4 grid gap-4 md:grid-cols-4">
      {designPrinciples.map((item) => (
        <div key={item.title} className="system-card">
          <item.icon className="text-[#176B4F]" size={28} />
          <h2 className="mt-4 text-lg font-black">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#66756c]">{item.text}</p>
        </div>
      ))}
    </section>
  );
}

function PortfolioWork() {
  return (
    <section id="work" className="system-panel mt-4">
      <SectionTitle index="01" title="作品入口" subtitle="Live Websites" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {websites.map((site) => (
          <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className="nature-card group">
            <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${site.accent} text-white shadow-md`}>
              <site.icon size={25} />
            </div>
            <h3 className="mt-6 text-xl font-black text-[#17382f]">{site.name}</h3>
            <p className="mt-3 min-h-16 text-sm leading-6 text-[#68766e]">{site.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#176B4F]">
              打开项目
              <ExternalLink size={15} className="transition group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function DesignSystem() {
  return (
    <section id="system" className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-4">
        <ColorTypography />
        <ControlsLibrary />
        <CardsLibrary />
      </div>
      <div className="grid gap-4">
        <WebMobilePreview />
        <SpacingRadiusIcons />
      </div>
    </section>
  );
}

function ColorTypography() {
  return (
    <div className="system-panel">
      <SectionTitle index="02" title="色彩与字体" subtitle="Color & Typography" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-7">
            {colorTokens.map((color) => (
              <div key={color.hex}>
                <div className={`h-20 rounded-2xl border border-black/10 ${color.className}`} />
                <div className="mt-2 text-xs font-black">{color.name}</div>
                <div className="text-[11px] text-[#7b7468]">{color.hex}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {['自然共生', '科技未来', '活力青春', '复古温暖'].map((tag) => (
              <span key={tag} className="pill-soft">{tag}</span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[#ddd1bd] bg-[#fffaf0] p-5">
          <div className="text-sm font-bold text-[#7b7468]">中文字体</div>
          <div className="mt-2 text-4xl font-black">思源黑体</div>
          <div className="mt-5 text-sm font-bold text-[#7b7468]">English Typeface</div>
          <div className="mt-2 text-4xl font-black tracking-tight">Inter</div>
          <p className="mt-5 text-sm leading-7 text-[#68766e]">标题厚重、按钮高识别、正文保持清洁现代。复古感主要交给色彩、纹理和插画元素。</p>
        </div>
      </div>
    </div>
  );
}

function ControlsLibrary() {
  return (
    <div className="system-panel">
      <SectionTitle index="03" title="控件与按钮" subtitle="Controls & Buttons" />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">探索未来 <ArrowRight size={16} /></button>
            <button className="btn-secondary">了解更多</button>
            <button className="btn-ghost">观察视角</button>
            <button className="btn-disabled">不可点击</button>
          </div>
          <div className="field">
            <Search size={17} />
            <input aria-label="搜索" placeholder="搜索灵感、文章、产品..." />
          </div>
          <div className="select-row">
            <span>选择一个选项</span>
            <ChevronDown size={17} />
          </div>
          <div className="flex flex-wrap gap-2">
            {formOptions.map((option, index) => (
              <span key={option} className={index === 0 ? 'chip-active' : 'chip'}>
                {option}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="switch-on" />
            <span className="switch-off" />
            <label className="check-row"><input type="checkbox" defaultChecked /> 自然灵感</label>
            <label className="check-row"><input type="radio" defaultChecked /> 选中</label>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm font-bold"><span>自然能量值</span><span>76%</span></div>
            <div className="h-3 rounded-full bg-[#e8dfce]"><div className="h-full w-3/4 rounded-full bg-[#176B4F]" /></div>
          </div>
          <div className="grid gap-2">
            {alerts.map((alert) => (
              <div key={alert.title} className={`alert-row alert-${alert.tone}`}>
                <alert.icon size={18} />
                <div><strong>{alert.title}</strong><p>{alert.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsLibrary() {
  return (
    <div className="system-panel">
      <SectionTitle index="04" title="卡片系统" subtitle="Cards" />
      <div className="grid gap-4 md:grid-cols-3">
        <article className="content-card">
          <div className="scene forest-scene" />
          <h3>在山野间寻找设计灵感</h3>
          <p>探索自然、科技和年轻表达之间的视觉连接。</p>
          <div className="card-meta"><span>NatureBoy</span><span>128 ♡</span></div>
        </article>
        <article className="content-card">
          <div className="scene device-scene" />
          <h3>复古掌机 · 未来版</h3>
          <p>复古硬件语言和现代产品信息架构融合。</p>
          <div className="card-meta"><span>¥699</span><span>4.8 ★</span></div>
        </article>
        <article className="profile-card">
          <img src={profile.avatar} alt={`${profile.name} 的头像`} />
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
          <button className="btn-primary w-full justify-center">关注</button>
        </article>
      </div>
    </div>
  );
}

function WebMobilePreview() {
  return (
    <div className="system-panel">
      <SectionTitle index="05" title="网页与移动端" subtitle="Web & Mobile Preview" />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="web-preview">
          <div className="flex items-center justify-between text-xs font-bold text-[#dcebd8]">
            <span>Nature Future Youth</span>
            <span>Home · Works · Article · Contact</span>
          </div>
          <div className="mt-16 max-w-md">
            <h3>科技自然<br />青春创造未来</h3>
            <p>复古科技和自然灵感结合的个人品牌首页。</p>
            <button className="mt-5 rounded-full bg-[#4CAF7A] px-5 py-2 text-sm font-black text-white">探索作品</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {mobileScreens.map((screen) => (
            <div key={screen.title} className="phone-frame">
              <div className={`phone-visual ${screen.image}`} />
              <h3>{screen.title}</h3>
              <p>{screen.eyebrow}</p>
              <span>{screen.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpacingRadiusIcons() {
  return (
    <div className="system-panel">
      <SectionTitle index="06" title="间距、圆角、图标" subtitle="Spacing / Radius / Icons" />
      <div className="grid gap-6">
        <div>
          <div className="mb-3 text-sm font-black">Spacing Scale</div>
          <div className="flex items-end gap-3 overflow-x-auto pb-2">
            {spacingTokens.map((space) => (
              <div key={space} className="text-center text-xs text-[#7b7468]">
                <div className="mx-auto rounded bg-[#ffd7b8]" style={{ width: space, height: space }} />
                <span>{space}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-black">Radius Scale</div>
          <div className="flex items-end gap-3 overflow-x-auto pb-2">
            {radiusTokens.map((radius) => (
              <div key={radius} className="text-center text-xs text-[#7b7468]">
                <div className="size-12 border border-[#bba88f] bg-[#fff7e8]" style={{ borderRadius: radius }} />
                <span>{radius}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black"><Palette size={17} /> Icon Set</div>
          <div className="grid grid-cols-6 gap-3 sm:grid-cols-12">
            {iconSet.map((Icon, index) => (
              <div key={index} className="grid size-10 place-items-center rounded-xl border border-[#d8cbb8] bg-[#fffaf0] text-[#176B4F]">
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCases() {
  return (
    <section id="cases" className="system-panel mt-4">
      <SectionTitle index="07" title="案例展示" subtitle="Case Studies" />
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="nature-card">
            <div className="scene forest-scene mb-5" />
            <div className="pill-soft w-fit">{project.category}</div>
            <h3 className="mt-4 text-2xl font-black">{project.title}</h3>
            <p className="mt-3 min-h-24 text-sm leading-7 text-[#68766e]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.impact.map((item) => <span key={item} className="chip-active">{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessAndContact() {
  return (
    <section id="contact" className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="system-panel">
        <SectionTitle index="08" title="构建方法" subtitle="Process" />
        <div className="grid gap-3">
          {process.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-3xl border border-[#ddd1bd] bg-[#fffaf0] p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#176B4F] text-sm font-black text-white">{index + 1}</span>
              <p className="text-sm leading-7 text-[#52675d]">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="system-panel">
        <SectionTitle index="09" title="联系方式" subtitle="Contact" />
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-tile"
            >
              <contact.icon size={22} />
              <div>
                <div className="text-xs font-bold text-[#7b7468]">{contact.label}</div>
                <div className="break-all font-black">{contact.value}</div>
                <div className="text-xs font-bold text-[#176B4F]">{contact.action}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ index, title, subtitle }: { index: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b border-[#d8cbb8] pb-3">
      <span className="font-black italic text-[#176B4F]">{index}</span>
      <h2 className="text-xl font-black text-[#17382f]">{title}</h2>
      <span className="text-sm font-bold text-[#8a8175]">{subtitle}</span>
    </div>
  );
}

function RetroComputer() {
  return (
    <div className="retro-stage">
      <div className="crt">
        <div className="crt-screen">
          <span>Hello<br />Future.</span>
          <LeafMark />
        </div>
        <div className="crt-base">
          <span>NFY-2026</span>
          <i />
        </div>
      </div>
      <div className="plant left" />
      <div className="plant right" />
    </div>
  );
}

function BotanicalCorner() {
  return (
    <>
      <div className="absolute -left-8 top-8 h-40 w-24 rotate-12 rounded-full border-l-8 border-[#176B4F]/25" />
      <div className="hero-stamp absolute right-8 top-8 size-24 rounded-full border border-[#176B4F]/20 text-center text-[10px] font-black uppercase leading-4 text-[#176B4F]/60">
        <div className="pt-7">Nature<br />Future<br />Youth</div>
      </div>
    </>
  );
}

function LeafMark() {
  return <span className="leaf-mark" aria-hidden="true" />;
}

export default App;
