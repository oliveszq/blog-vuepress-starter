import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/bugbiji/2019/092101.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/bugbiji/2019/092101.html\",\"title\":\"Vue 组件通信问题解决\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue 组件通信问题解决\",\"date\":\"2019/09/21\",\"tags\":[\"vue\",\"组件通信\",\"问题排查\",\"前端开发\"],\"categories\":[\"bug笔记\"]},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/bug笔记/2019/092101.md\"}")
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
