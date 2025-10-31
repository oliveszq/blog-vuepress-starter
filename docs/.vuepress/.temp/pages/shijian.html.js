import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/shijian.html.vue"
const data = JSON.parse("{\"path\":\"/shijian.html\",\"title\":\"实践\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"实践\",\"date\":\"2023-02-16T00:00:00.000Z\"},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"实践.md\"}")
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
