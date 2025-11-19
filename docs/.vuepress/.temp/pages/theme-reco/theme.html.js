import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/theme-reco/theme.html.vue"
const data = JSON.parse("{\"path\":\"/theme-reco/theme.html\",\"title\":\"1、使用git将本地代码上传到远程仓库！\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"createdTime\":1747400818000,\"updatedTime\":1747405351000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":2}]},\"filePathRelative\":\"theme-reco/theme.md\"}")
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
