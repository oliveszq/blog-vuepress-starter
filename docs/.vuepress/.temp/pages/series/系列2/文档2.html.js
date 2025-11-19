import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/series/系列2/文档2.html.vue"
const data = JSON.parse("{\"path\":\"/series/%E7%B3%BB%E5%88%972/%E6%96%87%E6%A1%A32.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"series/系列2/文档2.md\"}")
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
