import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/theme-reco/plugin.html.vue"
const data = JSON.parse("{\"path\":\"/theme-reco/plugin.html\",\"title\":\"plugin\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"plugin\",\"date\":\"2020/05/28\"},\"headers\":[],\"git\":{\"createdTime\":1747400818000,\"updatedTime\":1747400818000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"theme-reco/plugin.md\"}")
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
