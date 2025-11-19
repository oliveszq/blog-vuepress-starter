import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/technique/2016/121501.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/technique/2016/121501.html\",\"title\":\"CSS 布局技巧分享\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"CSS 布局技巧分享\",\"date\":\"2016/12/15\",\"tags\":[\"css\",\"布局技巧\",\"前端开发\",\"最佳实践\"],\"categories\":[\"小技巧\"]},\"headers\":[],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"blogs/technique/2016/121501.md\"}")
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
