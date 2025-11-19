<template><div><p>这里是一篇用于演示“自定义分类”的示例文章。将 frontmatter 中的 <code v-pre>categories</code> 设为“我的分类”后，主题会：</p>
<ul>
<li>在分类总览页 <code v-pre>/categories/</code> 中显示“我的分类”</li>
<li>生成对应分类的列表页（分页路径形如 <code v-pre>/categories/我的分类/1.html</code>）</li>
<li>如已开启 <code v-pre>autoAddCategoryToNavbar</code>，会自动将分类入口加入导航栏</li>
</ul>
<p>你可以继续为其他文章设置相同的 <code v-pre>categories: [我的分类]</code>，这些文章都会归到该分类下。</p>
</div></template>


