# 图片资源说明 · Synkue Studio

本目录用于存放网站所需的图片资源。当前为减少首次打开体积，案例缩略图、品牌氛围图等均使用纯 CSS 渐变占位生成，无需额外图片。

## 文件清单

| 文件 | 用途 | 推荐尺寸 |
| --- | --- | --- |
| `favicon.svg` | 浏览器标签页图标（已包含） | 任意 SVG |
| `og-cover.png` *(可选)* | 社交分享封面图 | 1200×630 |
| `case-1.jpg ~ case-6.jpg` *(可选)* | 项目案例缩略图（替换渐变占位） | 800×500 |
| `studio.jpg` *(可选)* | 关于板块工作室氛围图 | 1200×800 |

## 如何替换案例缩略图

在 `index.html` 中找到 `<!-- 6. 项目案例作品集 -->` 区段，将类似下面这种渐变占位：

```html
<div class="case-thumb" style="background:linear-gradient(135deg,#1d4373 0%, #409EFF 100%);">
  <span class="case-thumb-text">Project · Web</span>
</div>
```

替换为真实图片：

```html
<div class="case-thumb" style="background-image:url('assets/images/case-1.jpg'); background-size:cover; background-position:center;">
</div>
```

并删除其中的 `<span class="case-thumb-text">...</span>`（如不再需要文字标签）。

## 如何替换 favicon

直接覆盖 `favicon.svg` 文件，或将 PNG 图标命名为 `favicon.png` 后修改 `index.html` 中的：

```html
<link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg" />
```

## 推荐免费图源

- 设计图标：[Heroicons](https://heroicons.com) · [Lucide](https://lucide.dev)
- 配图素材：[Unsplash](https://unsplash.com) · [Pexels](https://pexels.com)
- AI 生成：通义万相、即梦、Midjourney
