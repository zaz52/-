# Weiyi Portfolio

Weiyi 的个人作品集与 UI 设计系统网站。当前视觉方向为“复古科技 + 青春自然”，用于展示在线作品、网页/移动端界面、卡片、控件、按钮、图标、间距、圆角和联系方式。

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react

## 设计系统

核心模块位于首页：

- 色彩与字体
- 按钮、输入框、下拉、开关、选择控件
- 卡片样式和内容卡片
- Web 页面预览与移动端界面预览
- 间距、圆角、图标系统
- 提示、徽章、标签和联系方式组件

设计 token 位于 `src/data/designSystem.ts`，个人内容位于 `src/data/portfolio.ts`。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`，可直接部署到 Netlify。

## 内容维护

主要内容集中在 `src/data/portfolio.ts`：

- 个人定位与简介
- 在线作品入口
- 项目案例
- 联系方式

头像文件位于 `public/avatar.jpg`。替换头像时保持同名文件即可。

## 联系方式

- Email: 1845779520@qq.com
- WeChat: Z3_March
- X: https://x.com/Weiyi_Learn
- QQ: 1845779520
- Telegram: https://t.me/Weiyiusername
- GitHub: https://github.com/zaz52
