import type { Plugin } from 'vuepress'
import type { Page } from '@vuepress/core'

export interface BlogPagePluginOptions {
  /**
   * 需要扫描的目录列表
   */
  catalogueInclude?: string[]
}

export const blogPagePlugin = (options: BlogPagePluginOptions = {}): Plugin => {
  const { catalogueInclude = ['blogs'] } = options

  return {
    name: '@local/vuepress-plugin-blog-page-filter',

    extendsPage: (page: Page) => {
      // vuepress-theme-reco 硬编码了只扫描 /blogs/ 目录的正则: /.+\/blogs\/[(.+)\/]?.+\.md$/
      // 我们需要修改 filePath 让其他目录的文件也能被识别为博客文章
      
      if (!page.filePath) return

      // 检查页面是否在配置的目录中(但不在 blogs 目录)
      const isInOtherCatalogue = catalogueInclude.some(dir => {
        if (dir === 'blogs') return false // 跳过 blogs,它已经被主题支持
        return page.filePathRelative?.startsWith(`${dir}/`)
      })

      // 如果页面在其他目录中，且有 tags 或 categories，修改其 filePath
      if (isInOtherCatalogue && (page.frontmatter?.tags || page.frontmatter?.categories)) {
        // 将 docs/xxx/yyy.md 的路径模式改为 blogs/xxx/yyy.md 的模式
        // 这样就能匹配主题的正则表达式
        const match = page.filePathRelative?.match(/^([^/]+)\/(.+)$/)
        if (match) {
          const [, dir, restPath] = match
          // 保存原始路径到 frontmatter，以便后续使用
          page.frontmatter._originalDir = dir
          // 临时修改 filePath 以匹配主题的正则
          page.filePath = page.filePath.replace(new RegExp(`/${dir}/`), '/blogs/')
          
          console.log(`[Blog Page Filter] 修改路径: ${page.filePathRelative} -> 伪装为 blogs 目录`)
        }
      }
    },
  }
}
