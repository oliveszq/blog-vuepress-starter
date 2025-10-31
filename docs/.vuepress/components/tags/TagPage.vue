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
          <p class="article-excerpt">{{ article.excerpt || '暂无摘要' }}</p>
          <div class="article-meta">
            <span class="article-date">
              <i class="icon-calendar"></i>
              {{ formatDate(article.date) }}
            </span>
            <span class="article-category" v-if="article.categories">
              <i class="icon-folder"></i>
              {{ article.categories[0] }}
            </span>
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

<script>
export default {
  name: 'TagPage',
  data() {
    return {
      tagName: '',
      articles: []
    }
  },
  mounted() {
    this.loadTagData()
  },
  methods: {
    loadTagData() {
      // 从当前路径获取标签名
      const path = this.$route.path
      const match = path.match(/\/tags\/([^\/]+)\/\d+\.html/)
      if (match) {
        this.tagName = match[1]
        this.loadArticles()
      }
    },
    
    loadArticles() {
      // 模拟文章数据，实际应该从主题数据中获取
      const mockArticles = this.getMockArticles()
      this.articles = mockArticles.filter(article => 
        article.tags && article.tags.includes(this.tagName)
      )
    },
    
    getMockArticles() {
      return [
        {
          path: '/blogs/bug笔记/2018/121501.html',
          title: 'JavaScript 闭包问题排查',
          date: '2018-12-15',
          tags: ['javascript', '闭包', 'bug修复', '前端开发'],
          categories: ['bug笔记'],
          excerpt: '深入分析 JavaScript 闭包常见问题及解决方案'
        },
        {
          path: '/blogs/bug笔记/2019/092101.html',
          title: 'Vue 组件通信问题解决',
          date: '2019-09-21',
          tags: ['vue', '组件通信', '问题排查', '前端开发'],
          categories: ['bug笔记'],
          excerpt: 'Vue 组件间通信的常见问题及最佳实践'
        },
        {
          path: '/blogs/technique/2016/121501.html',
          title: 'CSS 布局技巧分享',
          date: '2016-12-15',
          tags: ['css', '布局技巧', '前端开发', '最佳实践'],
          categories: ['小技巧'],
          excerpt: 'CSS 布局的实用技巧和最佳实践'
        },
        {
          path: '/blogs/technique/2017/092101.html',
          title: 'Git 高级使用技巧',
          date: '2017-09-21',
          tags: ['git', '版本控制', '开发工具', '高级技巧'],
          categories: ['小技巧'],
          excerpt: 'Git 高级功能的使用技巧和最佳实践'
        }
      ]
    },
    
    goToArticle(path) {
      this.$router.push(path)
    },
    
    formatDate(dateString) {
      if (!dateString) return '未知日期'
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
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
