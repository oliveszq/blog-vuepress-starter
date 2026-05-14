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
