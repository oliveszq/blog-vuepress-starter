import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  // 设置站点语言为中文
  lang: 'zh-CN',
  // 站点标题
  title: 'olivesQ博客',
  // 站点描述
  description: '这是我的个人博客',
  // 国际化设置
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'olivesQ博客',
      description: '这是我的个人博客',
    }
  },

  bundler: viteBundler(),
  theme: recoTheme({
    logo: "/logo.png",
    author: "olivesQ",
    authorAvatar: "/header.png",
    docsRepo: "https://github.com/oliveszq/blog-vuepress-starter",
    docsBranch: "main",
    docsDir: "docs",
    lastUpdatedText: "最后更新",
    
    // 编辑链接设置
    editLink: true,
    editLinkText: "编辑此页",
    editLinkPattern: ":repo/edit/:branch/:path",
    // series 为原 sidebar
    series: {
      "/categories/": [
        {
          text: "首页",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/", icon: 'IconHome' }, 
      { text: "分类", link: "/categories/" },
      { text: "标签", link: "/tags/" },
      {
        text: "文档",
        children: [
          { text: "bug笔记", link: "/blogs/bug笔记" },
          { text: "小技巧", link: "/blogs/technique" },
        ],
      },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
  }),
});
