const PROJECTS_KEY = 'projects';

const DEFAULT_PROJECTS = [
  {
    id: 'magic-resume',
    iconKey: 'fileText',
    name: '魔方简历',
    type: 'AI 简历编辑器',
    description: 'AI 驱动的在线简历编辑器，强调免费与隐私优先。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    cover: '/covers/magic-resume.png',
    tags: ['AI', 'Resume', 'Productivity'],
    palette: 'blue',
    featured: true,
  },
  {
    id: 'ppt-master',
    iconKey: 'presentation',
    name: 'PPT Master',
    type: 'AI 文档工具',
    description: 'AI 一键生成可编辑 PPTX，关注原生动画与排版。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    cover: '/covers/ppt-master.svg',
    tags: ['AI', 'PPTX', 'Presentation'],
    palette: 'orange',
  },
  {
    id: 'elder-health',
    iconKey: 'heartPulse',
    name: '老年健康',
    type: '健康资讯平台',
    description: '面向长辈健康关怀的信息平台，强调移动端可读性。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    cover: '/covers/elder-health.png',
    tags: ['Health', 'Mobile', 'Content'],
    palette: 'mint',
  },
  {
    id: 'yulesuangua',
    iconKey: 'sparkles',
    name: '乾坤之道',
    type: 'AI + 周易工具',
    description: '把传统卦象与 AI 解读结合，提供更具仪式感的在线问事体验。',
    href: 'https://yulesuangua.pages.dev/',
    cover: '/covers/yulesuangua.svg',
    tags: ['AI', 'Divination', 'Cloudflare'],
    palette: 'emerald',
  },
  {
    id: 'resource-vault',
    iconKey: 'cloud',
    name: '虚拟资料库',
    type: '资源整理入口',
    description: '学习资源、工具与素材的整理入口。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    cover: '/covers/resource-vault.svg',
    tags: ['Resource', 'Collection'],
    palette: 'cyan',
  },
];

const ICON_KEYS = new Set(['cloud', 'fileText', 'heartPulse', 'presentation', 'sparkles']);
const PALETTES = new Set(['blue', 'orange', 'mint', 'emerald', 'cyan', 'violet']);

const json = (data, init = {}) => new Response(JSON.stringify(data), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    ...(init.headers || {}),
  },
});

const isAuthorized = (request, env) => {
  const password = env.ADMIN_PASSWORD;
  if (!password) return false;
  return request.headers.get('authorization') === `Bearer ${password}`;
};

const normalizeText = (value, maxLength) => String(value ?? '').trim().slice(0, maxLength);

const normalizeProjects = (input) => {
  if (!Array.isArray(input)) throw new Error('Projects must be an array');
  if (input.length > 50) throw new Error('Too many projects');

  const projects = input.map((item, index) => {
    const id = normalizeText(item.id || crypto.randomUUID(), 80).replace(/[^a-zA-Z0-9_-]/g, '-') || crypto.randomUUID();
    const iconKey = ICON_KEYS.has(item.iconKey) ? item.iconKey : 'sparkles';
    const palette = PALETTES.has(item.palette) ? item.palette : 'emerald';
    const tags = Array.isArray(item.tags) ? item.tags : String(item.tags ?? '').split(',');
    const cover = normalizeText(item.cover, 2_000_000);

    return {
      id,
      iconKey,
      name: normalizeText(item.name, 80) || `作品 ${index + 1}`,
      type: normalizeText(item.type, 80) || '项目',
      description: normalizeText(item.description, 260),
      href: normalizeText(item.href, 500),
      cover: cover || '/covers/resource-vault.svg',
      tags: tags.map((tag) => normalizeText(tag, 28)).filter(Boolean).slice(0, 8),
      palette,
      featured: Boolean(item.featured),
    };
  });

  const firstFeatured = projects.findIndex((project) => project.featured);
  projects.forEach((project, index) => {
    project.featured = firstFeatured >= 0 ? index === firstFeatured : index === 0;
  });

  return projects;
};

const getProjects = async (env) => {
  const saved = await env.PROJECTS_KV?.get(PROJECTS_KEY);
  if (!saved) return DEFAULT_PROJECTS;

  try {
    return normalizeProjects(JSON.parse(saved));
  } catch {
    return DEFAULT_PROJECTS;
  }
};

const handleApi = async (request, env, url) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

  if (url.pathname === '/api/projects' && request.method === 'GET') {
    return json(await getProjects(env));
  }

  if (url.pathname === '/api/admin-check' && request.method === 'GET') {
    if (!isAuthorized(request, env)) return json({ ok: false }, { status: 401 });
    return json({ ok: true });
  }

  if (url.pathname === '/api/projects' && request.method === 'PUT') {
    if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });
    const projects = normalizeProjects(await request.json());
    await env.PROJECTS_KV.put(PROJECTS_KEY, JSON.stringify(projects));
    return json(projects);
  }

  return json({ error: 'Not found' }, { status: 404 });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) return handleApi(request, env, url);

    if (!url.pathname.split('/').pop()?.includes('.')) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = '/';
      return env.ASSETS.fetch(new Request(indexUrl.toString(), { method: 'GET' }));
    }

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch {
      // Unknown SPA routes are handled by the index fallback below.
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = '/';
    return env.ASSETS.fetch(new Request(indexUrl.toString(), { method: 'GET' }));
  },
};
