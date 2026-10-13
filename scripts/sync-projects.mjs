/**
 * 从 GitHub 自动同步公开仓库到网站作品区。
 *
 * 逻辑：
 * 1. 拉取 zaz52 的公开仓库（跳过 fork / archived / 本站仓库本身）。
 * 2. 已在 src/data/curated.json 里手工维护的（按 github 字段匹配）跳过——人工优先。
 * 3. 其余新仓库写入 src/data/generated.json（按最近 push 排序）。
 * 4. src/data/siteProjects.ts = curated + generated，供 App 渲染。
 *
 * 由 .github/workflows/sync-projects.yml 每天自动运行，也可本地 `node scripts/sync-projects.mjs`。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CURATED_PATH = join(ROOT, 'src/data/curated.json');
const GENERATED_PATH = join(ROOT, 'src/data/generated.json');

const USER = 'zaz52';
// 本站仓库本身：是网站源码，不是作品，不同步
const SELF_REPOS = new Set([`${USER}/-`, `${USER}/yi-corner`]);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'yi-corner-sync-script',
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function fetchAllRepos() {
  const repos = [];
  let url = `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`;
  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    repos.push(...(await res.json()));
    const link = res.headers.get('link');
    const next = link?.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }
  return repos;
}

function main() {
  const curated = JSON.parse(readFileSync(CURATED_PATH, 'utf-8'));
  const curatedGithub = new Set(curated.map((p) => p.github).filter(Boolean));

  return fetchAllRepos().then((repos) => {
    const fresh = [];
    for (const r of repos) {
      if (r.fork || r.archived) continue;
      if (SELF_REPOS.has(r.full_name)) continue;
      if (curatedGithub.has(r.html_url)) continue; // 人工已维护，跳过
      fresh.push({
        name: r.name,
        type: 'GitHub 开源项目',
        desc: r.description?.trim() || 'GitHub 上的开源项目。',
        href: r.homepage?.trim() || r.html_url,
        tags: [r.language].filter(Boolean),
        featured: false,
        github: r.html_url,
        pushedAt: r.pushed_at,
      });
    }
    // 最近有动态的排前面；为保证输出稳定，同 pushedAt 按仓库名排序
    fresh.sort(
      (a, b) =>
        new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime() ||
        a.name.localeCompare(b.name),
    );
    for (const p of fresh) delete p.pushedAt;

    writeFileSync(GENERATED_PATH, JSON.stringify(fresh, null, 2) + '\n');
    console.log(`synced ${fresh.length} repos -> src/data/generated.json`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
