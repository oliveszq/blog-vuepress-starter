import 'vuepress-theme-reco'

declare module 'vuepress-theme-reco' {
  interface RecoThemeData {
    /**
     * 配置需要扫描的目录列表，用于博客标签和分类功能
     * @default ['blogs']
     */
    catalogueInclude?: string[]
  }
}
