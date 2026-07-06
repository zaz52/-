type SeoInput = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
};

const SITE_URL = 'https://weiyiai.top';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

const setMeta = (selector: string, attribute: 'content' | 'href', value: string) => {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

export function applySeo({ title, description, canonical, image = DEFAULT_IMAGE, noindex = false }: SeoInput) {
  if (typeof document === 'undefined') return;

  const url = canonical ?? `${SITE_URL}${window.location.pathname}`;
  document.title = title;

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[name="robots"]', 'content', noindex ? 'noindex,nofollow' : 'index,follow');
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:image"]', 'content', image);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', image);
}

export const routeSeo = {
  home: {
    title: 'Weiyi | 复古科技青春自然个人网站',
    description: 'Weiyi 的个人作品集，展示 AI 工具、个人品牌网页、移动端界面、设计系统与复古科技自然风格项目。',
  },
  designSystem: {
    title: '设计系统 | Weiyi',
    description: 'Weiyi 的复古科技、青春自然风格设计系统，包含色彩、字体、按钮、卡片、表单和移动端组件。',
  },
  skills: {
    title: 'AI 工作流与 Skills | Weiyi',
    description: 'Weiyi 沉淀的 AI 工作流、Codex skills、自动化方法和可复用项目经验。',
  },
  projects: {
    title: '全部作品 | Weiyi',
    description: '查看 Weiyi 的全部作品，包括 AI 工具、GitHub 项目、个人品牌网站、移动端界面、自动化工具和设计系统项目。',
  },
  admin: {
    title: '后台管理 | Weiyi',
    description: 'Weiyi 个人网站后台管理入口。',
    noindex: true,
  },
};
