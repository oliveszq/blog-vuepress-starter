import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/tags/index.html.vue"
const data = JSON.parse("{\"path\":\"/tags/\",\"title\":\"标签总览\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"标签总览\",\"editLink\":false,\"pageToc\":false},\"headers\":[{\"level\":2,\"title\":\"使用说明\",\"slug\":\"使用说明\",\"link\":\"#使用说明\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"tags/README.md\"}")
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
