# 星鹊软件工作室 · Synkue Studio 官网

> 一个面向 ToB 软件定制开发、技术外包、小型系统、小程序/网站定制、技术咨询的轻量品牌门户。
> **零构建、零依赖、开箱即用。**

---

## ✨ 项目特点

- **极简现代**：科技深蓝 + 浅青配色 + 极客风代码插画
- **完全响应式**：移动端优先，自适应手机 / 平板 / 桌面
- **暗黑模式**：一键切换 + 自动跟随系统偏好 + LocalStorage 记忆
- **零构建工具**：纯 HTML + Tailwind CSS（CDN）+ 原生 JavaScript
- **首屏极快**：无 npm、无 webpack、无打包，浏览器直接打开即可运行
- **SEO 就绪**：含 Title / Description / Keywords / OG 元标签
- **方便维护**：所有文案、配色、链接均可在源码中直接修改
- **轻量动效**：滚动入场、毛玻璃导航、粒子背景、hover 上浮，绝不臃肿

---

## 📁 目录结构

```
synkue/
├── index.html              主页面（所有文案、模块结构都在这里）
├── README.md               本文档
└── assets/
    ├── css/
    │   └── style.css       自定义样式（动画、组件卡片、暗黑模式补充）
    ├── js/
    │   └── main.js         交互脚本（导航、菜单、主题、动画、表单、粒子）
    └── images/
        ├── favicon.svg     站点图标
        └── README.md       图片资源使用说明
```

---

## 🚀 本地预览

### 方式 1：直接双击打开（最快）
直接双击 `index.html`，浏览器即可正常预览。
> ⚠️ 部分浏览器对 `file://` 协议下的 fetch / 字体加载有限制，建议使用方式 2 启动本地服务器。

### 方式 2：用 VS Code Live Server（推荐）
1. 在 VS Code 中安装扩展 `Live Server`
2. 右键 `index.html` → `Open with Live Server`
3. 浏览器会自动打开 `http://127.0.0.1:5500`

### 方式 3：用 Python（无需安装额外工具）
```bash
# Python 3
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 方式 4：用 Node.js
```bash
npx serve .
# 或
npx http-server -p 8000
```

---

## 🌐 部署上线

本项目是纯静态网站，**任何静态托管平台均可一键部署**。

### 选项 A · GitHub Pages（免费 · 国外访问快）
1. 将本项目推送到 GitHub 仓库
2. 进入仓库 `Settings` → `Pages`
3. `Source` 选择 `Deploy from a branch` → `main` → `/ (root)`
4. 等待 1 分钟，访问 `https://你的用户名.github.io/仓库名/`

### 选项 B · Vercel（免费 · 全球 CDN · 推荐）
1. 注册 [vercel.com](https://vercel.com) 并连接 GitHub
2. `New Project` → 选择本仓库 → `Deploy`
3. 自动获得 `xxx.vercel.app` 域名，可绑定自有域名

### 选项 C · Netlify（免费 · 同样优秀）
1. 注册 [netlify.com](https://netlify.com)
2. 直接拖拽整个项目文件夹到 Netlify 主页即可
3. 或者连接 Git 仓库自动部署

### 选项 D · 国内虚拟主机 / 云服务器（适合国内备案）
1. 通过 FTP / 宝塔面板将整个项目文件夹上传到网站根目录
   - 阿里云、腾讯云、华为云的虚拟主机：上传到 `/htdocs/` 或 `/wwwroot/`
   - 自有云服务器（Nginx）：上传到 `/var/www/html/`
2. 确保入口文件是 `index.html`
3. **国内域名上线必须 ICP 备案**，备案后可在 `index.html` 页脚替换备案号：
   ```html
   <a href="https://beian.miit.gov.cn/">苏ICP备 0000000号-1</a>
   ```

### 选项 E · 对象存储（OSS / COS）静态网站托管
- 阿里云 OSS：开启「静态网站托管」→ 上传整个目录 → 默认首页设为 `index.html`
- 腾讯云 COS：同理，开启静态网站功能即可

---

## ✏️ 自定义指南

### 1. 修改文案
所有文字内容都集中在 `index.html` 中，每个区段都有清晰注释，例如：

```html
<!-- 2. 首屏 Hero 横幅区 -->
<section id="home">
  <h1>Synkue Studio<br>星鹊软件工作室</h1>
  ...
</section>
```

直接修改即可，无需编译。

### 2. 修改主色 / 配色
打开 `index.html`，找到 `tailwind.config = { ... }` 这一段：

```js
colors: {
  brand: { 500: '#409EFF', 600: '#337ecc', 900: '#0f2542', ... },  // 主色：Element 经典蓝
  accent: { 500: '#409EFF', ... },                                  // 辅色：与主色同源
}
```

修改对应颜色值即可全站生效。

### 3. 替换案例图片
参考 `assets/images/README.md` 中的说明。

### 4. 修改联系方式
- 手机 / 微信号：搜索 `18051738385` / `180 5173 8385` 全部替换
- 邮箱：搜索 `yuxink@126.com` 全部替换
- 微信二维码：替换 `assets/images/wx.jpg` 即可
- 备案号：找到 `苏ICP备 0000000号-1` 替换为真实备案号

### 5. 接入后端 / 表单服务
默认表单提交会唤起本机邮件客户端。如需对接后端：
- 打开 `assets/js/main.js`，找到 `submitToBackend(data)` 函数注释，启用即可
- 推荐免费表单服务：[Formspree](https://formspree.io) · [Web3Forms](https://web3forms.com)

---

## 🛠️ 技术栈

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| 标记 | HTML5 | 语义化标签 |
| 样式 | Tailwind CSS v3 | CDN 引入，自定义主题 |
| 脚本 | 原生 JavaScript | 无任何框架 / 库依赖 |
| 字体 | Inter + Noto Sans SC | Google Fonts 加载 |
| 图标 | 内联 SVG | 零依赖、可着色 |
| 动效 | CSS Animation + IntersectionObserver | 极致轻量 |

**总体积（不含字体）**：< 60KB · 首屏首字节几乎瞬开

---

## 📝 常见问题 FAQ

**Q：Tailwind CDN 上线后会有性能问题吗？**
A：CDN 版 Tailwind 约 350KB（gzip 后约 70KB），对于品牌官网完全够用。如果追求极致性能，可使用 Tailwind CLI 编译为本地 CSS 文件，仅保留用到的样式（约 15KB）。

**Q：如何切换为深色为默认主题？**
A：修改 `index.html` 中的初始化脚本：
```js
// 默认深色：将默认逻辑改为
if (saved !== 'light') document.documentElement.classList.add('dark');
```

**Q：移动端表单点击没反应？**
A：默认逻辑是唤起邮件客户端，需手机已配置邮箱 App。建议替换为后端 API 或第三方表单服务。

**Q：如何关闭 Hero 粒子背景？**
A：在 `assets/js/main.js` 文件末尾的粒子模块中，注释掉 `start()` 调用即可。

---

## 📜 许可

本网站源码归 **昆山市星鹊软件工作室 Synkue Studio** 所有 · © 2026

---

> 🌟 如果这个模板对你有帮助，欢迎推荐给身边需要做品牌官网的朋友！
> 任何需求或定制开发，欢迎联系：**yuxink@126.com** · **180 5173 8385**
