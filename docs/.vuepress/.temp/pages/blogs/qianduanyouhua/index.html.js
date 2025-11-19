import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/qianduanyouhua/index.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/qianduanyouhua/\",\"title\":\"前端优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"前端优化\"},\"headers\":[{\"level\":2,\"title\":\"文章列表\",\"slug\":\"文章列表\",\"link\":\"#文章列表\",\"children\":[]}],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"blogs/前端优化/README.md\"}")
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
