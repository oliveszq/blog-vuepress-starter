export const navbar = [
    { text: "首页", link: "/", icon: 'IconHome' }, 
    { text: '博客', link: '/posts', icon: 'IconBlogs' },
    { text: '时间轴', link: '/timeline', icon: 'IconTimeLine' },
    { text: "分类", link: "/categories/", icon: 'IconCategory' },
    { text: "标签", link: "/tags/Java/1.html", icon: 'IconTag' },
    { text: "文档", link: "/series/", icon: 'IconSeries' },
    { text: "灵机一动小问题", children: [
      { text: "bug笔记", link: "/blogs/bug笔记" },
      { text: "小技巧", link: "/blogs/technique" },
    ],}
  ]