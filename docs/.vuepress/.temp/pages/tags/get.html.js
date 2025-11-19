import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/tags/get.html.vue"
const data = JSON.parse("{\"path\":\"/tags/get.html\",\"title\":\"标签 - Git\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"标签 - Git\",\"layout\":\"Blog\"},\"headers\":[],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"tags/get.md\"}")
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
