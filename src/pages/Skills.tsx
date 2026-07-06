import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Github, Workflow } from 'lucide-react';
import { skills } from '../data/skills';

export function Skills() {
  return (
    <main className="min-h-screen bg-[var(--light)] px-6 pt-32 pb-24 md:px-16 lg:px-24">
      <section className="mx-auto max-w-[1180px]">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-[var(--green)]">Skill Bank</p>
            <h1 className="text-5xl font-black leading-tight text-[var(--deep)] md:text-7xl">可复用的 AI 工作流。</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#5f7068]">
            这里存放从文章、项目和实战流程里蒸馏出来的 Codex skills。每个 skill 都保留来源边界、操作协议和验证入口，方便继续迭代。
          </p>
        </div>

        <div className="mt-14 grid gap-5">
          {skills.map((skill, index) => (
            <motion.a
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className="group grid gap-6 border-y border-[rgba(18,48,38,0.12)] bg-[rgba(255,250,240,0.55)] px-4 py-7 transition hover:bg-white/80 md:grid-cols-[1fr_220px] md:px-7"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-black text-[var(--green)]">
                  <span className="inline-flex items-center gap-2">
                    <Workflow size={17} />
                    {skill.status}
                  </span>
                  <span>{skill.updatedAt}</span>
                </div>
                <h2 className="text-3xl font-black text-[var(--deep)] md:text-4xl">{skill.name}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#607369]">{skill.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#e5efdc] px-3 py-1 text-xs font-black text-[var(--deep)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 md:flex-col md:items-end">
                <BadgeCheck className="text-[var(--green)]" size={30} />
                <span className="inline-flex items-center gap-2 font-black text-[var(--deep)]">
                  查看 skill
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}
