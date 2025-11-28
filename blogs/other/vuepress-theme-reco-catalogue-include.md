---
title: VuePress Theme Reco 扩展目录扫描功能实现
date: 2025/11/28
tags:
  - VuePress
  - vuepress-theme-reco
  - 博客优化
categories:
  - 技术文档
---

# VuePress Theme Reco 扩展目录扫描功能实现

## 问题背景

在使用 `vuepress-theme-reco@2.0.0-rc.26` 主题时，发现主题的标签（Tags）和分类（Categories）功能默认只扫描 `blogs` 目录下的文章，而 `docs` 目录下带有 tags 和 categories frontmatter 的文档无法被自动收集。

## 问题分析

### 根本原因

通过深入研究主题源码（`@vuepress-reco/vuepress-plugin-page` 插件），发现主题在 `PageCreater.js` 中硬编码了只扫描 `/blogs/` 目录的正则表达式：

```javascript
const blogsToBeReleased = this.app.pages
    .filter((page) => {
        const publishFlag = !(!/.+\/blogs\/[(.+)\/]?.+\.md$/.test(page.filePath || '') ||
            page?.frontmatter?.publish === false ||
            page?.title === '');
        // ...
    })
```

这个正则表达式 `/.+\/blogs\/[(.+)\/]?.+\.md$/` 只会匹配 `blogs` 目录下的文件，导致其他目录的文档即使配置了 tags 和 categories 也不会被收集。

### 尝试的方案

#### 方案一：直接配置 `catalogueInclude`（失败）
最初尝试在主题配置中添加 `catalogueInclude` 属性：

```typescript
theme: recoTheme({
  catalogueInclude: ['blogs', 'docs'],  // ❌ TypeScript 报错
  // ...
})
```

**失败原因**：`RecoThemeData` 类型中并不存在 `catalogueInclude` 属性。

#### 方案二：扩展类型定义（不够）
创建类型声明文件扩展 `RecoThemeData`：

```typescript
// .vuepress/types.d.ts
import 'vuepress-theme-reco'

declare module 'vuepress-theme-reco' {
  interface RecoThemeData {
    catalogueInclude?: string[]
  }
}
```

**不足之处**：虽然解决了类型问题，但主题内部逻辑仍然只扫描 `blogs` 目录。

## 最终解决方案

### 实现思路

创建一个自定义 VuePress 插件，通过"路径伪装"的方式欺骗主题的正则匹配：

1. **识别目标文件**：检测配置目录（如 `docs`）下带有 tags 或 categories 的 Markdown 文件
2. **路径伪装**：临时将文件的 `filePath` 从 `docs/xxx/yyy.md` 改为 `blogs/xxx/yyy.md`
3. **匹配正则**：修改后的路径能够匹配主题的正则表达式
4. **保留原路径**：将原始目录信息保存在 `frontmatter._originalDir` 中，以便后续使用

### 代码实现

#### 1. 创建自定义插件

创建文件 `.vuepress/plugin-blog-page-filter.ts`：

```typescript
import type { Plugin } from 'vuepress'
import type { Page } from '@vuepress/core'

export interface BlogPagePluginOptions {
  /**
   * 需要扫描的目录列表
   */
  catalogueInclude?: string[]
}

export const blogPagePlugin = (options: BlogPagePluginOptions = {}): Plugin => {
  const { catalogueInclude = ['blogs'] } = options

  return {
    name: '@local/vuepress-plugin-blog-page-filter',

    extendsPage: (page: Page) => {
      // vuepress-theme-reco 硬编码了只扫描 /blogs/ 目录的正则: /.+\/blogs\/[(.+)\/]?.+\.md$/
      // 我们需要修改 filePath 让其他目录的文件也能被识别为博客文章
      
      if (!page.filePath) return

      // 检查页面是否在配置的目录中(但不在 blogs 目录)
      const isInOtherCatalogue = catalogueInclude.some(dir => {
        if (dir === 'blogs') return false // 跳过 blogs,它已经被主题支持
        return page.filePathRelative?.startsWith(`${dir}/`)
      })

      // 如果页面在其他目录中，且有 tags 或 categories，修改其 filePath
      if (isInOtherCatalogue && (page.frontmatter?.tags || page.frontmatter?.categories)) {
        // 将 docs/xxx/yyy.md 的路径模式改为 blogs/xxx/yyy.md 的模式
        // 这样就能匹配主题的正则表达式
        const match = page.filePathRelative?.match(/^([^/]+)\/(.+)$/)
        if (match) {
          const [, dir, restPath] = match
          // 保存原始路径到 frontmatter，以便后续使用
          page.frontmatter._originalDir = dir
          // 临时修改 filePath 以匹配主题的正则
          page.filePath = page.filePath.replace(new RegExp(`/${dir}/`), '/blogs/')
          
          console.log(`[Blog Page Filter] 修改路径: ${page.filePathRelative} -> 伪装为 blogs 目录`)
        }
      }
    },
  }
}
```

#### 2. 配置 TypeScript

创建 `tsconfig.json`（如果不存在）：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": false,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "include": [
    ".vuepress/**/*.ts",
    ".vuepress/**/*.d.ts",
    ".vuepress/**/*.vue"
  ],
  "exclude": [
    "node_modules",
    ".vuepress/.temp",
    ".vuepress/.cache",
    ".vuepress/dist"
  ]
}
```

#### 3. 更新配置文件

修改 `.vuepress/config.ts`：

```typescript
import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { blogPagePlugin } from './plugin-blog-page-filter'

export default defineUserConfig({
  title: "vuepress-theme-reco",
  description: "Just playing around",
  bundler: viteBundler(),
  
  // 添加自定义插件
  plugins: [
    blogPagePlugin({
      catalogueInclude: ['blogs', 'docs']  // 配置需要扫描的目录
    })
  ],
  
  theme: recoTheme({
    logo: "/logo.png",
    author: "reco_luan",
    // ... 其他配置
  }),
});
```

#### 4. 为 docs 文档添加 frontmatter

确保 `docs` 目录下的文档包含 tags 和 categories：

```markdown
---
title: API 文档
date: 2020/05/29
tags: 
  - api
  - docs
categories:
  - documentation
---

这是 API 文档内容...
```

## 验证结果

### 控制台输出

启动开发服务器后，可以看到插件正在工作：

```bash
[Blog Page Filter] 修改路径: docs/theme-reco/plugin.md -> 伪装为 blogs 目录
[Blog Page Filter] 修改路径: docs/theme-reco/api.md -> 伪装为 blogs 目录
[Blog Page Filter] 修改路径: docs/theme-reco/home.md -> 伪装为 blogs 目录
[Blog Page Filter] 修改路径: docs/theme-reco/theme.md -> 伪装为 blogs 目录
```

### 生成的文件

在 `.vuepress/.temp/pages/` 目录下成功生成了：

**标签页面**：
- `tags/docs/1.html.js` - "docs" 标签
- `tags/api/1.html.js` - "api" 标签
- `tags/plugin/1.html.js` - "plugin" 标签
- `tags/theme/1.html.js` - "theme" 标签
- `tags/home/1.html.js` - "home" 标签

**分类页面**：
- `categories/documentation/1.html.js` - "documentation" 分类

### 访问地址

启动开发服务器后，可以访问：

- 标签页：`http://localhost:8080/tags/docs/1.html`
- 分类页：`http://localhost:8080/categories/documentation/1.html`

## 技术要点

### 1. VuePress 插件生命周期

使用 `extendsPage` hook 在页面创建时修改页面属性，这个时机刚好在主题的 `@vuepress-reco/vuepress-plugin-page` 插件处理之前。

### 2. 路径伪装技巧

通过修改 `page.filePath` 而不是 `page.filePathRelative`，确保：
- 主题的正则匹配能够通过
- 页面的实际文件路径不受影响
- 原始目录信息被保存，后续可以使用

### 3. TypeScript 类型处理

使用 `@ts-ignore` 注释临时绕过类型检查：

```typescript
// @ts-ignore - catalogueInclude 是扩展属性
catalogueInclude: ['blogs', 'docs'],
```

## 适用场景

这个方案适用于以下情况：

1. ✅ 需要让 `docs`、`guides` 等多个目录下的文档都参与标签和分类功能
2. ✅ 不想修改主题源码，保持主题的可升级性
3. ✅ 希望通过配置化方式扩展功能

## 注意事项

1. **主题升级兼容性**：如果主题未来版本修改了内部实现逻辑，可能需要调整插件代码
2. **路径显示**：虽然内部路径被修改，但页面的实际访问路径和显示不受影响
3. **构建性能**：这个方案对构建性能影响很小，仅在页面初始化时执行一次

## 总结

通过自定义插件的方式，我们成功地扩展了 vuepress-theme-reco 的目录扫描功能，使得 `docs` 等其他目录下的文档也能参与到博客的标签和分类系统中。这个方案：

- ✅ 无需修改主题源码
- ✅ 配置简单灵活
- ✅ 性能影响小
- ✅ 易于维护和扩展

希望这个方案能帮助到有同样需求的开发者！

## 参考资源

- [VuePress 官方文档 - 插件 API](https://v2.vuepress.vuejs.org/reference/plugin-api.html)
- [vuepress-theme-reco 官方文档](https://vuepress-theme-reco.recoluan.com/)
- [GitHub - vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco)
