import comp from "D:/order/blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/blogs/technique/2017/092101.html.vue"
const data = JSON.parse("{\"path\":\"/blogs/technique/2017/092101.html\",\"title\":\"Git 高级使用技巧\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Git 高级使用技巧\",\"date\":\"2017/09/21\",\"tags\":[\"git\",\"版本控制\",\"开发工具\",\"高级技巧\"],\"categories\":[\"小技巧\"]},\"headers\":[],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blogs/technique/2017/092101.md\"}")
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
