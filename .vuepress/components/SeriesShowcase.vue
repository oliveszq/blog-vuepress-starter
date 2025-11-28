<template>
  <div class="series-showcase">
    <section class="series-hero">
      <p class="eyebrow">Series Collection</p>
      <h1>精选系列，系统进阶</h1>
      <p class="subtitle">
        精心梳理的主题课程，帮助你循序渐进地掌握核心知识。挑选一个系列，开启你的学习旅程。
      </p>
      <div class="hero-meta">
        <div>
          <p class="meta-value">2</p>
          <p class="meta-label">系列数量</p>
        </div>
        <div>
          <p class="meta-value">10+</p>
          <p class="meta-label">核心主题</p>
        </div>
        <div>
          <p class="meta-value">持续更新</p>
          <p class="meta-label">更新时间</p>
        </div>
      </div>
    </section>

    <section class="series-grid">
      <article
        v-for="card in cards"
        :key="card.title"
        class="series-card"
      >
        <div class="card-header">
          <p class="card-eyebrow">{{ card.category }}</p>
          <h2>{{ card.title }}</h2>
          <p class="card-desc">{{ card.description }}</p>
        </div>
        <ul class="card-topics">
          <li v-for="topic in card.topics" :key="topic">
            {{ topic }}
          </li>
        </ul>
        <div class="card-footer">
          <div class="article-count">
            <span>{{ card.count }} 篇文章</span>
          </div>
          <a class="card-link" :href="card.link">
            进入系列
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    category: "Performance",
    title: "前端优化实战",
    description:
      "全面掌握性能指标、代码与资源优化策略，打造极速体验的 Web 应用。",
    topics: ["Core Web Vitals", "代码优化", "资源加载", "监控与工具"],
    count: 3,
    link: "/series/系列1/",
  },
  {
    category: "Vue Advanced",
    title: "Vue.js 进阶指南",
    description:
      "深入 Vue 3 组合式 API、组件通信与性能优化，构建企业级前端应用。",
    topics: ["Composition API", "组件通信", "状态管理", "性能与工程化"],
    count: 3,
    link: "/series/系列2/",
  },
];
</script>

<style scoped>
:global(body) {
  --series-card-bg: linear-gradient(135deg, #1f1c2c, #928dab);
  --series-card-bg-alt: linear-gradient(135deg, #1d2b64, #f8cdda);
  --series-surface: rgba(255, 255, 255, 0.04);
  --series-border: rgba(255, 255, 255, 0.08);
}

.series-showcase {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0 2rem;
}

.series-hero {
  background: var(--series-card-bg);
  color: #fff;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(18, 20, 39, 0.35);
}

.series-hero h1 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  margin: 0.5rem 0 1rem;
}

.series-hero .subtitle {
  max-width: 60ch;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.hero-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.hero-meta div {
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-value {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.meta-label {
  margin: 0.4rem 0 0;
  color: rgba(255, 255, 255, 0.7);
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.series-card {
  background: var(--series-surface);
  border-radius: 24px;
  padding: 1.75rem;
  border: 1px solid var(--series-border);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
}

.series-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgba(255, 255, 255, 0.15),
    transparent 60%
  );
  pointer-events: none;
}

.series-card:nth-child(odd) {
  background-image: var(--series-card-bg);
  color: #fff;
}

.series-card:nth-child(even) {
  background-image: var(--series-card-bg-alt);
  color: #1b1f3a;
}

.card-header h2 {
  margin: 0.2rem 0 0.6rem;
  font-size: 1.6rem;
}

.card-desc {
  margin: 0;
  line-height: 1.7;
  color: inherit;
  opacity: 0.9;
}

.card-eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.8;
  margin: 0;
}

.card-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.card-topics li {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
}

.series-card:nth-child(even) .card-topics li {
  border-color: rgba(27, 31, 58, 0.2);
  background: rgba(255, 255, 255, 0.65);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
}

.series-card:nth-child(even) .card-footer {
  border-color: rgba(27, 31, 58, 0.15);
}

.article-count span {
  font-weight: 600;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  color: inherit;
}

.card-link span {
  transition: transform 0.2s ease;
}

.card-link:hover span {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .series-hero {
    padding: 1.75rem;
  }

  .series-card {
    padding: 1.5rem;
  }
}
</style>

