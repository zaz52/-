import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { applySeo } from '../lib/seo';
import { useEffect } from 'react';
import { ProjectCover } from '../components/ui/ProjectCover';

const paletteClass: Record<string, string> = {
  emerald: 'from-[#0b3d2e] to-[#2f8f5b]',
  violet: 'from-[#372d67] to-[#6a7bff]',
  blue: 'from-[#17486c] to-[#28c7b7]',
  orange: 'from-[#8a4d2a] to-[#ff7a66]',
  mint: 'from-[#1d604f] to-[#a8df9f]',
  cyan: 'from-[#0b3d2e] to-[#28c7b7]',
};

const categories = [
  { id: 'all', label: '全部' },
  { id: 'featured', label: '主推' },
  { id: 'ai', label: 'AI 工具' },
  { id: 'github', label: 'GitHub 项目' },
  { id: 'web', label: '网站 / UI' },
  { id: 'automation', label: '自动化' },
];

const inCategory = (project: { id: string; featured?: boolean; type: string; tags: string[] }, category: string) => {
  const haystack = `${project.id} ${project.type} ${project.tags.join(' ')}`.toLowerCase();
  if (category === 'all') return true;
  if (category === 'featured') return Boolean(project.featured);
  if (category === 'github') return project.id.startsWith('github-') || haystack.includes('github');
  if (category === 'ai') return haystack.includes('ai');
  if (category === 'web') return /web|ui|portfolio|cloudflare|react|html|移动端|界面|网站/.test(haystack);
  if (category === 'automation') return /automation|fastapi|deploy|agent|自动化|部署|脚本/.test(haystack);
  return true;
};

export function ProjectsIndex() {
  const projects = useProjects();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    applySeo({
      title: '全部作品 | Weiyi',
      description: '查看 Weiyi 的全部作品，包括 AI 工具、GitHub 项目、个人品牌网站、移动端界面、自动化工具和设计系统项目。',
      canonical: 'https://weiyiai.top/projects',
    });
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = inCategory(project, category);
      const text = `${project.name} ${project.type} ${project.description} ${project.tags.join(' ')}`.toLowerCase();
      const matchesQuery = !keyword || text.includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [category, projects, query]);

  return (
    <main className="min-h-screen bg-[#fff9ec] px-6 pb-28 pt-28 text-[var(--deep)] md:px-16 lg:px-24">
      <section className="mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--green)]">All Projects</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-7xl">全部作品，不再挤在首页。</h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#617268]">
            首页保留主推和精选，这里完整展示所有作品。你以后在后台新增项目后，也会自动出现在这个页面和 sitemap 里。
          </p>
        </div>

        <div className="mt-10 grid gap-4 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/72 p-4 shadow-[0_18px_50px_rgba(11,61,46,0.08)] lg:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-[1rem] bg-[#fff9ec] px-4 py-3">
            <Search size={19} className="text-[var(--green)]" />
            <input
              className="w-full bg-transparent text-base font-bold outline-none placeholder:text-[#8a9a90]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索作品名称、类型或标签"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`rounded-full px-4 py-3 text-sm font-black transition ${
                  category === item.id ? 'bg-[var(--deep)] text-[var(--cream)]' : 'bg-[#eef4df] text-[var(--deep)] hover:bg-[#e0edd2]'
                }`}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm font-black text-[#617268]">
          <span>共 {filtered.length} 个作品</span>
          <a className="text-[var(--green)]" href="/#projects">返回首页精选</a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              className="group overflow-hidden rounded-[1.8rem] border border-[rgba(18,48,38,0.12)] bg-white/82 p-4 shadow-[0_18px_50px_rgba(11,61,46,0.08)] transition hover:-translate-y-1"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.28) }}
            >
              <a href={`/projects/${project.id}`} className="block">
                <ProjectCover
                  className={`h-52 rounded-[1.35rem] bg-gradient-to-br ${paletteClass[project.palette]}`}
                  src={project.cover}
                  title={project.name}
                  kind={project.type}
                />
              </a>
              <div className="p-2 pt-5">
                <div className="flex items-center gap-3 text-[var(--green)]">
                  <project.icon size={21} />
                  <span className="text-xs font-black uppercase tracking-[0.18em]">{project.type}</span>
                </div>
                <a href={`/projects/${project.id}`} className="mt-4 block text-3xl font-black leading-tight tracking-[-0.03em]">
                  {project.name}
                </a>
                <p className="mt-3 min-h-20 leading-7 text-[#617268]">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#eef4df] px-3 py-1 text-xs font-black text-[var(--green)]">{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn-flow min-h-0 bg-[var(--deep)] px-4 py-3 text-sm text-[var(--cream)]" href={`/projects/${project.id}`}>
                    查看详情
                  </a>
                  <a className="btn-flow min-h-0 border border-[rgba(18,48,38,0.16)] bg-white px-4 py-3 text-sm text-[var(--deep)]" href={project.href} target="_blank" rel="noreferrer">
                    打开链接
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
