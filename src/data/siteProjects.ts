import curated from './curated.json';
import generated from './generated.json';

export interface SiteProject {
  name: string;
  type: string;
  desc: string;
  href: string;
  tags: string[];
  featured: boolean;
  github?: string | null;
}

/**
 * 网站作品区的数据 = 精选 curated（手动维护，优先展示）+ 自动同步的 GitHub 新仓库。
 * 新仓库由 scripts/sync-projects.mjs + GitHub Actions 每天自动写入 generated.json。
 */
export const defaultProjects: SiteProject[] = [
  ...(curated as SiteProject[]),
  ...(generated as SiteProject[]),
];
