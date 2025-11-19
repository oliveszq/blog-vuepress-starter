import comp from "E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"modules\":[\"BannerBrand\",\"Blog\",\"MdContent\",\"Footer\"],\"bannerBrand\":{\"bgImage\":\"/bg.svg\",\"title\":\"olivesQ博客\",\"description\":\"记录每一步成长，点亮每一刻灵感。\",\"tagline\":\"这是一个专注于技术分享、学习记录与个人成长的博客平台。在这里，你会看到博主在编程、开发经验、项目实践以及日常思考中的点滴积累。无论是前端后端、工具使用还是人生感悟，我们都希望为你带来有价值的内容。\",\"buttons\":[{\"text\":\"Guide\",\"link\":\"/docs/guide/introduce\"},{\"text\":\"Default Style\",\"link\":\"/docs/style-default-api/introduce\",\"type\":\"plain\"}],\"socialLinks\":[{\"icon\":\"LogoGithub\",\"link\":\"https://github.com/vuepress-reco/vuepress-theme-reco\"}]},\"blog\":{\"socialLinks\":[{\"icon\":\"LogoGithub\",\"link\":\"https://github.com/recoluan\"}]},\"isShowTitleInHome\":true,\"actionText\":\"About\",\"actionLink\":\"/views/other/about\"},\"headers\":[],\"git\":{\"createdTime\":1761925832000,\"updatedTime\":1761925832000,\"contributors\":[{\"name\":\"xiaoqingxx\",\"email\":\"2783123570@qq.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")
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
