import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  contacts,
  focusAreas,
  process,
  profile,
  projects,
  stats,
  websites,
} from './data/portfolio';
import './styles.css';

const navItems = [
  { label: '作品', href: '#work' },
  { label: '案例', href: '#cases' },
  { label: '方法', href: '#process' },
  { label: '联系', href: '#contact' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070a13] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(45,212,191,0.16),transparent_30%),radial-gradient(circle_at_78%_0%,rgba(96,165,250,0.16),transparent_28%),linear-gradient(180deg,#070a13_0%,#0a1020_48%,#070a13_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] circuit-grid" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070a13]/72 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
              W
            </span>
            <span>Weiyi</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              直接联系
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-100 md:hidden"
            aria-label="打开导航菜单"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#070a13]/95 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.02fr_0.98fr] md:px-8 md:pt-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              {profile.role}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              {profile.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{profile.summary}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                查看作品
                <ArrowRight size={18} />
              </a>
              <a
                href="https://github.com/zaz52"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="whitespace-nowrap text-xl font-black text-white sm:text-2xl">{item.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem]">
            <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1222] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={profile.avatar}
                      alt={`${profile.name} 的头像`}
                      className="size-16 rounded-2xl border border-white/15 object-cover"
                    />
                    <div>
                      <div className="text-xl font-black text-white">{profile.name}</div>
                      <div className="text-sm text-slate-400">{profile.location}</div>
                    </div>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                    Online
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  {focusAreas.map((item) => (
                    <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/30">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                          <item.icon size={21} />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white">{item.title}</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Live Work</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">已经上线的作品入口</h2>
            </div>
            <p className="max-w-xl text-slate-400">
              每个入口都保留真实链接，访客可以直接打开验证。后续只需要维护数据文件即可继续扩展。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {websites.map((site) => (
              <a
                key={site.href}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-h-64 rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.075]"
              >
                <div className={`mb-8 grid size-13 place-items-center rounded-2xl bg-gradient-to-br ${site.accent} text-slate-950 shadow-lg`}>
                  <site.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-white">{site.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{site.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">
                  打开项目
                  <ExternalLink size={15} className="transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="cases" className="border-y border-white/10 bg-white/[0.025] py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Case Studies</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">不是堆链接，而是展示能力</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="rounded-3xl border border-white/10 bg-[#0b1222]/80 p-6">
                  <div className="mb-8 h-40 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(168,85,247,0.14)),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_22%)] p-4">
                    <div className="flex h-full flex-col justify-between">
                      <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-100">
                        {project.category}
                      </span>
                      <div className="h-2 w-2/3 rounded-full bg-cyan-200/40" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  <p className="mt-4 min-h-28 text-sm leading-7 text-slate-400">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.impact.map((item) => (
                      <span key={item} className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-5 text-xs text-slate-500">
                    {project.stack.join(' / ')}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Process</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">我的构建方式</h2>
          </div>
          <div className="grid gap-4">
            {process.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <p className="text-base leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,255,255,0.045))] p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Contact</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">联系方式直接放这里</h2>
                <p className="mt-5 text-slate-400">
                  技术交流、项目合作、学习资料、AI 工具想法，都可以通过下面任意渠道联系我。
                </p>
                <a
                  href="mailto:1845779520@qq.com"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 transition hover:bg-white"
                >
                  <MessageCircle size={18} />
                  立即发邮件
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group rounded-2xl border border-white/10 bg-[#070a13]/55 p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-cyan-200">
                        <contact.icon size={21} />
                      </div>
                      <ExternalLink size={16} className="text-slate-500 transition group-hover:text-cyan-200" />
                    </div>
                    <div className="mt-5 text-sm text-slate-400">{contact.label}</div>
                    <div className="mt-1 break-all text-lg font-black text-white">{contact.value}</div>
                    <div className="mt-3 text-sm font-bold text-cyan-200">{contact.action}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <CheckCircle2 size={16} className="text-emerald-300" />
          <span>© 2026 Weiyi. Built with React, TypeScript and Tailwind CSS.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
