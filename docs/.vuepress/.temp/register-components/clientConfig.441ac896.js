import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("IconHome", defineAsyncComponent(() => import("D:/order/blog/blog-vuepress-starter/docs/.vuepress/components/IconHome.vue")))
    
      app.component("tags-SmartTagCloud", defineAsyncComponent(() => import("D:/order/blog/blog-vuepress-starter/docs/.vuepress/components/tags/SmartTagCloud.vue")))
    
      app.component("tags-TagCloud", defineAsyncComponent(() => import("D:/order/blog/blog-vuepress-starter/docs/.vuepress/components/tags/TagCloud.vue")))
    
      app.component("tags-TagPage", defineAsyncComponent(() => import("D:/order/blog/blog-vuepress-starter/docs/.vuepress/components/tags/TagPage.vue")))
  },
}
