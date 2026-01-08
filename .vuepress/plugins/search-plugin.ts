import type { Plugin } from 'vuepress'
import type { Page } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export interface SearchPluginOptions {
  /**
   * 最大建议数
   */
  maxSuggestions?: number
  /**
   * 是否启用热键（默认 Ctrl+K 或 Cmd+K）
   */
  hotKeys?: string[]
  /**
   * 占位符文本
   */
  placeholder?: string
}

export const searchPlugin = (options: SearchPluginOptions = {}): Plugin => {
  const {
    maxSuggestions = 10,
    hotKeys = ['ctrl', 'k'],
    placeholder = '搜索',
  } = options

  return {
    name: '@local/vuepress-plugin-search',

    onPrepared(app) {
      // 生成搜索索引
      const searchIndex: Array<{
        title: string
        headers: string[]
        path: string
        content: string
      }> = []

      app.pages.forEach((page: Page) => {
        // 排除首页和特殊页面
        if (page.path === '/' || page.path.startsWith('/404')) {
          return
        }

        const title = page.title || ''
        const headers: string[] = []
        const content = page.contentRendered || ''

        // 提取标题（h1-h6）
        const headerRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi
        let match
        while ((match = headerRegex.exec(content)) !== null) {
          const headerText = match[1]
            .replace(/<[^>]+>/g, '') // 移除 HTML 标签
            .trim()
          if (headerText) {
            headers.push(headerText)
          }
        }

        // 提取纯文本内容（用于搜索）
        const textContent = content
          .replace(/<[^>]+>/g, ' ') // 移除 HTML 标签
          .replace(/\s+/g, ' ') // 合并空白字符
          .trim()
          .substring(0, 5000) // 限制长度

        searchIndex.push({
          title,
          headers,
          path: page.path,
          content: textContent,
        })
      })

      // 将搜索索引写入临时文件
      if (app.writeTemp) {
        app.writeTemp(
          'search-index.js',
          `export default ${JSON.stringify(searchIndex, null, 2)}`
        )
      }
    },
  }
}

