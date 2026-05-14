import type { Plugin } from 'vuepress'
import type { Page } from '@vuepress/core'

export interface SearchPluginOptions {
  /** 最大建议数（保留给客户端使用） */
  maxSuggestions?: number
  /** 是否启用热键（默认 Ctrl+K 或 Cmd+K） */
  hotKeys?: string[]
  /** 占位符文本 */
  placeholder?: string
}

interface SearchIndexEntry {
  title: string
  headers: string[]
  path: string
  content: string
}

// 主题自动生成、没有真实正文的列表页，纳入索引只会污染结果
const EXCLUDED_PATH_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/404(?:\.html|\/)/,
  /^\/posts(?:\.html|\/|$)/,
  /^\/timeline(?:\.html|\/|$)/,
  /^\/friendship-link(?:\.html|\/|$)/,
  /^\/categories\//,
  /^\/tags\//,
]

const flattenHeaders = (
  headers: Array<{ title: string; children?: any[] }> | undefined,
  out: string[] = []
): string[] => {
  if (!headers) return out
  for (const h of headers) {
    if (h?.title) out.push(h.title)
    if (h?.children?.length) flattenHeaders(h.children, out)
  }
  return out
}

// 把 markdown 原文里的语法符号、代码块、HTML 标签清理掉，得到便于搜索的纯文本
const stripMarkdown = (md: string): string =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^---[\s\S]*?---/m, ' ') // frontmatter
    .replace(/[#>*_~`|=]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const searchPlugin = (_options: SearchPluginOptions = {}): Plugin => {
  return {
    name: '@local/vuepress-plugin-search',

    onPrepared(app) {
      const searchIndex: SearchIndexEntry[] = []

      app.pages.forEach((page: Page) => {
        if (EXCLUDED_PATH_PATTERNS.some((re) => re.test(page.path))) return

        // frontmatter 显式标记不索引
        if ((page.frontmatter as any)?.search === false) return

        const title = (page.title || '').trim()
        const rawContent = page.content || ''
        const textContent = stripMarkdown(rawContent).substring(0, 5000)

        // 既没标题又没正文的页面没意义
        if (!title && !textContent) return

        searchIndex.push({
          title,
          headers: flattenHeaders(page.headers as any),
          path: page.path,
          content: textContent,
        })
      })

      if (app.writeTemp) {
        app.writeTemp(
          'search-index.js',
          `export default ${JSON.stringify(searchIndex)}`
        )
      }
    },
  }
}
