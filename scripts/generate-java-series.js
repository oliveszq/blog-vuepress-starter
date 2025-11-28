/**
 * Java 系列自动化生成脚本
 * 用于批量创建 Java 学习系列的目录和 Markdown 文件
 */

const fs = require('fs');
const path = require('path');

// 定义完整的系列结构
const seriesStructure = [
  {
    folder: '01-introduction',
    articles: [
      { file: '01-what-is-java.md', title: '什么是 Java', date: '2025-01-01', tags: ['Java', '入门'] },
      { file: '02-java-platforms.md', title: 'Java 平台体系', date: '2025-01-02', tags: ['Java', '入门'] },
      { file: '03-environment-setup.md', title: '开发环境搭建', date: '2025-01-03', tags: ['Java', '入门', '环境配置'] }
    ]
  },
  {
    folder: '02-basic-syntax',
    articles: [
      { file: '01-variables.md', title: '变量与常量', date: '2025-01-04', tags: ['Java', '基础语法'] },
      { file: '02-data-types.md', title: '数据类型', date: '2025-01-05', tags: ['Java', '基础语法'] },
      { file: '03-operators.md', title: '运算符', date: '2025-01-06', tags: ['Java', '基础语法'] },
      { file: '04-control-flow.md', title: '流程控制', date: '2025-01-07', tags: ['Java', '基础语法'] },
      { file: '05-methods.md', title: '方法定义与调用', date: '2025-01-08', tags: ['Java', '基础语法'] }
    ]
  },
  {
    folder: '03-object-oriented',
    articles: [
      { file: '01-oop-concepts.md', title: '面向对象核心概念', date: '2025-01-09', tags: ['Java', '面向对象'] },
      { file: '02-classes-and-objects.md', title: '类与对象', date: '2025-01-10', tags: ['Java', '面向对象'] },
      { file: '03-inheritance.md', title: '继承', date: '2025-01-11', tags: ['Java', '面向对象'] },
      { file: '04-polymorphism.md', title: '多态', date: '2025-01-12', tags: ['Java', '面向对象'] },
      { file: '05-interfaces.md', title: '接口', date: '2025-01-13', tags: ['Java', '面向对象'] },
      { file: '06-abstract-classes.md', title: '抽象类', date: '2025-01-14', tags: ['Java', '面向对象'] }
    ]
  },
  {
    folder: '04-core-api',
    articles: [
      { file: '01-string.md', title: 'String 字符串', date: '2025-01-15', tags: ['Java', '核心 API'] },
      { file: '02-wrapper-types.md', title: '包装类型', date: '2025-01-16', tags: ['Java', '核心 API'] },
      { file: '03-exceptions.md', title: '异常处理', date: '2025-01-17', tags: ['Java', '核心 API'] },
      { file: '04-file-io.md', title: '文件 I/O 操作', date: '2025-01-18', tags: ['Java', '核心 API'] },
      { file: '05-annotations.md', title: '注解', date: '2025-01-19', tags: ['Java', '核心 API'] }
    ]
  },
  {
    folder: '05-collections',
    articles: [
      { file: '01-collection-overview.md', title: '集合框架概述', date: '2025-01-20', tags: ['Java', '集合框架'] },
      { file: '02-list.md', title: 'List 列表', date: '2025-01-21', tags: ['Java', '集合框架'] },
      { file: '03-set.md', title: 'Set 集合', date: '2025-01-22', tags: ['Java', '集合框架'] },
      { file: '04-map.md', title: 'Map 映射', date: '2025-01-23', tags: ['Java', '集合框架'] },
      { file: '05-collections-algorithms.md', title: '集合工具类与算法', date: '2025-01-24', tags: ['Java', '集合框架'] }
    ]
  },
  {
    folder: '06-generics',
    articles: [
      { file: '01-why-generics.md', title: '为什么需要泛型', date: '2025-01-25', tags: ['Java', '泛型'] },
      { file: '02-generic-methods.md', title: '泛型方法与通配符', date: '2025-01-26', tags: ['Java', '泛型'] }
    ]
  },
  {
    folder: '07-multithreading',
    articles: [
      { file: '01-thread-basics.md', title: '线程基础', date: '2025-01-27', tags: ['Java', '多线程'] },
      { file: '02-runnable.md', title: 'Runnable 与 Callable', date: '2025-01-28', tags: ['Java', '多线程'] },
      { file: '03-thread-safety.md', title: '线程安全', date: '2025-01-29', tags: ['Java', '多线程'] },
      { file: '04-synchronized.md', title: 'synchronized 关键字', date: '2025-01-30', tags: ['Java', '多线程'] },
      { file: '05-locks.md', title: 'Lock 锁机制', date: '2025-01-31', tags: ['Java', '多线程'] },
      { file: '06-thread-pool.md', title: '线程池', date: '2025-02-01', tags: ['Java', '多线程'] }
    ]
  },
  {
    folder: '08-jvm',
    articles: [
      { file: '01-jvm-architecture.md', title: 'JVM 体系结构', date: '2025-02-02', tags: ['Java', 'JVM'] },
      { file: '02-class-loading.md', title: '类加载机制', date: '2025-02-03', tags: ['Java', 'JVM'] },
      { file: '03-memory-structure.md', title: '内存结构', date: '2025-02-04', tags: ['Java', 'JVM'] },
      { file: '04-gc.md', title: '垃圾回收机制', date: '2025-02-05', tags: ['Java', 'JVM'] },
      { file: '05-jvm-tuning.md', title: 'JVM 调优', date: '2025-02-06', tags: ['Java', 'JVM'] }
    ]
  },
  {
    folder: '09-java8-features',
    articles: [
      { file: '01-lambda.md', title: 'Lambda 表达式', date: '2025-02-07', tags: ['Java', 'Java 8'] },
      { file: '02-stream.md', title: 'Stream API', date: '2025-02-08', tags: ['Java', 'Java 8'] },
      { file: '03-new-date-api.md', title: '新日期时间 API', date: '2025-02-09', tags: ['Java', 'Java 8'] }
    ]
  },
  {
    folder: '10-spring',
    articles: [
      { file: '01-spring-ioc.md', title: 'Spring IoC 容器', date: '2025-02-10', tags: ['Java', 'Spring'] },
      { file: '02-spring-aop.md', title: 'Spring AOP 面向切面编程', date: '2025-02-11', tags: ['Java', 'Spring'] },
      { file: '03-spring-boot-intro.md', title: 'Spring Boot 入门', date: '2025-02-12', tags: ['Java', 'Spring Boot'] },
      { file: '04-spring-mvc.md', title: 'Spring MVC 原理', date: '2025-02-13', tags: ['Java', 'Spring'] }
    ]
  },
  {
    folder: '11-database',
    articles: [
      { file: '01-jdbc.md', title: 'JDBC 数据库连接', date: '2025-02-14', tags: ['Java', '数据库'] },
      { file: '02-mybatis.md', title: 'MyBatis 持久层框架', date: '2025-02-15', tags: ['Java', 'MyBatis'] },
      { file: '03-spring-data-jpa.md', title: 'Spring Data JPA', date: '2025-02-16', tags: ['Java', 'Spring Data'] }
    ]
  },
  {
    folder: '12-project',
    articles: [
      { file: '01-project-env.md', title: '项目环境准备', date: '2025-02-17', tags: ['Java', '项目实战'] },
      { file: '02-backend-api-design.md', title: '后端 API 设计', date: '2025-02-18', tags: ['Java', '项目实战'] },
      { file: '03-spring-boot-demo.md', title: 'Spring Boot 项目实战', date: '2025-02-19', tags: ['Java', '项目实战'] },
      { file: '04-deploy.md', title: '项目部署上线', date: '2025-02-20', tags: ['Java', '项目实战'] }
    ]
  }
];

/**
 * 生成 Markdown 文件的 frontmatter 和模板
 */
function generateMarkdownContent(title, date, tags) {
  const tagsFormatted = tags.map(tag => ` - ${tag}`).join('\n');
  
  return `---
title: ${title}
date: ${date}
categories:
 - Java 自学系列
tags:
${tagsFormatted}
sidebar: 'auto'
---

# ${title}

<!-- 在这里编写你的内容 -->
`;
}

/**
 * 创建目录(如果不存在)
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 创建目录: ${dirPath}`);
  }
}

/**
 * 创建 Markdown 文件
 */
function createMarkdownFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 创建文件: ${filePath}`);
  } else {
    console.log(`⚠️  文件已存在,跳过: ${filePath}`);
  }
}

/**
 * 生成整个系列结构
 */
function generateJavaSeries(baseDir = './series/java') {
  console.log('🚀 开始生成 Java 自学系列...\n');
  
  // 确保基础目录存在
  ensureDirectoryExists(baseDir);
  
  let totalFiles = 0;
  
  // 遍历每个章节
  seriesStructure.forEach(chapter => {
    const chapterPath = path.join(baseDir, chapter.folder);
    ensureDirectoryExists(chapterPath);
    
    // 遍历每篇文章
    chapter.articles.forEach(article => {
      const filePath = path.join(chapterPath, article.file);
      const content = generateMarkdownContent(article.title, article.date, article.tags);
      createMarkdownFile(filePath, content);
      totalFiles++;
    });
  });
  
  console.log(`\n✨ 完成!共生成 ${totalFiles} 个文件`);
  console.log(`📁 输出目录: ${path.resolve(baseDir)}`);
}

// 执行生成
if (require.main === module) {
  // 可以通过命令行参数指定输出目录
  const outputDir = process.argv[2] || './series/java';
  generateJavaSeries(outputDir);
}

module.exports = { generateJavaSeries, generateMarkdownContent };
