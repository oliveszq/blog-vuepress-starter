import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("IconCategory", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/IconCategory.vue")))
    
      app.component("IconHome", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/IconHome.vue")))
    
      app.component("IconTag", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/IconTag.vue")))
    
      app.component("tags-SmartTagCloud", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/tags/SmartTagCloud.vue")))
    
      app.component("tags-TagCloud", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/tags/TagCloud.vue")))
    
      app.component("tags-TagPage", defineAsyncComponent(() => import("E:/project/olives-blog/blog-vuepress-starter/docs/.vuepress/components/tags/TagPage.vue")))
  },
}
