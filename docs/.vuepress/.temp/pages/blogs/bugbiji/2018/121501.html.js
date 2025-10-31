import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/bugbiji/2018/121501.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/bugbiji/2018/121501.html\",\"title\":\"JavaScript 闭包问题排查\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"JavaScript 闭包问题排查\",\"date\":\"2018/12/15\",\"tags\":[\"javascript\",\"闭包\",\"bug修复\",\"前端开发\"],\"categories\":[\"bug笔记\"]},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/bug笔记/2018/121501.md\"}")
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
