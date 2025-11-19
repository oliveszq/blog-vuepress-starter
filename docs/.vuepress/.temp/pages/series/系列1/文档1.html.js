import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/series/系列1/文档1.html.vue"
const data = JSON.parse("{\"path\":\"/series/%E7%B3%BB%E5%88%971/%E6%96%87%E6%A1%A31.html\",\"title\":\"文章标题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"文章标题\",\"date\":\"2024-08-20T00:00:00.000Z\",\"categories\":[\"frontend-optimization\"],\"tags\":[\"performance\",\"web\"],\"series\":\"前端优化实战\",\"sticky\":0,\"isShowComments\":true},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"series/系列1/文档1.md\"}")
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
