import { defineClientConfig } from '@vuepress/client'
import IconHome from './components/IconHome.vue'
import IconBlogs from './components/IconBlogs.vue'
import IconTimeLine from './components/IconTimeLine.vue'
import IconCategory from './components/IconCategory.vue'
import IconTag from './components/IconTag.vue'
import IconSeries from './components/IconSeries.vue'
import CustomFooter from './components/CustomFooter.vue'
import SearchBox from './components/SearchBox.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册自定义 icon 组件
    app.component('IconHome', IconHome)
    app.component('IconBlogs', IconBlogs)
    app.component('IconTimeLine', IconTimeLine)
    app.component('IconCategory', IconCategory)
    app.component('IconTag', IconTag)
    app.component('IconSeries', IconSeries)
    app.component('CustomFooter', CustomFooter)
    // 注册搜索组件
    app.component('SearchBox', SearchBox)
  },
})
