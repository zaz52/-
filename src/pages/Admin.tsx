import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  Upload,
  UploadCloud,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { defaultProjects } from '../data/projects';
import type { ProjectIconKey, ProjectPalette, ProjectRecord } from '../data/projectTypes';

const iconOptions: { value: ProjectIconKey; label: string }[] = [
  { value: 'sparkles', label: '星光' },
  { value: 'fileText', label: '文档' },
  { value: 'presentation', label: '演示' },
  { value: 'heartPulse', label: '健康' },
  { value: 'cloud', label: '云端' },
];

const paletteOptions: { value: ProjectPalette; label: string }[] = [
  { value: 'emerald', label: '森林绿' },
  { value: 'blue', label: '科技蓝' },
  { value: 'orange', label: '珊瑚橙' },
  { value: 'mint', label: '自然绿' },
  { value: 'cyan', label: '松石青' },
  { value: 'violet', label: '蓝紫' },
];

const categoryOptions = [
  { value: 'all', label: '全部' },
  { value: 'featured', label: '主推' },
  { value: 'github', label: 'GitHub' },
  { value: 'ai', label: 'AI' },
  { value: 'web', label: '网站 / UI' },
  { value: 'automation', label: '自动化' },
  { value: 'missing-cover', label: '缺封面' },
] as const;

type ProjectCategory = typeof categoryOptions[number]['value'];

type AnalyticsSummary = {
  total: number;
  today: number;
  recentDays: { date: string; views: number }[];
  topPages: { label: string; count: number }[];
  topReferrers: { label: string; count: number }[];
  devices: { label: string; count: number }[];
  browsers: { label: string; count: number }[];
  updatedAt: string | null;
};

const emptyProject = (): ProjectRecord => ({
  id: crypto.randomUUID(),
  iconKey: 'sparkles',
  name: '新作品',
  type: '项目类型',
  description: '写一句清楚的作品介绍。',
  href: 'https://',
  cover: '/covers/resource-vault.svg',
  tags: ['New'],
  palette: 'emerald',
});

const projectMatchesCategory = (project: ProjectRecord, category: ProjectCategory) => {
  const text = `${project.id} ${project.name} ${project.type} ${project.description} ${project.href} ${project.tags.join(' ')}`.toLowerCase();
  if (category === 'all') return true;
  if (category === 'featured') return Boolean(project.featured);
  if (category === 'github') return project.id.startsWith('github-') || text.includes('github.com');
  if (category === 'ai') return text.includes('ai');
  if (category === 'web') return /web|ui|portfolio|cloudflare|react|html|网站|界面|移动端/.test(text);
  if (category === 'automation') return /automation|fastapi|deploy|agent|自动化|部署|脚本/.test(text);
  if (category === 'missing-cover') return !project.cover?.trim();
  return true;
};

async function compressImage(file: File) {
  const image = new Image();
  const url = URL.createObjectURL(file);
  image.src = url;
  await image.decode();

  const maxSize = 1280;
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);
  return canvas.toDataURL('image/jpeg', 0.82);
}

export function Admin() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPassword') ?? '');
  const [unlocked, setUnlocked] = useState(false);
  const [projects, setProjects] = useState<ProjectRecord[]>(defaultProjects);
  const [message, setMessage] = useState('输入后台密码后管理作品。');
  const [saving, setSaving] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('all');
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => new Set());
  const [coverStatus, setCoverStatus] = useState<Record<string, 'ok' | 'error' | 'missing'>>({});
  const importInputRef = useRef<HTMLInputElement>(null);
  const mobileCollapseInitializedRef = useRef(false);

  const featuredId = useMemo(() => projects.find((project) => project.featured)?.id ?? projects[0]?.id, [projects]);
  const visibleProjects = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return projects.filter((project) => {
      const text = `${project.name} ${project.type} ${project.description} ${project.href} ${project.tags.join(' ')}`.toLowerCase();
      return projectMatchesCategory(project, category) && (!keyword || text.includes(keyword));
    });
  }, [category, projects, query]);
  const getPassword = () => passwordInputRef.current?.value || password;

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('加载失败')))
      .then((data: ProjectRecord[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          if (!mobileCollapseInitializedRef.current && window.innerWidth < 768) {
            setCollapsedIds(new Set(data.map((project) => project.id)));
            mobileCollapseInitializedRef.current = true;
          }
        }
      })
      .catch(() => setMessage('云端数据暂时不可用，正在显示本地默认作品。'));
  }, []);

  const loadAnalytics = async (authPassword = getPassword()) => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch('/api/analytics/summary', {
        headers: { authorization: `Bearer ${authPassword}` },
      });
      if (!response.ok) throw new Error('Analytics unavailable');
      setAnalytics(await response.json() as AnalyticsSummary);
    } catch {
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const login = async (authPassword = getPassword()) => {
    const response = await fetch('/api/admin-check', {
      headers: { authorization: `Bearer ${authPassword}` },
    });
    if (!response.ok) {
      setMessage('密码不正确。');
      return;
    }
    setPassword(authPassword);
    sessionStorage.setItem('adminPassword', authPassword);
    setUnlocked(true);
    await loadAnalytics(authPassword);
    setMessage('已登录，可以编辑作品。');
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (!savedPassword) return;

    void fetch('/api/admin-check', {
      headers: { authorization: `Bearer ${savedPassword}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Unauthorized');
        setUnlocked(true);
        return fetch('/api/analytics/summary', {
          headers: { authorization: `Bearer ${savedPassword}` },
        });
      })
      .then((response) => {
        if (!response.ok) throw new Error('Analytics unavailable');
        return response.json();
      })
      .then((data: AnalyticsSummary) => {
        setAnalytics(data);
      })
      .catch(() => {
        sessionStorage.removeItem('adminPassword');
      });
  }, []);

  const updateProject = (id: string, patch: Partial<ProjectRecord>) => {
    setProjects((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  };

  const setFeatured = (id: string) => {
    setProjects((items) => items.map((item) => ({ ...item, featured: item.id === id })));
  };

  const moveProject = (id: string, direction: -1 | 1) => {
    setProjects((items) => {
      const index = items.findIndex((item) => item.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= items.length) return items;
      const copy = [...items];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const toggleCollapsed = (id: string) => {
    setCollapsedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const collapseAll = () => setCollapsedIds(new Set(projects.map((project) => project.id)));
  const expandAll = () => setCollapsedIds(new Set());

  const logout = () => {
    sessionStorage.removeItem('adminPassword');
    setPassword('');
    setUnlocked(false);
    setAnalytics(null);
    setMessage('已退出登录。');
  };

  const exportProjects = () => {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `weiyiai-projects-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('已导出当前作品 JSON 备份。');
  };

  const importProjects = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text) as ProjectRecord[];
      if (!Array.isArray(data) || data.length === 0) throw new Error('Invalid project backup');
      const normalized = data.map((project, index) => ({
        ...project,
        id: project.id || crypto.randomUUID(),
        iconKey: project.iconKey || 'sparkles',
        name: project.name || `导入作品 ${index + 1}`,
        type: project.type || '项目类型',
        description: project.description || '写一句清楚的作品介绍。',
        href: project.href || 'https://',
        cover: project.cover || '/covers/resource-vault.svg',
        tags: Array.isArray(project.tags) ? project.tags : ['Imported'],
        palette: project.palette || 'emerald',
      }));
      setProjects(normalized);
      setCollapsedIds(new Set());
      setMessage(`已导入 ${normalized.length} 个作品，确认无误后请点击“保存作品”。`);
    } catch {
      setMessage('导入失败，请确认文件是从后台导出的 JSON。');
    } finally {
      if (importInputRef.current) importInputRef.current.value = '';
    }
  };

  const save = async () => {
    setSaving(true);
    setMessage('正在保存...');
    try {
      const payload = projects.map((project, index) => ({
        ...project,
        featured: project.id === featuredId || (!featuredId && index === 0),
      }));
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${password}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('保存失败');
      const saved = await response.json() as ProjectRecord[];
      setProjects(saved);
      setMessage('已保存，前台会读取最新作品。');
    } catch {
      setMessage('保存失败，请检查密码或稍后重试。');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff9ec] px-4 pb-32 pt-8 text-[var(--deep)] md:px-10 md:py-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 border-b border-[rgba(18,48,38,0.14)] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--green)]">Admin</p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">作品管理后台</h1>
            <p className="mt-4 max-w-2xl text-[#617268]">添加作品、上传封面、设置主推和调整排序，保存后前台自动读取云端数据。</p>
          </div>
          <a className="btn-flow border border-[rgba(18,48,38,0.16)] bg-white text-[var(--deep)]" href="/">
            <Eye size={18} />
            查看前台
          </a>
        </div>

        <section className="mt-8 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/72 p-5 shadow-[0_18px_48px_rgba(11,61,46,0.08)]">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
            <input
              ref={passwordInputRef}
              className="ds-input"
              type="password"
              placeholder="后台密码"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn-flow bg-[var(--deep)] text-[var(--cream)]" type="button" onClick={() => login()}>
              登录
            </button>
            <button className="btn-flow border border-[rgba(18,48,38,0.16)] bg-white text-[var(--deep)] disabled:opacity-50" type="button" onClick={logout} disabled={!unlocked}>
              <LogOut size={18} />
              退出
            </button>
            <button className="btn-flow bg-[var(--green)] text-white disabled:opacity-50" type="button" onClick={save} disabled={!unlocked || saving}>
              <Save size={18} />
              保存作品
            </button>
          </div>
          <p className="mt-4 text-sm font-bold text-[#617268]">{message}</p>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-[#0b3d2e] p-5 text-[#fff4e1] shadow-[0_18px_48px_rgba(11,61,46,0.16)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#28c7b7]">Analytics</p>
                <h2 className="mt-2 text-3xl font-black">访问统计</h2>
                <p className="mt-2 text-sm text-[#dad7ce]">
                  {analytics?.updatedAt ? `最后更新：${new Date(analytics.updatedAt).toLocaleString('zh-CN')}` : '等待第一批访问数据。'}
                </p>
              </div>
              <button className="btn-flow bg-[#fff4e1] text-[#123026] disabled:opacity-60" type="button" onClick={() => loadAnalytics()} disabled={!unlocked || analyticsLoading}>
                <RefreshCw size={18} />
                刷新统计
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-[#dad7ce]">总浏览量</p>
                <p className="mt-2 text-4xl font-black">{analytics?.total ?? 0}</p>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-[#dad7ce]">今日浏览</p>
                <p className="mt-2 text-4xl font-black">{analytics?.today ?? 0}</p>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-[#dad7ce]">最近 14 天</p>
                <p className="mt-2 text-4xl font-black">
                  {analytics?.recentDays.reduce((sum, day) => sum + day.views, 0) ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#dad7ce]">
                  <BarChart3 size={16} />
                  14 天趋势
                </div>
                <div className="mt-4 flex h-36 items-end gap-2">
                  {(analytics?.recentDays ?? []).map((day) => {
                    const max = Math.max(1, ...(analytics?.recentDays.map((item) => item.views) ?? [1]));
                    return (
                      <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-t bg-[#28c7b7]" style={{ height: `${Math.max(8, (day.views / max) * 112)}px` }} title={`${day.date}: ${day.views}`} />
                        <span className="text-[10px] text-[#dad7ce]">{day.date.slice(5)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-bold text-[#dad7ce]">设备 / 浏览器</p>
                <div className="mt-4 grid gap-3 text-sm">
                  {[...(analytics?.devices ?? []), ...(analytics?.browsers ?? [])].map((item) => (
                    <div key={`${item.label}-${item.count}`} className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span className="font-black">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-bold text-[#dad7ce]">热门页面</p>
                <div className="mt-4 grid gap-3 text-sm">
                  {(analytics?.topPages ?? []).map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3">
                      <span className="truncate">{item.label}</span>
                      <span className="font-black">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-bold text-[#dad7ce]">访问来源</p>
                <div className="mt-4 grid gap-3 text-sm">
                  {(analytics?.topReferrers ?? []).map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3">
                      <span className="truncate">{item.label}</span>
                      <span className="font-black">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </section>

        <section className="admin-mobile-tools sticky top-3 z-20 mt-8 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/90 p-5 shadow-[0_18px_48px_rgba(11,61,46,0.08)] backdrop-blur md:static">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-[#fff9ec] px-4">
              <Search size={19} className="text-[var(--green)]" />
              <input
                className="w-full bg-transparent text-base font-bold outline-none placeholder:text-[#8a9a90]"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索名称、类型、标签、介绍或链接"
              />
            </label>
            <div className="admin-filter-strip flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`rounded-full px-4 py-3 text-sm font-black transition ${
                    category === option.value ? 'bg-[var(--deep)] text-[var(--cream)]' : 'bg-[#eef4df] text-[var(--deep)] hover:bg-[#e0edd2]'
                  }`}
                  onClick={() => setCategory(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-black text-[#617268]">
              当前显示 {visibleProjects.length} / {projects.length} 个作品
            </p>
            <div className="admin-action-strip flex flex-wrap gap-2">
              <button className="btn-flow min-h-0 bg-[var(--coral)] px-4 py-2 text-sm text-white" type="button" onClick={() => setProjects((items) => [...items, emptyProject()])}>
                <Plus size={16} />
                添加作品
              </button>
              <button className="btn-flow min-h-0 border border-[rgba(18,48,38,0.16)] bg-white px-4 py-2 text-sm text-[var(--deep)]" type="button" onClick={exportProjects}>
                <Download size={16} />
                导出备份
              </button>
              <button className="btn-flow min-h-0 border border-[rgba(18,48,38,0.16)] bg-white px-4 py-2 text-sm text-[var(--deep)]" type="button" onClick={() => importInputRef.current?.click()}>
                <UploadCloud size={16} />
                导入恢复
              </button>
              <input
                ref={importInputRef}
                className="hidden"
                type="file"
                accept="application/json,.json"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void importProjects(file);
                }}
              />
              <button className="btn-flow min-h-0 bg-[#eef4df] px-4 py-2 text-sm text-[var(--deep)]" type="button" onClick={collapseAll}>
                全部折叠
              </button>
              <button className="btn-flow min-h-0 bg-[#eef4df] px-4 py-2 text-sm text-[var(--deep)]" type="button" onClick={expandAll}>
                全部展开
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5">
          {visibleProjects.map((project) => {
            const index = projects.findIndex((item) => item.id === project.id);
            const collapsed = collapsedIds.has(project.id);
            const status = project.cover?.trim() ? coverStatus[project.id] ?? 'missing' : 'missing';
            return (
            <article key={project.id} className="grid gap-5 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/82 p-5 shadow-[0_18px_48px_rgba(11,61,46,0.08)] lg:grid-cols-[280px_1fr]">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#e7ddc9]">
                  {project.cover?.trim() ? (
                    <img
                      className="h-full w-full object-cover"
                      src={project.cover}
                      alt={`${project.name} 封面`}
                      onLoad={() => setCoverStatus((current) => ({ ...current, [project.id]: 'ok' }))}
                      onError={() => setCoverStatus((current) => ({ ...current, [project.id]: 'error' }))}
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-[#f1eadb] p-5 text-center text-sm font-black text-[#8a6f5a]">缺少封面</div>
                  )}
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black ${
                    status === 'ok' ? 'bg-[#dff5df] text-[#176b4f]' : status === 'error' ? 'bg-[#ffe4df] text-[#8a2d22]' : 'bg-[#fff4e1] text-[#8a6f5a]'
                  }`}>
                    {status === 'ok' ? '封面正常' : status === 'error' ? '封面失败' : '等待检测'}
                  </span>
                </div>
                <label className="btn-flow mt-4 w-full cursor-pointer bg-[var(--deep)] text-[var(--cream)]">
                  <Upload size={18} />
                  上传封面
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const cover = await compressImage(file);
                      updateProject(project.id, { cover });
                    }}
                  />
                </label>
              </div>

              <div className="grid gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <button className="btn-flow min-h-0 bg-[#eef4df] px-4 py-2 text-sm text-[var(--deep)]" type="button" onClick={() => toggleCollapsed(project.id)}>
                      {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                      {collapsed ? '展开' : '折叠'}
                    </button>
                    <a className="btn-flow min-h-0 border border-[rgba(18,48,38,0.16)] bg-white px-4 py-2 text-sm text-[var(--deep)]" href={`/projects/${project.id}`} target="_blank" rel="noreferrer">
                      <Eye size={16} />
                      预览
                    </a>
                    <a className="btn-flow min-h-0 border border-[rgba(18,48,38,0.16)] bg-white px-4 py-2 text-sm text-[var(--deep)]" href={project.href} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      外链
                    </a>
                    <button className="btn-flow min-h-0 px-4 py-2 text-sm" type="button" onClick={() => setFeatured(project.id)}>
                      <Star size={16} />
                      {project.featured ? '当前主推' : '设为主推'}
                    </button>
                    <button className="btn-flow min-h-0 px-4 py-2 text-sm" type="button" onClick={() => moveProject(project.id, -1)} disabled={index === 0}>
                      <ArrowUp size={16} />
                      上移
                    </button>
                    <button className="btn-flow min-h-0 px-4 py-2 text-sm" type="button" onClick={() => moveProject(project.id, 1)} disabled={index === projects.length - 1}>
                      <ArrowDown size={16} />
                      下移
                    </button>
                  </div>
                  <button className="btn-flow min-h-0 bg-[#ffe4df] px-4 py-2 text-sm text-[#8a2d22]" type="button" onClick={() => setProjects((items) => items.filter((item) => item.id !== project.id))}>
                    <Trash2 size={16} />
                    删除
                  </button>
                </div>

                <div className="grid gap-2 rounded-2xl bg-[#fff9ec] px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-lg font-black text-[var(--deep)]">{project.name}</span>
                    {project.featured ? <span className="rounded-full bg-[#ffe4df] px-3 py-1 text-xs font-black text-[#8a2d22]">主推</span> : null}
                    <span className="rounded-full bg-[#eef4df] px-3 py-1 text-xs font-black text-[var(--green)]">第 {index + 1} 位</span>
                  </div>
                  <p className="text-sm font-bold leading-6 text-[#617268]">{project.type} · {project.tags.join(' / ')}</p>
                </div>

                {!collapsed ? <div className="grid gap-4 md:grid-cols-2">
                  <input className="ds-input" value={project.name} onChange={(event) => updateProject(project.id, { name: event.target.value })} placeholder="项目名称" />
                  <input className="ds-input" value={project.type} onChange={(event) => updateProject(project.id, { type: event.target.value })} placeholder="项目类型" />
                  <input className="ds-input md:col-span-2" value={project.href} onChange={(event) => updateProject(project.id, { href: event.target.value })} placeholder="项目链接" />
                  <textarea className="ds-input min-h-28 pt-3 md:col-span-2" value={project.description} onChange={(event) => updateProject(project.id, { description: event.target.value })} placeholder="一句介绍" />
                  <input className="ds-input" value={project.tags.join(', ')} onChange={(event) => updateProject(project.id, { tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} placeholder="标签，用英文逗号分隔" />
                  <input className="ds-input" value={project.cover} onChange={(event) => updateProject(project.id, { cover: event.target.value })} placeholder="封面 URL 或 data URL" />
                  <select className="ds-input" value={project.iconKey} onChange={(event) => updateProject(project.id, { iconKey: event.target.value as ProjectIconKey })}>
                    {iconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <select className="ds-input" value={project.palette} onChange={(event) => updateProject(project.id, { palette: event.target.value as ProjectPalette })}>
                    {paletteOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div> : null}
              </div>
            </article>
            );
          })}
          {visibleProjects.length === 0 ? (
            <div className="rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/82 p-8 text-center font-black text-[#617268]">
              没有匹配的作品，可以换个关键词或筛选条件。
            </div>
          ) : null}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(18,48,38,0.12)] bg-[#fff9ec]/95 p-3 shadow-[0_-18px_45px_rgba(11,61,46,0.12)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <button className="btn-flow min-h-12 bg-[var(--green)] px-3 py-2 text-sm text-white disabled:opacity-50" type="button" onClick={save} disabled={!unlocked || saving}>
            <Save size={16} />
            保存
          </button>
          <button className="btn-flow min-h-12 bg-[var(--coral)] px-3 py-2 text-sm text-white" type="button" onClick={() => setProjects((items) => [...items, emptyProject()])}>
            <Plus size={16} />
            新增
          </button>
          <button className="btn-flow min-h-12 bg-[#eef4df] px-3 py-2 text-sm text-[var(--deep)]" type="button" onClick={collapseAll}>
            <ChevronRight size={16} />
            折叠
          </button>
        </div>
        <p className="mt-2 truncate text-center text-xs font-bold text-[#617268]">{message}</p>
      </div>
    </main>
  );
}
