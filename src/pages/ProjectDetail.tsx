import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Layers, MousePointer2, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { hydrateProjects, projects as fallbackProjects } from '../data/projects';
import type { ProjectRecord } from '../data/projectTypes';
import { applySeo } from '../lib/seo';
import { ProjectCover } from '../components/ui/ProjectCover';

const paletteClass: Record<string, string> = {
  emerald: 'from-[#0b3d2e] to-[#2f8f5b]',
  violet: 'from-[#372d67] to-[#6a7bff]',
  blue: 'from-[#17486c] to-[#28c7b7]',
  orange: 'from-[#8a4d2a] to-[#ff7a66]',
  mint: 'from-[#1d604f] to-[#a8df9f]',
  cyan: 'from-[#0b3d2e] to-[#28c7b7]',
};

type ProjectDetailProps = {
  projectId: string;
};

const makeHighlights = (project: ProjectRecord) => [
  `围绕「${project.type}」建立清晰入口，让访问者能快速理解项目价值。`,
  `用封面、标签和一句话简介强化第一印象，适合放在个人作品集里展示。`,
  `保留线上项目链接，详情页负责讲清楚背景，外部站点负责承载真实体验。`,
];

const makeScenarios = (project: ProjectRecord) => [
  `${project.name} 的首页展示和项目说明`,
  '移动端与桌面端访问者的快速浏览',
  '个人品牌网站中的项目沉淀、分享和后续扩展',
];

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [records, setRecords] = useState<ProjectRecord[] | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Failed to load projects')))
      .then((data: ProjectRecord[]) => {
        if (!ignore && Array.isArray(data) && data.length > 0) setRecords(data);
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  const projects = useMemo(() => records ? hydrateProjects(records) : fallbackProjects, [records]);
  const project = projects.find((item) => item.id === projectId);
  const related = projects.filter((item) => item.id !== projectId).slice(0, 3);

  useEffect(() => {
    if (!project) {
      applySeo({
        title: '作品未找到 | Weiyi',
        description: '这个项目可能已经在后台被删除或改名，可以回到作品区查看当前公开的项目列表。',
        canonical: `https://weiyiai.top/projects/${projectId}`,
      });
      return;
    }

    applySeo({
      title: `${project.name} | Weiyi 作品详情`,
      description: project.description,
      canonical: `https://weiyiai.top/projects/${project.id}`,
      image: project.cover.startsWith('http') ? project.cover : `https://weiyiai.top${project.cover}`,
    });
  }, [project, projectId]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#fff9ec] px-6 py-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-[960px] rounded-[2rem] border border-[rgba(18,48,38,0.12)] bg-white/80 p-8 shadow-[0_24px_70px_rgba(11,61,46,0.10)] md:p-12">
          <a className="inline-flex items-center gap-2 text-sm font-black text-[var(--green)]" href="/#projects">
            <ArrowLeft size={18} />
            返回作品区
          </a>
          <h1 className="mt-8 text-4xl font-black md:text-6xl">没有找到这个作品</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#617268]">
            这个项目可能已经在后台被删除或改名。可以回到作品区查看当前公开的项目列表。
          </p>
        </div>
      </main>
    );
  }

  const Icon = project.icon;
  const highlights = makeHighlights(project);
  const scenarios = makeScenarios(project);

  return (
    <main className="bg-[#fff9ec] text-[var(--deep)]">
      <section className="px-6 pb-20 pt-28 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="inline-flex items-center gap-2 text-sm font-black text-[var(--green)]" href="/#projects">
              <ArrowLeft size={18} />
              返回作品区
            </a>
            <div className="mt-8 flex items-center gap-3 text-[var(--green)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f3df]">
                <Icon size={24} />
              </span>
              <span className="text-sm font-black uppercase tracking-[0.22em]">{project.type}</span>
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">{project.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#617268]">{project.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[rgba(18,48,38,0.12)] bg-white px-4 py-2 text-sm font-black text-[var(--deep)]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn-flow bg-[var(--deep)] text-[var(--cream)]" href={project.href} target="_blank" rel="noopener noreferrer">
                打开线上项目
                <ExternalLink size={18} />
              </a>
              <a className="btn-flow border border-[rgba(18,48,38,0.16)] bg-white text-[var(--deep)]" href="/#projects">
                返回作品区
              </a>
            </div>
          </motion.div>

          <motion.div
            className="shadow-[0_30px_80px_rgba(11,61,46,0.18)]"
            initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCover
              className={`min-h-[360px] rounded-[2.4rem] bg-gradient-to-br ${paletteClass[project.palette]}`}
              src={project.cover}
              title={project.name}
              kind={project.type}
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--forest)] px-6 py-20 text-[var(--cream)] md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, title: '项目定位', body: project.type },
            { icon: Layers, title: '展示内容', body: `${project.tags.slice(0, 3).join(' / ') || '作品展示'} 方向` },
            { icon: MousePointer2, title: '访问方式', body: '详情说明 + 线上项目入口' },
          ].map((item) => (
            <motion.article
              key={item.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <item.icon className="text-[#9de8c2]" size={24} />
              <h2 className="mt-5 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 leading-7 text-[#d8eadf]">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--green)]">Story</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">把项目讲清楚，而不是只放一个链接。</h2>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/78 p-6 shadow-[0_18px_50px_rgba(11,61,46,0.08)]">
              <h3 className="text-2xl font-black">核心亮点</h3>
              <div className="mt-5 grid gap-3">
                {highlights.map((item) => (
                  <p key={item} className="rounded-2xl bg-[#f2ead8] px-4 py-3 leading-7 text-[#44564d]">{item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/78 p-6 shadow-[0_18px_50px_rgba(11,61,46,0.08)]">
              <h3 className="text-2xl font-black">适合展示的场景</h3>
              <div className="mt-5 grid gap-3">
                {scenarios.map((item) => (
                  <p key={item} className="rounded-2xl bg-[#eef6ea] px-4 py-3 leading-7 text-[#44564d]">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-16 lg:px-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--green)]">More Projects</p>
              <h2 className="mt-4 text-4xl font-black">继续查看其它作品</h2>
            </div>
            <a className="btn-flow bg-[var(--deep)] text-[var(--cream)]" href="/#projects">
              回到作品墙
            </a>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <a key={item.id} className="group rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/78 p-4 shadow-[0_18px_50px_rgba(11,61,46,0.08)] transition hover:-translate-y-1" href={`/projects/${item.id}`}>
                <ProjectCover
                  className={`h-40 rounded-[1.2rem] bg-gradient-to-br ${paletteClass[item.palette]}`}
                  src={item.cover}
                  title={item.name}
                  kind={item.type}
                />
                <p className="mt-4 text-sm font-black text-[var(--green)]">{item.type}</p>
                <h3 className="mt-2 text-2xl font-black">{item.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
