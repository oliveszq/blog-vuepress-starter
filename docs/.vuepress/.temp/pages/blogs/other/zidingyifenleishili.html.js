import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/other/zidingyifenleishili.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/other/zidingyifenleishili.html\",\"title\":\"自定义分类示例\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"自定义分类示例\",\"date\":\"2025-11-03T00:00:00.000Z\",\"categories\":[\"我的分类\"],\"tags\":[\"demo\",\"指南\"]},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/other/自定义分类示例.md\"}")
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
