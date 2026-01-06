---
title: 2.9 Java 新特性
date: 2024-11-25
tags:
 - Java
 - Java 新特性
categories:
 - Java 自学系列
---

# Java 新特性

## Java 8

- Lambda 表达式
- Stream API
- `Optional`
- `CompletableFuture`

```java
List<String> result = names.stream()
    .filter(name -> name.startsWith("J"))
    .map(String::toUpperCase)
    .toList();
```

## Java 11

- `var` 本地变量类型推断
- `HttpClient` 新 API
- 字符串增强：`"demo".isBlank()`

## Java 17

- `sealed class`
- `record`
- Pattern Matching for `instanceof`

```java
record User(String name, int age) {}

if (obj instanceof User user) {
    System.out.println(user.name());
}
```

## Java 21（LTS）

- 虚拟线程（Virtual Threads）
- 模式匹配 switch
- Structured Concurrency（预览）

## 升级建议

- 生产环境尽量使用 LTS 版本。
- 每年关注一次 JEP 列表，了解未来方向。
- 通过 Maven/Gradle 的 `targetCompatibility` 控制编译目标，保证兼容性。

