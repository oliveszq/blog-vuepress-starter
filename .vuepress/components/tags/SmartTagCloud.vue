<template>
  <div class="smart-tag-cloud">
    <div class="tag-cloud-container">
      <div 
        v-for="tag in processedTags" 
        :key="tag.name"
        class="tag-item"
        :class="`tag-size-${tag.size}`"
        :style="{ 
          '--tag-color': tag.color,
          '--tag-size': tag.size
        }"
        @click="goToTag(tag.name)"
        :title="`${tag.count} 篇文章`"
      >
        {{ tag.name }}
        <span class="tag-count">({{ tag.count }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartTagCloud',
  data() {
    return {
      // 预定义的颜色方案
      colorPalette: [
        '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
        '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
        '#14b8a6', '#f59e0b', '#ef4444', '#3b82f6', '#10b981',
        '#8b5cf6', '#f97316', '#06b6d4', '#84cc16', '#ec4899'
      ],
      // 从主题数据中获取的标签信息
      allTags: []
    }
  },
  computed: {
    processedTags() {
      // 如果没有标签数据，使用默认标签
      if (this.allTags.length === 0) {
        return this.getDefaultTags()
      }
      
      // 处理标签数据，添加大小和颜色
      return this.allTags.map((tag, index) => {
        const count = tag.count || 1
        let size = 'small'
        if (count >= 5) size = 'large'
        else if (count >= 3) size = 'medium'
        
        return {
          name: tag.name,
          count: count,
          size: size,
          color: this.colorPalette[index % this.colorPalette.length]
        }
      })
    }
  },
  mounted() {
    this.loadTagsFromTheme()
  },
  methods: {
    getDefaultTags() {
      return [
        { name: 'javascript', count: 1, size: 'small', color: '#3b82f6' },
        { name: 'vue', count: 1, size: 'small', color: '#f59e0b' },
        { name: 'css', count: 1, size: 'small', color: '#10b981' },
        { name: 'git', count: 1, size: 'small', color: '#ef4444' },
        { name: 'html', count: 3, size: 'medium', color: '#8b5cf6' },
        { name: 'css', count: 2, size: 'small', color: '#06b6d4' },
        { name: 'javascript', count: 5, size: 'large', color: '#f97316' },
        { name: 'vue', count: 4, size: 'medium', color: '#84cc16' },
        { name: 'nodejs', count: 2, size: 'small', color: '#ec4899' },
        { name: 'react', count: 3, size: 'medium', color: '#6366f1' },
        { name: 'typescript', count: 1, size: 'small', color: '#14b8a6' },
        { name: 'python', count: 6, size: 'large', color: '#f59e0b' },
        { name: 'java', count: 2, size: 'small', color: '#ef4444' },
        { name: 'mysql', count: 1, size: 'small', color: '#3b82f6' },
        { name: 'mongodb', count: 2, size: 'small', color: '#10b981' },
        { name: 'docker', count: 1, size: 'small', color: '#8b5cf6' },
        { name: 'git', count: 3, size: 'medium', color: '#f97316' },
        { name: 'linux', count: 4, size: 'medium', color: '#06b6d4' },
        { name: 'algorithm', count: 2, size: 'small', color: '#84cc16' },
        { name: 'design', count: 1, size: 'small', color: '#ec4899' }
      ]
    },
    
    loadTagsFromTheme() {
      // 尝试从主题数据中获取标签信息
      try {
        if (this.$site && this.$site.pages) {
          const tagMap = new Map()
          
          this.$site.pages.forEach(page => {
            if (page.frontmatter && page.frontmatter.tags) {
              page.frontmatter.tags.forEach(tag => {
                if (tagMap.has(tag)) {
                  tagMap.set(tag, tagMap.get(tag) + 1)
                } else {
                  tagMap.set(tag, 1)
                }
              })
            }
          })
          
          this.allTags = Array.from(tagMap.entries()).map(([name, count]) => ({
            name,
            count
          }))
          console.log("this.allTags", this.allTags);
        }
      } catch (error) {
        console.log('无法从主题数据加载标签，使用默认标签')
      }
    },
    
    goToTag(tagName) {
      // 跳转到对应的标签页面
      this.$router.push(`/tags/${tagName}.html`)
    }
  }
}
</script>

<style scoped>
.smart-tag-cloud {
  padding: 2rem 0;
}

.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 1rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 1.5rem;
  background-color: var(--tag-color);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;
  user-select: none;
}

.tag-item:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.tag-count {
  font-size: 0.75em;
  opacity: 0.8;
  font-weight: 400;
}

.tag-size-small {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.tag-size-medium {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.tag-size-large {
  font-size: 1rem;
  padding: 0.625rem 1.25rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tag-cloud-container {
    gap: 0.25rem;
    padding: 0.5rem;
  }
  
  .tag-item {
    margin: 0.125rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .tag-size-large {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}

/* 动画效果 */
.tag-item {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.tag-item:nth-child(1) { animation-delay: 0.1s; }
.tag-item:nth-child(2) { animation-delay: 0.2s; }
.tag-item:nth-child(3) { animation-delay: 0.3s; }
.tag-item:nth-child(4) { animation-delay: 0.4s; }
.tag-item:nth-child(5) { animation-delay: 0.5s; }
.tag-item:nth-child(6) { animation-delay: 0.6s; }
.tag-item:nth-child(7) { animation-delay: 0.7s; }
.tag-item:nth-child(8) { animation-delay: 0.8s; }
.tag-item:nth-child(9) { animation-delay: 0.9s; }
.tag-item:nth-child(10) { animation-delay: 1.0s; }
.tag-item:nth-child(11) { animation-delay: 1.1s; }
.tag-item:nth-child(12) { animation-delay: 1.2s; }
.tag-item:nth-child(13) { animation-delay: 1.3s; }
.tag-item:nth-child(14) { animation-delay: 1.4s; }
.tag-item:nth-child(15) { animation-delay: 1.5s; }
.tag-item:nth-child(16) { animation-delay: 1.6s; }
.tag-item:nth-child(17) { animation-delay: 1.7s; }
.tag-item:nth-child(18) { animation-delay: 1.8s; }
.tag-item:nth-child(19) { animation-delay: 1.9s; }
.tag-item:nth-child(20) { animation-delay: 2.0s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
