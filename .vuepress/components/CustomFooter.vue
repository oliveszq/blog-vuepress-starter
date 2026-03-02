<template>
    <footer class="my-footer">
      <p>© {{ yearRange }} olivesQ | 记录每一步成长，点亮每一刻灵感。</p>
  
      <!-- 备案等信息来自首页 frontmatter 的 footer 配置 -->
      <p v-if="footer.record || footer.cyberSecurityRecord">
        <template v-if="footer.record">
          <a
            v-if="footer.recordLink"
            :href="footer.recordLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ footer.record }}
          </a>
          <span v-else>{{ footer.record }}</span>
        </template>
  
        <span v-if="footer.record && footer.cyberSecurityRecord"> | </span>
  
        <template v-if="footer.cyberSecurityRecord">
          <a
            v-if="footer.cyberSecurityLink"
            :href="footer.cyberSecurityLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ footer.cyberSecurityRecord }}
          </a>
          <span v-else>{{ footer.cyberSecurityRecord }}</span>
        </template>
      </p>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

export default defineComponent({
  name: 'CustomFooter',
  setup() {
    const frontmatter = usePageFrontmatter()

    const footer = computed(() => {
      return frontmatter.value.footer ?? {}
    })

    const yearRange = computed(() => {
      const currentYear = new Date().getFullYear()
      const startYear = footer.value.startYear ?? currentYear
      return startYear === currentYear ? `${currentYear}` : `${startYear}–${currentYear}`
    })

    return {
      footer,
      yearRange,
    }
  },
})
</script>
  
  <style scoped>
  .my-footer {
    text-align: center;
    padding: 1rem 0;
    color: #000000;
    font-size: 0.875rem;
  }
  
  .my-footer a {
    color: inherit;
    text-decoration: underline;
  }
  </style>