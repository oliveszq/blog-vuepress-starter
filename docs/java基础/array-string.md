---
title: 2.3 数组与字符串
date: 2024-11-25
tags:
 - Java
 - 数组
 - 字符串
categories:
 - Java 自学系列
---

# 数组与字符串

## 数组

```java
int[] scores = {98, 87, 92};
scores[1] = 90;
System.out.println(scores.length);
```

### 常见操作

- 遍历：for / foreach
- 排序：`Arrays.sort(scores)`
- 拷贝：`Arrays.copyOf(scores, scores.length)`

## 字符串

```java
String name = "Java";
String welcome = "Hello " + name;
```

### 常用方法

- `length()`：长度
- `substring(begin, end)`：子串
- `equals()`：内容比较
- `split()`：拆分
- `StringBuilder`：高频拼接

```java
StringBuilder builder = new StringBuilder();
builder.append("Hello");
builder.append(" Java");
System.out.println(builder.toString());
```

## 注意

- 字符串不可变，每次修改都会生成新对象。
- 当需要频繁拼接时请选择 `StringBuilder`.
- Arrays 默认 `toString` 不友好，可使用 `Arrays.toString`.

