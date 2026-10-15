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
  hidden?: boolean;
}

/**
 * 网站作品区的数据 = 精选 curated（手动维护，优先展示）+ 自动同步的 GitHub 新仓库。
 * 新仓库由 scripts/sync-projects.mjs + GitHub Actions 每天自动写入 generated.json。
 * curated 里标 hidden: true 的是刻意下架的仓库（重复/备份/低质），同步脚本按 github 字段去重，不会再加回来。
 */
const visible = (list: SiteProject[]) => list.filter((p) => !p.hidden);

export const defaultProjects: SiteProject[] = [
  ...visible(curated as SiteProject[]),
  ...visible(generated as SiteProject[]),
];
