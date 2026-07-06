export type SkillEntry = {
  slug: string;
  name: string;
  source: string;
  summary: string;
  status: 'published' | 'draft';
  updatedAt: string;
  repository: string;
  tags: string[];
  mechanisms: string[];
  files: string[];
  validation: string[];
};

export const skills: SkillEntry[] = [
  {
    slug: 'codex-video-remix-workflow',
    name: 'Codex Video Remix Workflow',
    source: 'X article by xilo, 2026-07-05',
    summary:
      '把参考短视频拆成结构、镜头和节奏，再用自己的素材库做视觉匹配、配音字幕和剪映草稿生成，适合电商带货、营销混剪和批量短视频生产。',
    status: 'published',
    updatedAt: '2026-07-06',
    repository: 'https://github.com/zaz52/skills/tree/main/skills/codex-video-remix-workflow',
    tags: ['Codex', '自动剪辑', '短视频', '剪映草稿', '素材匹配'],
    mechanisms: [
      '参考视频只提供结构和节奏，最终画面来自用户自己的可复用素材库。',
      '先拆解镜头、关键帧和字幕，生成 recipe.json 作为后续步骤的依据。',
      '素材匹配必须带置信度，低置信度镜头标记缺素材，不用无关素材硬凑。',
      '配音生成后读取真实时长，再反向调整时间线和字幕。',
      '剪映草稿必须校验绝对路径、唯一 ID、时间轴、字幕和配音同步。',
    ],
    files: [
      'SKILL.md',
      'references/source-notes.md',
      'references/workflow-protocol.md',
      'references/quality-gates.md',
      'examples/retest-prompts.md',
      'scripts/check_skill_package.mjs',
    ],
    validation: ['node scripts/check_skill_package.mjs .', 'source boundary recorded', 'quality gates included'],
  },
];

export function getSkill(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}
