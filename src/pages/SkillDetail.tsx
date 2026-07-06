import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getSkill } from '../data/skills';
import { Button } from '../components/ui/Button';

type SkillDetailProps = {
  slug: string;
};

export function SkillDetail({ slug }: SkillDetailProps) {
  const skill = getSkill(slug);

  if (!skill) {
    return (
      <main className="min-h-screen bg-[var(--light)] px-6 pt-32 pb-24 md:px-16">
        <div className="mx-auto max-w-3xl">
          <a href="/skills" className="inline-flex items-center gap-2 font-black text-[var(--green)]">
            <ArrowLeft size={18} />
            返回 Skills
          </a>
          <h1 className="mt-8 text-5xl font-black text-[var(--deep)]">Skill 未找到</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] px-6 pt-32 pb-24 md:px-16 lg:px-24">
      <article className="mx-auto max-w-[1180px]">
        <a href="/skills" className="inline-flex items-center gap-2 font-black text-[var(--green)]">
          <ArrowLeft size={18} />
          返回 Skills
        </a>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-[var(--green)]">{skill.source}</p>
            <h1 className="text-5xl font-black leading-tight text-[var(--deep)] md:text-7xl">{skill.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f7068]">{skill.summary}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button href={skill.repository} target="_blank" rel="noopener noreferrer" variant="dark">
              打开 GitHub
            </Button>
            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/55 p-5">
              <div className="flex items-center gap-2 font-black text-[var(--deep)]">
                <Github size={19} />
                发布状态
              </div>
              <p className="mt-3 text-sm leading-6 text-[#607369]">已同步到 skills 仓库，页面更新于 {skill.updatedAt}。</p>
            </div>
          </div>
        </header>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-[#fffaf0] p-6 md:p-8">
            <h2 className="text-2xl font-black text-[var(--deep)]">核心机制</h2>
            <div className="mt-6 grid gap-4">
              {skill.mechanisms.map((item) => (
                <div key={item} className="border-l-4 border-[var(--green)] bg-white/70 px-5 py-4 text-base leading-7 text-[#41574e]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-[#f7f2e8] p-6">
              <h2 className="text-xl font-black text-[var(--deep)]">文件</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold text-[#607369]">
                {skill.files.map((file) => <li key={file}>{file}</li>)}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-[#f7f2e8] p-6">
              <h2 className="text-xl font-black text-[var(--deep)]">验证</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold text-[#607369]">
                {skill.validation.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={skill.repository} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-black text-[var(--green)]">
                查看完整包
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
