import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/tags/css.html.vue"
const data = JSON.parse("{\"path\":\"/tags/css.html\",\"title\":\"标签 - CSS\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"标签 - CSS\",\"layout\":\"Blog\"},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"tags/css.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
