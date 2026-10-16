# 壹隅 YI CORNER

Songyu 的个人网站 —— 作品、工具与日常。[weiyiai.top](https://weiyiai.top/)

## 网站内容

- **作品 / PROJECTS**：10 个精选项目（乾坤之道、魔方简历、PPT Master、银龄守护等）
- **乾坤之道 / DIVINATION**：站内直接开算的 AI 问事平台
- **苍柏影院 / CINEMA**：免费观影入口
- **工具箱 / TOOLBOX**：5 大类 25 个精选工具，含 8 个自制站点（带"自制"徽标）
- **小游戏**：星尘躲避、记忆翻牌
- **音乐播放器**：右下角悬浮歌单播放器
- **留言板**：访客留言

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`，通过 GitHub Actions 自动部署到 Cloudflare Worker。

## 内容维护

- 作品数据：`src/data/curated.json`（精选）+ `src/data/generated.json`（自动同步）
- 工具箱数据：`src/data/toolbox.ts`（后续补充往对应分类的 tools 数组加一行即可）
- 联系方式：`src/data/contacts.json`

## 🔗 联系方式

- GitHub：https://github.com/zaz52
- X：https://x.com/Cangbaic
- Telegram：https://t.me/CANGBAIC
- WhatsApp：+44 7343 121534
