<template>
  <div class="search-box-wrapper">
    <!-- 搜索按钮/图标 -->
    <button
      class="search-trigger"
      @click="openSearch"
      :aria-label="placeholder"
      title="搜索 (Ctrl+K)"
    >
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <span class="search-trigger-text">{{ placeholder }}</span>
      <kbd class="search-hotkey">Ctrl+K</kbd>
    </button>

    <!-- 搜索模态框 -->
    <Transition name="search-modal">
      <div v-if="isOpen" class="search-modal" @click.self="closeSearch">
        <div class="search-modal-content">
          <!-- 搜索输入框 -->
          <div class="search-input-wrapper">
            <svg
              class="search-input-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              class="search-input"
              :placeholder="placeholder"
              @input="handleSearch"
              @keydown.esc="closeSearch"
              @keydown.down.prevent="navigateDown"
              @keydown.up.prevent="navigateUp"
              @keydown.enter.prevent="selectResult"
            />
            <button
              v-if="query"
              class="search-clear"
              @click="clearSearch"
              aria-label="清除搜索"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 搜索结果 -->
          <div class="search-results" v-if="query">
            <div v-if="isSearching" class="search-loading">
              <div class="search-loading-spinner"></div>
              <span>搜索中...</span>
            </div>
            <div v-else-if="results.length === 0" class="search-empty">
              <svg
                class="search-empty-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <p>未找到相关结果</p>
              <p class="search-empty-hint">尝试使用其他关键词</p>
            </div>
            <div v-else class="search-results-list">
              <div
                v-for="(result, index) in results"
                :key="index"
                class="search-result-item"
                :class="{ active: index === selectedIndex }"
                @click="goToResult(result)"
                @mouseenter="selectedIndex = index"
              >
                <h3 class="search-result-title">{{ result.title }}</h3>
                <p class="search-result-snippet" v-html="result.snippet"></p>
                <div v-if="result.headers.length > 0" class="search-result-headers">
                  <span
                    v-for="(header, hIndex) in result.headers.slice(0, 2)"
                    :key="hIndex"
                    class="search-result-header-tag"
                  >
                    {{ header }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态提示 -->
          <div v-else class="search-hints">
            <div class="search-hint-item">
              <kbd>↑</kbd><kbd>↓</kbd>
              <span>导航</span>
            </div>
            <div class="search-hint-item">
              <kbd>↵</kbd>
              <span>打开</span>
            </div>
            <div class="search-hint-item">
              <kbd>Esc</kbd>
              <span>关闭</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
  title: string
  headers: string[]
  path: string
  snippet: string
}

const props = withDefaults(
  defineProps<{
    placeholder?: string
    maxSuggestions?: number
  }>(),
  {
    placeholder: '搜索',
    maxSuggestions: 10,
  }
)

const router = useRouter()

const isOpen = ref(false)
const query = ref('')
const results = ref<SearchResult[]>([])
const isSearching = ref(false)
const selectedIndex = ref(-1)
const searchInput = ref<HTMLInputElement | null>(null)
const searchIndex = ref<any[]>([])

// 加载搜索索引
const loadSearchIndex = async () => {
  try {
    // 尝试从临时目录加载搜索索引
    const indexModule = await import(
      /* @vite-ignore */
      '@temp/search-index.js'
    )
    searchIndex.value = indexModule.default || []
  } catch (error) {
    // 如果加载失败，尝试从页面数据构建索引
    try {
      // 从 DOM 中提取页面信息作为备用方案
      const pages = document.querySelectorAll('a[href^="/"]')
      const index: any[] = []
      pages.forEach((link) => {
        const href = (link as HTMLAnchorElement).href
        const path = new URL(href).pathname
        if (path !== '/' && !path.startsWith('/404') && !index.find((i) => i.path === path)) {
          const title = link.textContent?.trim() || ''
          if (title) {
            index.push({
              title,
              headers: [],
              path,
              content: '',
            })
          }
        }
      })
      searchIndex.value = index
    } catch (fallbackError) {
      console.warn('搜索索引加载失败:', error, fallbackError)
      searchIndex.value = []
    }
  }
}

// 搜索功能
const search = (searchQuery: string): SearchResult[] => {
  if (!searchQuery.trim() || searchIndex.value.length === 0) {
    return []
  }

  const queryLower = searchQuery.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 0)

  const scoredResults = searchIndex.value
    .map((item) => {
      let score = 0
      const titleLower = item.title.toLowerCase()
      const contentLower = item.content.toLowerCase()

      // 标题完全匹配
      if (titleLower === queryLower) {
        score += 1000
      }
      // 标题包含查询
      else if (titleLower.includes(queryLower)) {
        score += 500
      }
      // 标题单词匹配
      else {
        const titleMatchCount = queryWords.filter((word) =>
          titleLower.includes(word)
        ).length
        score += titleMatchCount * 100
      }

      // 标题匹配
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 50
        }
      })

      // 内容匹配
      queryWords.forEach((word) => {
        const contentMatches = (contentLower.match(new RegExp(word, 'g')) || [])
          .length
        score += contentMatches * 5
      })

      // 头部匹配
      item.headers.forEach((header) => {
        const headerLower = header.toLowerCase()
        queryWords.forEach((word) => {
          if (headerLower.includes(word)) {
            score += 20
          }
        })
      })

      return { ...item, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, props.maxSuggestions)
    .map((item) => {
      // 生成摘要
      const content = item.content
      const queryLower = searchQuery.toLowerCase()
      const index = content.toLowerCase().indexOf(queryLower)

      let snippet = ''
      if (index !== -1) {
        const start = Math.max(0, index - 50)
        const end = Math.min(content.length, index + searchQuery.length + 50)
        snippet = content.substring(start, end)
        if (start > 0) snippet = '...' + snippet
        if (end < content.length) snippet = snippet + '...'
      } else {
        snippet = content.substring(0, 150)
        if (content.length > 150) snippet += '...'
      }

      // 高亮匹配文本
      queryWords.forEach((word) => {
        const regex = new RegExp(`(${word})`, 'gi')
        snippet = snippet.replace(regex, '<mark>$1</mark>')
      })

      return {
        title: item.title,
        headers: item.headers,
        path: item.path,
        snippet,
      }
    })

  return scoredResults
}

// 处理搜索
const handleSearch = () => {
  if (!query.value.trim()) {
    results.value = []
    selectedIndex.value = -1
    return
  }

  isSearching.value = true
  setTimeout(() => {
    results.value = search(query.value)
    isSearching.value = false
    selectedIndex.value = results.value.length > 0 ? 0 : -1
  }, 100)
}

// 打开搜索
const openSearch = async () => {
  isOpen.value = true
  await loadSearchIndex()
  await nextTick()
  searchInput.value?.focus()
}

// 关闭搜索
const closeSearch = () => {
  isOpen.value = false
  query.value = ''
  results.value = []
  selectedIndex.value = -1
}

// 清除搜索
const clearSearch = () => {
  query.value = ''
  results.value = []
  selectedIndex.value = -1
  searchInput.value?.focus()
}

// 导航
const navigateDown = () => {
  if (results.value.length > 0) {
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  }
}

const navigateUp = () => {
  if (results.value.length > 0) {
    selectedIndex.value =
      selectedIndex.value <= 0
        ? results.value.length - 1
        : selectedIndex.value - 1
  }
}

// 选择结果
const selectResult = () => {
  if (selectedIndex.value >= 0 && results.value[selectedIndex.value]) {
    goToResult(results.value[selectedIndex.value])
  }
}

// 跳转到结果
const goToResult = (result: SearchResult) => {
  closeSearch()
  router.push(result.path)
}

// 键盘快捷键
const handleKeyDown = (e: KeyboardEvent) => {
  // Ctrl+K 或 Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (isOpen.value) {
      closeSearch()
    } else {
      openSearch()
    }
  }
  // Esc
  if (e.key === 'Escape' && isOpen.value) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* 搜索触发器 */
.search-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(92, 124, 250, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #5c7cfa;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(92, 124, 250, 0.1);
}

.search-trigger:hover {
  background: rgba(255, 255, 255, 1);
  border-color: #5c7cfa;
  box-shadow: 0 4px 12px rgba(92, 124, 250, 0.15);
  transform: translateY(-1px);
}

.search-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.search-trigger-text {
  color: #666;
  font-size: 14px;
}

.search-hotkey {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  background: rgba(92, 124, 250, 0.1);
  border: 1px solid rgba(92, 124, 250, 0.2);
  border-radius: 4px;
  font-size: 11px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas,
    'Courier New', monospace;
  color: #5c7cfa;
  margin-left: auto;
}

/* 搜索模态框 */
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20vh 20px 20px;
  animation: fadeIn 0.2s ease;
}

.search-modal-content {
  width: 100%;
  max-width: 640px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideDown 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 搜索输入框 */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  margin-right: 12px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1f2937;
  background: transparent;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;
  margin-left: 8px;
}

.search-clear:hover {
  color: #5c7cfa;
}

.search-clear svg {
  width: 16px;
  height: 16px;
}

/* 搜索结果 */
.search-results {
  max-height: 60vh;
  overflow-y: auto;
}

.search-results-list {
  padding: 8px 0;
}

.search-result-item {
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.15s;
  border-left: 3px solid transparent;
}

.search-result-item:hover,
.search-result-item.active {
  background: #f9fafb;
  border-left-color: #5c7cfa;
}

.search-result-title {
  padding-top: 0px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.search-result-snippet {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-result-headers {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.search-result-header-tag {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(92, 124, 250, 0.1);
  color: #5c7cfa;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.search-result-snippet :deep(mark) {
  background: #fef3c7;
  color: #92400e;
  padding: 0 2px;
  border-radius: 2px;
  font-weight: 500;
}

/* 加载状态 */
.search-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: #9ca3af;
}

.search-loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top-color: #5c7cfa;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 空状态 */
.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
  text-align: center;
}

.search-empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.search-empty p {
  margin: 8px 0;
  font-size: 16px;
}

.search-empty-hint {
  font-size: 14px;
  opacity: 0.7;
}

/* 提示信息 */
.search-hints {
  display: flex;
  gap: 24px;
  padding: 20px;
  justify-content: center;
  border-top: 1px solid #e5e7eb;
}

.search-hint-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #9ca3af;
}

.search-hint-item kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas,
    'Courier New', monospace;
  color: #6b7280;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 过渡动画 */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-modal {
    padding: 10vh 10px 10px;
  }

  .search-modal-content {
    border-radius: 12px;
  }

  .search-trigger-text {
    display: none;
  }

  .search-hotkey {
    display: none;
  }

  .search-results {
    max-height: 70vh;
  }
}
</style>

