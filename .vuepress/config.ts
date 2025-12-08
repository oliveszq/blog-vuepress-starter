import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
import { themeConfig } from './config/index'
import { blogPagePlugin } from './plugin-blog-page-filter'
import { sakura } from '@anyfork/vuepress-plugin-sakura-next'
const __dirname = getDirname(import.meta.url)

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
    // bundler: webpackBundler(),
  
  // 配置 client 文件以注册自定义组件
  clientConfigFile: path.resolve(__dirname, './client.ts'),
  
  // 添加自定义插件
  plugins: [
    blogPagePlugin({
      catalogueInclude: ['blogs', 'docs']
    }),
    sakura({
      // 设置数量 默认 20
      sakura_num: 20,
      //是否显示，默认：true
      sakura_show: true,
      //层叠z-index值,默认：100，设置为-1确保在背景层
      sakura_zindex: 100,
      sakura_img: '/mapleLeaf.png'
    }) as any
  ],
  theme: recoTheme(themeConfig),
});
