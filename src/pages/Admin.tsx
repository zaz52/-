import { ArrowDown, ArrowUp, BarChart3, Eye, Plus, RefreshCw, Save, Star, Trash2, Upload } from 'lucide-react';
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

  const featuredId = useMemo(() => projects.find((project) => project.featured)?.id ?? projects[0]?.id, [projects]);
  const getPassword = () => passwordInputRef.current?.value || password;

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('加载失败')))
      .then((data: ProjectRecord[]) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
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
    <main className="min-h-screen bg-[#fff9ec] px-5 py-10 text-[var(--deep)] md:px-10">
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
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
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

        <div className="mt-8 flex justify-end">
          <button className="btn-flow bg-[var(--coral)] text-white" type="button" onClick={() => setProjects((items) => [...items, emptyProject()])}>
            <Plus size={18} />
            添加作品
          </button>
        </div>

        <section className="mt-6 grid gap-5">
          {projects.map((project, index) => (
            <article key={project.id} className="grid gap-5 rounded-[1.5rem] border border-[rgba(18,48,38,0.12)] bg-white/82 p-5 shadow-[0_18px_48px_rgba(11,61,46,0.08)] lg:grid-cols-[280px_1fr]">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#e7ddc9]">
                  <img className="h-full w-full object-cover" src={project.cover} alt={`${project.name} 封面`} />
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

                <div className="grid gap-4 md:grid-cols-2">
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
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
