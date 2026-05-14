---
title: /funny 页面设计 — 自定义 “奇闻趣事” 列表
date: 2026-05-14
status: approved
---

# `/funny` 页面设计

## 背景

navbar 中已经添加了 “奇闻趣事” 项，链接到 `/funny`，但当前点击会 404。目标是仿照主题内置的 `/posts`（博客）页面，自实现一个 `/funny` 列表页：分页展示文章卡片，过滤范围只包含 “奇闻趣事” 类目下的文章。

主题 `vuepress-theme-reco` 的 `/posts` 由 `@vuepress-reco/vuepress-plugin-page` 的 `_createBlogPaginationPages()` 自动生成，并通过 `__POSTS__` 全局变量供 `Posts.vue` 渲染。主题用硬编码正则 `/.+\/blogs\/[(.+)\/]?.+\.md$/` 来识别博客文章。项目里已经有 `plugin-blog-page-filter.ts`：当文章在 `catalogueInclude` 配置的非 `blogs` 目录中且带有 `tags`/`categories` 时，会把它的 `filePath` 伪装成 `blogs/...` 以骗过正则，同时把原目录名记到 `frontmatter._originalDir`。

## 目标

- `/funny` 可访问，呈现一个分页文章列表，视觉与 `/posts` 一致
- “奇闻趣事” 内容统一放在新建的顶级目录 `funny/`
- `funny/` 下的文章既出现在 `/posts`（博客全集），也出现在 `/funny`（仅奇闻趣事）
- 无需修改 `node_modules/` 内主题代码

## 非目标

- 不为 `/funny` 生成服务端分页路由（如 `/funny/2.html`）。客户端分页足够
- 不修改主题源码或 page 插件
- 不引入新依赖

## 架构

### 1. 内容目录 `funny/`

- 顶级目录，与 `blogs/`、`docs/` 同级
- 下可分子目录（如 `funny/段子/`），子目录名会被 `_setBlogCategories` 解析为 `categories[0]`（在 `filePath` 被插件改写为 `blogs/...` 之后）
- 文章 frontmatter 必须包含 `tags` 或 `categories`，否则 filter 插件不会改写其 `filePath`，主题也就不会识别为博客

### 2. 扩展 filter 插件配置

在 `.vuepress/config.ts` 中给 `blogPagePlugin` 的 `catalogueInclude` 数组加上 `'funny'`：

```ts
blogPagePlugin({
  catalogueInclude: ['blogs', 'docs', 'funny']
})
```

`plugin-blog-page-filter.ts` 本身无需修改。改写 `filePath` 时它已经会把原目录名（这里是 `'funny'`）写入 `frontmatter._originalDir`，这是后续过滤的关键标识。

### 3. 自定义 layout `.vuepress/layouts/Funny.vue`

仿照 `vuepress-theme-reco/lib/client/components/Posts.vue` 实现，差异是在拿到 `__POSTS__` 后做一次过滤：

```ts
const allPosts = useExtendPageData().posts || []
const posts = computed(() =>
  allPosts.filter(p => p.frontmatter?._originalDir === 'funny')
)
```

其余结构（`PostList`、`Pagation`、`GenericContainer`、`useMagicCard`）完全复用主题组件，确保视觉与 `/posts` 一致。客户端分页参照主题 `Posts.vue` 的 `perPage = 10`、`handlePagation`、`route.query.page` watch 逻辑；`router.push` 的目标改为 `/funny` 而非 `/posts`。

### 4. 注册 layout

在现有 `.vuepress/client.ts` 的 `defineClientConfig` 上追加 `layouts` 配置：

```ts
import Funny from './layouts/Funny.vue'

export default defineClientConfig({
  enhance({ app }) { /* 现有内容不变 */ },
  layouts: {
    Funny,
  },
})
```

### 5. 落地页 `funny/README.md`

```md
---
title: 奇闻趣事
layout: Funny
---
```

VuePress 默认将 `funny/README.md` 路由到 `/funny/`，navbar 中 `link: '/funny'` 可正常命中。

## 数据流

```
funny/段子/foo.md
  └─ frontmatter: tags / categories 必须存在

[onInitialized]
  plugin-blog-page-filter：
    filePath: ".../funny/段子/foo.md" → ".../blogs/段子/foo.md"
    frontmatter._originalDir = 'funny'

  page plugin (_setBlogsToCategoryPageData)：
    主题正则匹配 → 判定为 blog → 加入 __POSTS__
    _setBlogCategories：categories = ['段子']

[运行时]
  /posts → 主题 Posts.vue 渲染所有 __POSTS__（含 funny 文章）
  /funny → Funny.vue 读取 __POSTS__，过滤 _originalDir === 'funny' 后渲染
```

## 测试 / 验证计划

需要在浏览器中实际验证：

1. `yarn dev` 启动，访问 `/funny` 不再 404，呈现列表样式与 `/posts` 一致
2. 至少新建 1 篇示例文章 `funny/段子/示例.md`，验证：
   - 它出现在 `/funny` 列表
   - 它也出现在 `/posts` 列表
   - 它能进入 categories（`/categories/段子/1.html`）
3. 没有 funny 文章时，`/funny` 显示空列表（不应崩溃）
4. 客户端分页在文章数 > 10 时表现正常（次要，可后置）

## 取舍与风险

- **强耦合 `_originalDir` 字段**：过滤依赖现有 filter 插件的实现细节。若插件改名或字段含义变更，`/funny` 会失效。两者都是项目本地代码，可控
- **无服务端分页路由**：用 `Pagation` 组件的客户端分页代替 `/funny/2.html`，不动 page 插件。小博客 OK
- **必须有 tags/categories**：filter 插件要求文章有 `tags` 或 `categories` 才会改写路径。空白文章不会被识别 — 通过示例文章的 frontmatter 模板规避

## 改动清单

- `funny/README.md` 新建
- `funny/段子/示例.md` 新建（示例文章，验证用）
- `.vuepress/layouts/Funny.vue` 新建
- `.vuepress/client.ts` 注册 layout
- `.vuepress/config.ts` `catalogueInclude` 加 `'funny'`
- `.vuepress/plugin-blog-page-filter.ts` 不变
