import { RecoThemeData } from 'vuepress-theme-reco/lib/types';
import { navbar } from "./navbar";
import { series } from "./series";

export const themeConfig: RecoThemeData = {
  // logo: "/logo.png",
  author: "olivesQ",
  authorAvatar: "/header.png",
  docsRepo: "https://github.com/oliveszq/blog-vuepress-starter", //文档源文件的仓库 URL 。它将会用于生成 编辑此页 的链接。
  docsBranch: "main", // 文档源文件的仓库分支。它将会用于生成 编辑此页 的链接。
  docsDir: 'example',
  colorMode: 'auto', // dark, light, 默认 auto
  colorModeSwitch: true, // 是否展示颜色模式开关，默认 true
  lastUpdatedText: "最后更新",
  catalogTitle: "页面导航",
  categoriesText: "分类",
  tagsText: "标签",
  notFound: '哇哦，没有发现这个页面！',
  // 编辑链接设置
  editLink: false,
  editLinkText: "编辑此页",
  editLinkPattern: ":repo/edit/:branch/:path",
  series: series,
  navbar: navbar,
  autoSetBlogCategories: true, // 自动设置分类
}