<template>
  <div class="tag-page">
    <div class="tag-header">
      <h1 class="tag-title">
        <i class="icon-tag"></i>
        标签：{{ tagName }}
      </h1>
      <p class="tag-description">
        共找到 {{ articles.length }} 篇相关文章
      </p>
    </div>
    
    <div class="articles-list" v-if="articles.length > 0">
      <div 
        v-for="article in articles" 
        :key="article.path"
        class="article-item"
        @click="goToArticle(article.path)"
      >
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <div class="article-author-line">
            <span class="article-author" v-if="getAuthor(article)">
              <i class="icon-user"></i>
              {{ getAuthor(article) }}
            </span>
            <span class="article-dot" v-if="getAuthor(article) && formatDate(article.date)">·</span>
            <span class="article-date">
              <i class="icon-calendar"></i>
              {{ formatDate(article.date) }}
            </span>
          </div>
          <p class="article-excerpt">{{ article.excerpt || '暂无摘要' }}</p>
          <div class="article-meta">
            <span class="article-category" v-if="article.categories">
              <i class="icon-folder"></i>
              {{ article.categories[0] }}
            </span>
          </div>
          <div class="article-tags" v-if="Array.isArray(article.tags) && article.tags.length">
            <span class="tag-chip" v-for="t in article.tags" :key="t" @click.stop="goToTag(t)"># {{ t }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="no-articles" v-else>
      <div class="empty-state">
        <i class="icon-empty"></i>
        <h3>暂无相关文章</h3>
        <p>该标签下还没有文章，去看看其他标签吧！</p>
        <router-link to="/tags/tags.html" class="back-link">
          返回标签总览
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePagesData } from '@vuepress/client'
import { useSiteData } from '@vuepress/client'

const route = useRoute()
const router = useRouter()
const tagName = ref('')
const articles = ref([])
const siteData = useSiteData()

function parseTagFromPath(path) {
  const match = path.match(/\/tags\/([^\/]+)\//)
  return match ? decodeURIComponent(match[1]) : ''
}

async function loadArticlesByTag(currentTag) {
  const pagesData = usePagesData()
  const loaders = Object.entries(pagesData)
  const results = await Promise.all(
    loaders.map(async ([path, loader]) => {
      try {
        const data = await loader()
        return { path, data }
      } catch (_) {
        return null
      }
    })
  )
  console.log("pagesData", pagesData);
  console.log("loaders", loaders);
  console.log("results", results);
  const items = (results.filter(Boolean)).map(({ path, data }) => {
    return {
      path,
      title: data.title || (data.frontmatter && data.frontmatter.title) || '',
      date: data.frontmatter && data.frontmatter.date,
      tags: (data.frontmatter && data.frontmatter.tags) || [],
      categories: (data.frontmatter && data.frontmatter.categories) || [],
      excerpt: data.excerpt || (data.frontmatter && (data.frontmatter.description || data.frontmatter.summary)) || ''
    }
  })
  .filter(item => item.path.startsWith('/blogs/') || item.path.startsWith('/series/'))
  .filter(item => Array.isArray(item.tags) && item.tags.includes(currentTag))
  .sort((a, b) => {
    const ad = a.date ? new Date(a.date).getTime() : 0
    const bd = b.date ? new Date(b.date).getTime() : 0
    return bd - ad
  })

  articles.value = items
}

function goToArticle(path) {
  router.push(path)
}

function formatDate(dateString) {
  if (!dateString) return '未知日期'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getAuthor(article) {
  if (article && article.author) return article.author
  const fmAuthor = article && article.frontmatter && article.frontmatter.author
  if (fmAuthor) return fmAuthor
  const themeAuthor = siteData.value && siteData.value.themeConfig && siteData.value.themeConfig.author
  return themeAuthor || ''
}

function goToTag(tag) {
  if (!tag) return
  router.push(`/tags/${encodeURIComponent(tag)}/1.html`)
}

onMounted(async () => {
  tagName.value = parseTagFromPath(route.path)
  if (tagName.value) {
    await loadArticlesByTag(tagName.value)
  }
})

watch(
  () => route.path,
  async (newPath) => {
    const newTag = parseTagFromPath(newPath)
    if (newTag && newTag !== tagName.value) {
      tagName.value = newTag
      await loadArticlesByTag(tagName.value)
    }
  }
)

</script>

<style scoped>
.tag-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.tag-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.tag-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tag-title i {
  color: #3b82f6;
}

.tag-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.article-excerpt {
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.article-author-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.article-author-line .article-dot {
  color: #9ca3af;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.article-tags {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #374151;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tag-chip:hover {
  background: #e5e7eb;
}

.article-meta i {
  width: 1rem;
  height: 1rem;
}

.no-articles {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state {
  max-width: 400px;
  margin: 0 auto;
}

.empty-state i {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 2rem 0;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background: #2563eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tag-page {
    padding: 1rem 0.5rem;
  }
  
  .tag-title {
    font-size: 2rem;
  }
  
  .article-item {
    padding: 1rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
