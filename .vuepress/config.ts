import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
import { themeConfig } from './config/index'
import { blogPagePlugin } from './plugin-blog-page-filter'
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d'
import { oml2dConfig } from './config/oml2d'

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
    oml2dPlugin(oml2dConfig),
  ],
  theme: recoTheme(themeConfig),
});
