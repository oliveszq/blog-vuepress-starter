---
title: 前端性能优化实践
date: 2024/07/20
author: olivesQ
categories:
  - 前端优化
tags:
  - 前端开发
  - 性能优化
  - javascript
  - 最佳实践
  - 优化技巧
---

# 前端性能优化实践

## 1. 减少 HTTP 请求

### 合并文件
- 将多个 CSS 文件合并为一个
- 将多个 JavaScript 文件合并为一个
- 使用 CSS Sprites 合并小图片

### 使用 CDN
- 将静态资源部署到 CDN
- 选择离用户最近的节点

## 2. 优化图片

### 图片格式选择
- WebP 格式比 JPEG 小 25-35%
- PNG 适合图标和透明图片
- SVG 适合矢量图标

### 图片懒加载
```javascript
// 图片懒加载实现
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

## 3. JavaScript 优化

### 代码分割
```javascript
// 动态导入
const module = await import('./module.js');

// React 懒加载
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

### 防抖和节流
```javascript
// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

## 4. CSS 优化

### 关键 CSS
- 内联关键 CSS
- 异步加载非关键 CSS

### 避免重排和重绘
```css
/* 使用 transform 代替改变位置 */
.element {
  transform: translateX(100px);
  /* 而不是 left: 100px; */
}

/* 使用 will-change 提示浏览器 */
.animated {
  will-change: transform;
}
```

## 5. 缓存策略

### 浏览器缓存
- 设置合适的 Cache-Control 头
- 使用 ETag 进行缓存验证
- 版本号控制静态资源更新

### 应用缓存
```javascript
// Service Worker 缓存策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

## 总结

性能优化是一个持续的过程，需要：
1. 定期监控性能指标
2. 使用性能分析工具
3. 关注用户体验
4. 持续优化和改进

通过以上优化措施，可以显著提升网站的性能和用户体验。
