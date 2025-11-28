---
title: 2.2 Java 语法基础
date: 2024-11-25
---

# Java 语法基础

## 数据类型

- **基本类型**：`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`
- **引用类型**：类、接口、数组、枚举

```java
int age = 18;
double price = 19.99;
boolean vip = true;
char level = 'A';
```

## 流程控制

```java
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("加油");
}
```

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

## 方法

```java
public static int add(int a, int b) {
    return a + b;
}
```

## 包与访问控制

- `public`：对所有类可见
- `protected`：同包或子类可见
- `default`：仅同包可见
- `private`：仅当前类可见

## 建议

- 使用驼峰命名
- 一个文件只放一个 public 类
- 合理拆分方法，方法不要太长

