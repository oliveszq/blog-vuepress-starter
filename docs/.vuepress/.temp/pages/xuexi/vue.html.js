import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/xuexi/vue.html.vue"
const data = JSON.parse("{\"path\":\"/xuexi/vue.html\",\"title\":\"Vue 学习\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue 学习\",\"date\":\"2023-02-16T00:00:00.000Z\"},\"headers\":[],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"学习/vue.md\"}")
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
