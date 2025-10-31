import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/technique/index.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/technique/\",\"title\":\"小技巧\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"小技巧\"},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/technique/README.md\"}")
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
