export interface ToolboxTool {
  name: string;
  desc: string;
  url: string;
  /** 是否为站长自己的作品 */
  mine?: boolean;
}

export interface ToolboxCategory {
  emoji: string;
  name: string;
  tools: ToolboxTool[];
}

/**
 * 工具箱数据：第三方精选 + 站长自制（mine: true）。
 * 后续补充：往对应分类的 tools 数组里加一行即可。
 */
export const toolbox: ToolboxCategory[] = [
  {
    emoji: '🤖', name: 'AI 效率',
    tools: [
      { name: '乾坤之道', desc: '东方术数 + AI 问事平台，直接开算', url: 'https://suangua.weiyiai.top/', mine: true },
      { name: 'PPT Master', desc: '文档/网址转真正可编辑的原生 PPT', url: 'https://ppt-master-weiyi.netlify.app/', mine: true },
      { name: '魔方简历', desc: '免费隐私优先的 AI 简历编辑器', url: 'https://magic-resume-weiyi.netlify.app/', mine: true },
      { name: 'PDD 电商图片工作流', desc: '商品主图/Banner/详情页 AI 生成', url: 'https://github.com/zaz52/pdd-ecommerce-workflow', mine: true },
      { name: 'PDFMathTranslate', desc: 'PDF 论文一键翻译，公式表格不乱码', url: 'https://github.com/PDFMathTranslate/PDFMathTranslate' },
      { name: 'ppt-master', desc: '输入文档或主题，AI 生成原生 PPT', url: 'https://github.com/hugohe3/ppt-master' },
      { name: 'OfficeCLI', desc: '命令行里的 Office 套件，极客范', url: 'https://github.com/iOfficeAI/OfficeCLI' },
      { name: 'ChatGPT 中文调教指南', desc: '各种场景的提示词玩法，学让 AI 听话', url: 'https://github.com/PlexPt/awesome-chatgpt-prompts-zh' },
    ],
  },
  {
    emoji: '✍️', name: 'AI 写作',
    tools: [
      { name: '小说工作台', desc: '小说创作流程工作台：写作/设定/素材', url: 'https://github.com/zaz52/wei-yi', mine: true },
      { name: 'Humanizer-zh', desc: '消除文本中的 AI 痕迹，改得更像人写的', url: 'https://github.com/op7418/Humanizer-zh' },
      { name: 'ai-flavor-remover', desc: '一键去除 AI 味，文字更自然', url: 'https://github.com/hylarucoder/ai-flavor-remover' },
      { name: 'writing-dna-skill', desc: '蒸馏复刻任意写作风格，Agent 技能', url: 'https://github.com/larashero3-dotcom/writing-dna-skill' },
    ],
  },
  {
    emoji: '📱', name: '内容创作',
    tools: [
      { name: 'X-Deck', desc: '中文内容创作工作台，实时创作', url: 'https://x.weiyi.indevs.in/', mine: true },
      { name: '抖音下载器', desc: '批量下载抖音视频，无水印', url: 'https://github.com/jiji262/douyin-downloader' },
      { name: 'MultiPost', desc: '一篇文章，多平台一键发布', url: 'https://github.com/leaperone/MultiPost-Extension' },
      { name: 'lieflat-cards', desc: '把文字变成克制编辑感的图文卡片', url: 'https://github.com/larashero3-dotcom/lieflat-cards' },
      { name: 'creatorhub', desc: '多平台内容监控采集，一个面板管起', url: 'https://github.com/3441293738/creatorhub' },
    ],
  },
  {
    emoji: '🎬', name: '影音娱乐',
    tools: [
      { name: '唯影导航', desc: '全类型视频网站导航，143 个平台', url: 'https://weiyi.indevs.in/', mine: true },
      { name: 'lx-music-desktop', desc: '免费开源音乐播放器，全网搜歌随便听', url: 'https://github.com/lyswhut/lx-music-desktop' },
      { name: 'LibreTV', desc: '一分钟搭建自己的影视站', url: 'https://github.com/LibreSpark/LibreTV' },
      { name: '追剧资源指南', desc: '免费无广告追剧资源，人工精选', url: 'https://github.com/laoma528/awesome-zhuiju-free' },
    ],
  },
  {
    emoji: '🧰', name: '实用小工具',
    tools: [
      { name: '银龄守护', desc: '长辈健康关怀：饮水/睡眠/药箱/语音', url: 'https://elder-health.netlify.app/#/pages/index/index', mine: true },
      { name: '闲鱼自动回复', desc: '闲鱼客服自动回复系统，解放双手', url: 'https://github.com/zhinianboke/xianyu-auto-reply' },
      { name: '微信 AI 记忆库', desc: '微信聊天记录筛选归档，可追溯', url: 'https://github.com/ikevss/wechat-ai-memory' },
      { name: 'QzoneArchive', desc: 'QQ 空间历史动态照片视频一键备份', url: 'https://github.com/Gaoshu705/QzoneArchive' },
    ],
  },
];
