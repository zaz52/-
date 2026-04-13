# Weiyi 个人名片页

一个暗色科技风格的个人介绍页面，展示个人信息、网站、项目和联系方式。

## 预览

在线访问：[点击查看](https://7883fd64-bba3-4ab2-bb77-97e88d428b3b.dev.coze.site)

## 技术栈

- HTML5
- CSS3（CSS 变量、Flexbox、Grid、Backdrop-filter 毛玻璃效果）
- JavaScript（原生交互）
- Font Awesome 6.4.0（图标库）

## 项目结构

```
.
├── index.html          # 页面主文件
├── styles/
│   └── main.css        # 完整样式表
├── public/
│   └── avatar.jpg      # 头像图片
└── README.md           # 项目说明
```

## 功能模块

- **固定导航栏** — 滚动时毛玻璃效果，支持移动端汉堡菜单
- **Hero 头部区** — 头像、个人标语、标签云、CTA 按钮
- **三栏自我介绍** — 我是谁 / 在做什么 / 为什么值得关注
- **我的网站** — 可点击的网站卡片展示区
- **项目展示** — 大卡片式项目列表
- **信任构建区** — 适合谁看 / 为什么信我
- **联系方式** — 列表式大卡片（邮箱 / 微信 / QQ / Telegram / GitHub 等）
- **微信弹窗** — 点击弹出二维码/微信号

## 使用方法

1. 克隆仓库
```bash
git clone https://github.com/zaz52/-.git
```

2. 直接用浏览器打开 `index.html`，或使用本地服务器：
```bash
python -m http.server 5000
```

然后访问 `http://localhost:5000`

## 自定义修改

### 替换头像
将你的照片替换 `public/avatar.jpg` 即可。

### 修改联系方式
编辑 `index.html` 中「联系我」区域对应的链接和文字。

### 添加网站卡片
在「我的网站」区域的 `<div class="skills-list">` 中复制 `<a>` 卡片模板并修改内容。

### 修改主题色
编辑 `styles/main.css` 顶部的 `:root` CSS 变量。

## License

MIT
