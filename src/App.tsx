import React from 'react';
import { portfolio } from './data/portfolio';
import { Github, Mail, ArrowUpRight, Terminal, Sparkles, FolderGit2 } from 'lucide-react';

export default function App() {
  const authorName = portfolio.name || '唯一';
  const bioText = portfolio.bio || portfolio.about || '专注于现代 Web 界面设计与前端工程构建，追求清晰的工程架构与干练硬核的视觉表现。';
  const githubUrl = portfolio.social?.github || 'https://github.com/zaz52';
  const emailAddr = portfolio.social?.email || 'contact@example.com';

  const defaultSkills = [
    'React.js', 'TypeScript', 'Tailwind CSS', 'Vite',
    'Node.js', 'Next.js', 'Git / GitHub', 'UI / UX Design', 'Figma', 'REST APIs'
  ];

  const skillList = Array.isArray(portfolio.skills) && portfolio.skills.length > 0
    ? portfolio.skills
    : defaultSkills;

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20 selection:bg-[#FF6B00] selection:text-white">
      {/* 顶部工装风格导航栏 */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-black text-lg tracking-wider">
            <span className="w-4 h-4 bg-[#FF6B00] border-2 border-black inline-block shadow-[2px_2px_0px_0px_#000]"></span>
            {authorName} / PORTFOLIO
          </a>
          <nav className="flex items-center gap-5 text-sm font-black">
            <a href="#projects" className="hover:text-[#FF6B00] transition-colors">/ 作品</a>
            <a href="#skills" className="hover:text-[#FF6B00] transition-colors">/ 技能</a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 bg-[#FF6B00] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              联系我
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12 space-y-14">
        {/* Hero 个人名片 */}
        <section className="bg-slate-50 border-2 border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_#000] relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-black border-2 border-black bg-[#A3E635] shadow-[2px_2px_0px_0px_#000]">
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping"></span>
            AVAILABLE FOR WORK
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            你好，我是 {authorName} 👋
          </h1>

          <div className="border-l-4 border-[#FF6B00] pl-4 my-6 py-1">
            <p className="text-base md:text-lg font-medium text-slate-700 leading-relaxed">
              {bioText}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 font-black border-2 border-black bg-[#FF6B00] text-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <Github size={18} /> GITHUB
            </a>
            <a
              href={`mailto:${emailAddr}`}
              className="flex items-center gap-2 px-5 py-2.5 font-black border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <Mail size={18} /> 发送邮件
            </a>
          </div>
        </section>

        {/* 精选项目模块 */}
        <section id="projects" className="space-y-6">
          <div className="inline-block px-3 py-1.5 bg-[#2563EB] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <h2 className="text-xl font-black flex items-center gap-2">
              <FolderGit2 size={20} /> 精选项目 / SELECTED WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(portfolio.projects && portfolio.projects.length > 0
              ? portfolio.projects
              : [
                  {
                    name: '个人作品集主页',
                    description: '基于 React、TypeScript 与 Tailwind CSS 构建的高性能、极简响应式主页。',
                    tags: ['React', 'Tailwind', 'Vite'],
                    link: 'https://github.com/zaz52/-',
                  },
                  {
                    name: '交互式组件与设计系统',
                    description: '一套轻量、模块化的高可复用 UI 控件库，兼具极客视觉与高效工程落地。',
                    tags: ['TypeScript', 'DesignSystem', 'CSS'],
                    link: 'https://github.com/zaz52/-',
                  },
                ]
            ).map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 border-2 border-black bg-[#FF6B00] text-white shadow-[2px_2px_0px_0px_#000]">
                      PROJECT #{String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 border border-black bg-slate-100 hover:bg-[#FF6B00] hover:text-white transition-colors"
                        title="查看项目"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl font-black mb-2.5">{item.name || item.title}</h3>
                  <p className="text-sm font-medium text-slate-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black/10">
                  <div className="flex flex-wrap gap-2">
                    {(item.tags || []).map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="text-xs font-bold px-2 py-0.5 border border-black bg-slate-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 技能标签 */}
        <section id="skills" className="bg-slate-50 border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="inline-block px-3 py-1 bg-[#A3E635] border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Terminal size={18} /> 技术栈与工具箱 / SKILLS
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-bold mb-4">日常使用与实践的技术工具链：</p>

          <div className="flex flex-wrap gap-3">
            {skillList.map((skill: string, index: number) => (
              <div
                key={index}
                className="px-3.5 py-1.5 font-black text-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B00] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* 底部联系栏 */}
        <footer id="contact" className="border-2 border-black bg-[#FF6B00] text-white p-8 text-center shadow-[4px_4px_0px_0px_#000]">
          <h3 className="text-2xl font-black mb-2 flex items-center justify-center gap-2">
            <Sparkles size={22} /> 感兴趣聊聊吗？
          </h3>
          <p className="text-sm font-medium mb-6 text-white/90 max-w-md mx-auto">
            欢迎交流探讨技术、分享作品，或者进行项目合作，随时欢迎发信联系！
          </p>

          <div className="inline-block border-2 border-black bg-white text-black px-5 py-2.5 font-black text-sm shadow-[2px_2px_0px_0px_#000] select-all">
            {emailAddr}
          </div>

          <div className="mt-8 text-xs font-black text-white/80">
            © {new Date().getFullYear()} {authorName}. Industrial Neo-Brutalism & React.
          </div>
        </footer>
      </main>
    </div>
  );
}
