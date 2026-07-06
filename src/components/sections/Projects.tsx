import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { Button } from '../ui/Button';
import { ProjectCover } from '../ui/ProjectCover';
import { SectionTitle } from '../ui/SectionTitle';

const paletteClass: Record<string, string> = {
  emerald: 'from-[#0b3d2e] to-[#2f8f5b]',
  violet: 'from-[#372d67] to-[#6a7bff]',
  blue: 'from-[#17486c] to-[#28c7b7]',
  orange: 'from-[#8a4d2a] to-[#ff7a66]',
  mint: 'from-[#1d604f] to-[#a8df9f]',
  cyan: 'from-[#0b3d2e] to-[#28c7b7]',
};

export function Projects() {
  const projects = useProjects();
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.id !== featured.id);

  return (
    <section id="projects" className="min-h-screen overflow-hidden bg-[var(--forest)] px-6 py-28 text-[var(--cream)] md:px-16 lg:px-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="Projects"
            title="精选作品，不再挤成小格子。"
            description="作品区用大卡片和横向作品墙展示，每个项目都有明确封面、类型、标签和入口。"
            light
          />
          <Button href={`/projects/${featured.id}`} variant="secondary" className="w-fit">
            打开主推作品
          </Button>
          <Button href="/projects" variant="secondary" className="w-fit">
            查看全部作品
          </Button>
        </div>

        <motion.a
          href={`/projects/${featured.id}`}
          className="group mt-14 grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(255,244,225,0.08)] p-5 backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:p-7"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCover
            className={`min-h-[360px] rounded-[2rem] bg-gradient-to-br ${paletteClass[featured.palette]}`}
            src={featured.cover}
            title={featured.name}
            kind={featured.type}
            loading="eager"
          />
          <div className="flex flex-col justify-center p-4 md:p-10">
            <div className="mb-5 flex items-center gap-3 text-[#9de8c2]">
              <featured.icon size={28} />
              <span className="text-sm font-black uppercase tracking-[0.24em]">{featured.type}</span>
            </div>
            <h3 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{featured.name}</h3>
            <p className="mt-5 text-lg leading-8 text-[#d8eadf]">{featured.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {featured.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{tag}</span>)}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 font-black text-[#9de8c2]">
              查看详情
              <ExternalLink className="transition group-hover:translate-x-1" size={18} />
            </div>
          </div>
        </motion.a>

        <div className="scroll-strip mt-10 flex gap-6 overflow-x-auto pb-6">
          {rest.slice(0, 5).map((project, index) => (
            <motion.a
              key={project.id}
              href={`/projects/${project.id}`}
              className="group min-w-[320px] rounded-[2rem] border border-white/10 bg-[rgba(255,244,225,0.08)] p-5 transition hover:-translate-y-2 hover:border-[var(--coral)] md:min-w-[460px]"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <ProjectCover
                className={`mb-6 h-56 rounded-[1.5rem] bg-gradient-to-br ${paletteClass[project.palette]}`}
                src={project.cover}
                title={project.name}
                kind={project.type}
              />
              <div className="flex items-center gap-3 text-[#9de8c2]">
                <project.icon size={22} />
                <span className="text-xs font-black uppercase tracking-[0.22em]">{project.type}</span>
              </div>
              <h3 className="mt-4 text-3xl font-black">{project.name}</h3>
              <p className="mt-3 min-h-16 leading-7 text-[#d8eadf]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{tag}</span>)}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
