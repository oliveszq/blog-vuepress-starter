<template>
  <div class="tag-cloud">
    <div class="tag-cloud-container">
      <div 
        v-for="tag in tags" 
        :key="tag.name"
        class="tag-item"
        :class="`tag-size-${tag.size}`"
        :style="{ 
          '--tag-color': tag.color,
          '--tag-size': tag.size
        }"
        @click="goToTag(tag.name)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePagesData } from '@vuepress/client'

const router = useRouter()
const tags = ref([])

function colorFor(tag) {
  const palette = [
    '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
    '#14b8a6'
  ]
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = (hash << 5) - hash + tag.charCodeAt(i)
    hash |= 0
  }
  const idx = Math.abs(hash) % palette.length
  return palette[idx]
}

function sizeFor(count, max) {
  if (count >= Math.max(3, Math.ceil(max * 0.66))) return 'large'
  if (count >= Math.max(2, Math.ceil(max * 0.33))) return 'medium'
  return 'small'
}

async function buildTags() {
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

  const entries = results
    .filter(Boolean)
    .filter(({ path }) => path.startsWith('/blogs/') || path.startsWith('/series/'))
    .map(({ data }) => Array.isArray(data?.frontmatter?.tags) ? data.frontmatter.tags : [])
    .flat()
    .filter(t => typeof t === 'string' && t.trim().length > 0)
    .map(t => t.trim())

  const counter = new Map()
  for (const t of entries) {
    counter.set(t, (counter.get(t) || 0) + 1)
  }

  const maxCount = [...counter.values()].reduce((m, v) => Math.max(m, v), 0)
  const list = [...counter.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({
      name,
      size: sizeFor(count, maxCount),
      color: colorFor(name)
    }))

  tags.value = list
}

function goToTag(tagName) {
  if (!tagName) return
  router.push(`/tags/${encodeURIComponent(tagName)}/1.html`)
}

onMounted(async () => {
  await buildTags()
})
</script>

<style scoped>
.tag-cloud {
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
  display: inline-block;
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
