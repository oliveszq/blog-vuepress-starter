export const themeData = JSON.parse("{\"logo\":\"/logo.png\",\"author\":\"olivesQ\",\"authorAvatar\":\"/header.png\",\"docsRepo\":\"https://github.com/oliveszq/blog-vuepress-starter\",\"docsBranch\":\"main\",\"docsDir\":\"docs\",\"lastUpdatedText\":\"最后更新\",\"editLink\":true,\"editLinkText\":\"编辑此页\",\"editLinkPattern\":\":repo/edit/:branch/:path\",\"series\":{\"/categories/\":[{\"text\":\"首页\",\"children\":[\"home\",\"theme\"]},{\"text\":\"module two\",\"children\":[\"api\",\"plugin\"]}]},\"navbar\":[{\"text\":\"首页\",\"link\":\"/\",\"icon\":\"IconHome\"},{\"text\":\"分类\",\"link\":\"/categories/\"},{\"text\":\"标签\",\"link\":\"/tags/\"},{\"text\":\"文档\",\"children\":[{\"text\":\"bug笔记\",\"link\":\"/blogs/bug笔记\"},{\"text\":\"小技巧\",\"link\":\"/blogs/technique\"}]}]}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
