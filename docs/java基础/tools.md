---
title: 2.8 常用工具类
date: 2024-11-25
tags:
 - Java
 - 工具类
categories:
 - Java 自学系列
---

# 常用工具类

## Objects

```java
Objects.equals(a, b);
Objects.requireNonNull(param, "参数不能为空");
```

## Math 与 BigDecimal

```java
double result = Math.pow(2, 10);
BigDecimal price = new BigDecimal("19.99");
price = price.multiply(new BigDecimal("0.85"));
```

## Collections

```java
List<String> unmodifiable = Collections.unmodifiableList(names);
Collections.shuffle(list);
Collections.sort(list);
```

## Optional

```java
Optional.ofNullable(user)
    .map(User::getEmail)
    .ifPresent(System.out::println);
```

## 日期时间

```java
LocalDate today = LocalDate.now();
LocalDateTime deadline = LocalDateTime.now().plusDays(3);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
System.out.println(deadline.format(fmt));
```

## Apache Commons / Hutool

- `StringUtils`, `FileUtils`, `DigestUtils`
- Hutool 提供 Http、Excel、Cache 等实用工具

## 建议

- 封装自己的工具类时注意通用性与复用。
- 不要为了“方便”滥用静态方法，保持职责单一。

