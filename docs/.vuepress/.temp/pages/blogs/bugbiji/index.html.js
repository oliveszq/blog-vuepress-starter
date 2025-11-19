import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/bugbiji/index.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/bugbiji/\",\"title\":\"Bug 笔记\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Bug 笔记\"},\"headers\":[],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"blogs/bug笔记/README.md\"}")
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
