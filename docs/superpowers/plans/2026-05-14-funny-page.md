# /funny 奇闻趣事页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 `/funny` 路由，仿照主题内置 `/posts` 的样式，分页展示只在 `funny/` 目录下的文章；同一篇文章也会出现在 `/posts` 博客列表。

**Architecture:** 复用现有 `plugin-blog-page-filter.ts` 的路径伪装机制：在 `catalogueInclude` 加入 `'funny'`，filter 插件会把 `funny/xxx/yyy.md` 改写成 `blogs/xxx/yyy.md` 并写入 `frontmatter._originalDir = 'funny'`，让主题正则把它纳入 `__POSTS__` 全局；新建自定义 layout `Funny.vue`，从 `__POSTS__` 过滤出 `_originalDir === 'funny'` 的文章并按主题样式渲染。

**Tech Stack:** VuePress 2 (rc.19) + vuepress-theme-reco 2 (rc.26) + Vue 3 + Vite + TypeScript

参考 spec：`docs/superpowers/specs/2026-05-14-funny-page-design.md`

---

## File Structure

- Create `.vuepress/layouts/Funny.vue` — 自定义 layout，过滤并渲染奇闻趣事列表
- Modify `.vuepress/client.ts` — 注册 `Funny` layout
- Modify `.vuepress/config.ts` — 给 `blogPagePlugin` 的 `catalogueInclude` 加上 `'funny'`
- Create `funny/README.md` — `/funny` 路由的落地页，frontmatter 指定 `layout: Funny`
- Create `funny/段子/示例.md` — 示例文章，用于验证文章能进入 `__POSTS__` 并在 `/funny` 和 `/posts` 同时出现

注：`.vuepress/plugin-blog-page-filter.ts` 不需要改动 — 它已经会读 `catalogueInclude` 并写 `_originalDir`。

---

### Task 1: 新建自定义 layout `Funny.vue`

**Files:**
- Create: `.vuepress/layouts/Funny.vue`

- [ ] **Step 1: 创建 layout 文件**

写入以下内容到 `.vuepress/layouts/Funny.vue`：

```vue
<template>
  <GenericContainer>
    <section class="posts-container">
      <PostList :data="postsOfCurrentPage" />
      <Pagation
        :currentPage="currentPage"
        :total="funnyPosts.length"
        @change="handlePagation"
      />
    </section>
  </GenericContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'

import PostList from 'vuepress-theme-reco/lib/client/components/PostList/index.vue'
import Pagation from 'vuepress-theme-reco/lib/client/components/Pagation.vue'
import GenericContainer from 'vuepress-theme-reco/lib/client/components/GenericContainer/index.vue'

import { useMagicCard } from 'vuepress-theme-reco/lib/client/composables/index.js'

const { posts } = useExtendPageData()

const funnyPosts = computed(() =>
  (posts || []).filter((p: any) => p.frontmatter?._originalDir === 'funny')
)

const currentPage = ref(1)
const perPage = 10

const postsOfCurrentPage = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = currentPage.value * perPage
  return funnyPosts.value.slice(start, end)
})

const handlePagation = (page: number) => {
  currentPage.value = page
  if (typeof window !== 'undefined') {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }
}

const { initMagicCard } = useMagicCard()
onMounted(() => {
  initMagicCard()
})

const route = useRoute()
watch(route, () => {
  initMagicCard()
})
</script>
```

说明：
- 不做服务端分页路由（`/funny/2.html`），客户端分页用组件本地 `currentPage` ref，无 URL 同步，简单可靠
- 走 `vuepress-theme-reco/lib/client/...` 深路径而不是主题 alias（`@components/...`），避免依赖主题构建期才注入的 alias
- `useMagicCard` 让 PostList 中的卡片悬停效果正常工作，与 `/posts` 一致

- [ ] **Step 2: Commit**

```bash
git add .vuepress/layouts/Funny.vue
git commit -m "feat(funny): 新建 Funny.vue 自定义 layout"
```

---

### Task 2: 在 client.ts 注册 Funny layout

**Files:**
- Modify: `.vuepress/client.ts`

- [ ] **Step 1: 导入 Funny.vue 并加入 layouts 配置**

将 `.vuepress/client.ts` 改成：

```ts
import { defineClientConfig } from '@vuepress/client'
import IconHome from './components/IconHome.vue'
import IconBlogs from './components/IconBlogs.vue'
import IconTimeLine from './components/IconTimeLine.vue'
import IconCategory from './components/IconCategory.vue'
import IconTag from './components/IconTag.vue'
import IconSeries from './components/IconSeries.vue'
import CustomFooter from './components/CustomFooter.vue'
import SearchBox from './components/SearchBox.vue'
import IconFunny from './components/IconFunny.vue'
import Funny from './layouts/Funny.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册自定义 icon 组件
    app.component('IconHome', IconHome)
    app.component('IconBlogs', IconBlogs)
    app.component('IconTimeLine', IconTimeLine)
    app.component('IconCategory', IconCategory)
    app.component('IconTag', IconTag)
    app.component('IconSeries', IconSeries)
    app.component('CustomFooter', CustomFooter)
    app.component('IconFunny', IconFunny)
    // 注册搜索组件
    app.component('SearchBox', SearchBox)
  },
  layouts: {
    Funny,
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add .vuepress/client.ts
git commit -m "feat(funny): 在 client.ts 注册 Funny layout"
```

---

### Task 3: 在 config.ts 给 catalogueInclude 加 'funny'

**Files:**
- Modify: `.vuepress/config.ts`

- [ ] **Step 1: 找到 blogPagePlugin 配置，加入 'funny'**

在 `.vuepress/config.ts` 中将：

```ts
    blogPagePlugin({
      catalogueInclude: ['blogs', 'docs']
    }),
```

改成：

```ts
    blogPagePlugin({
      catalogueInclude: ['blogs', 'docs', 'funny']
    }),
```

说明：filter 插件中的 `catalogueInclude` 默认是 `['blogs']`，会跳过 `blogs/` 自身（已被主题原生支持），处理列表里其他目录下带有 tags/categories 的 md 文件，把它们的 `filePath` 改写成 `blogs/...` 并写入 `_originalDir`。原插件无需改动。

- [ ] **Step 2: Commit**

```bash
git add .vuepress/config.ts
git commit -m "feat(funny): catalogueInclude 加入 funny 目录"
```

---

### Task 4: 新建 funny/ 内容目录及落地页

**Files:**
- Create: `funny/README.md`
- Create: `funny/段子/示例.md`

- [ ] **Step 1: 创建落地页**

写入 `funny/README.md`：

```md
---
title: 奇闻趣事
layout: Funny
---
```

VuePress 会把 `funny/README.md` 自动路由为 `/funny/`。navbar 中 `link: '/funny'` 会命中此页面。

- [ ] **Step 2: 创建一篇示例文章**

写入 `funny/段子/示例.md`：

```md
---
title: 第一篇奇闻趣事
date: 2026-05-14 10:00:00
categories:
 - 段子
tags:
 - 趣事
---

## 一则示例

这是一篇用于验证 `/funny` 页面渲染的示例文章。

它应该同时出现在 `/funny` 和 `/posts` 两个列表里。
```

要点（不可省略）：
- 必须有 `tags` 或 `categories`，否则 filter 插件不会改写其 `filePath`，文章不会被主题识别为博客
- `date` 用于排序，缺失会导致 sort 比较时返回 0

- [ ] **Step 3: Commit**

```bash
git add funny/README.md funny/段子/示例.md
git commit -m "feat(funny): 添加 funny 落地页与第一篇示例文章"
```

---

### Task 5: 启动 dev server 并在浏览器中验证

**Files:** (无文件改动)

- [ ] **Step 1: 启动开发服务器**

```bash
yarn dev
```

预期：编译无 error。控制台会看到 filter 插件日志：
```
[Blog Page Filter] 修改路径: funny/段子/示例.md -> 伪装为 blogs 目录
```

- [ ] **Step 2: 在浏览器验证 `/funny`**

打开 `http://localhost:8080/funny`（端口以 dev server 实际输出为准）。

预期：
- 不再 404
- 页面布局与 `/posts` 相同
- 列表中能看到 "第一篇奇闻趣事" 卡片
- 卡片标题点击能跳转到文章页

- [ ] **Step 3: 在浏览器验证 `/posts` 也包含该文章**

打开 `http://localhost:8080/posts`。

预期：
- "第一篇奇闻趣事" 也出现在博客列表中（按日期与其他文章混排）

- [ ] **Step 4: 验证分类页**

打开 `http://localhost:8080/categories/duanzi/1.html`（"段子" 经主题的拼音转换会变成 `duanzi`，参见 `PageCreater._parseChineseInPagePathToPinyin`）。

预期：
- 看到 "第一篇奇闻趣事"

如果上述任一步骤未达预期，请按 superpowers:systematic-debugging 流程定位（最常见原因：示例文章缺 tags/categories，或 dev server 未读到新文件 — 重启 dev）。

- [ ] **Step 5: 停止 dev server，不需要 commit**

（本任务只做验证，无文件变动）

---

## 验证摘要

完成全部 5 个任务后：
- `/funny` 路由可访问，UI 与 `/posts` 一致
- `funny/` 下带 tags/categories 的 md 同时出现在 `/funny` 与 `/posts`
- 类别分页页可看到 funny 文章
- 全部改动在版本控制中，每个任务一次 commit
