---
title: 2.5 集合框架（含容器）
date: 2024-11-25
tags:
 - Java
 - 集合框架
 - 容器
categories:
 - Java 自学系列
---

# 集合框架（含容器）

## 体系图

- `Collection`
  - `List`: ArrayList, LinkedList
  - `Set`: HashSet, TreeSet
- `Map`: HashMap, LinkedHashMap, TreeMap

## List 示例

```java
List<String> names = new ArrayList<>();
names.add("Java");
names.add("Kotlin");
System.out.println(names.get(0));
```

## Set 示例

```java
Set<Integer> ids = new HashSet<>();
ids.add(1);
ids.add(1); // 自动去重
System.out.println(ids.size()); // 1
```

## Map 示例

```java
Map<String, Integer> score = new HashMap<>();
score.put("张三", 95);
score.put("李四", 88);
System.out.println(score.get("张三"));
```

## 迭代方式

- for-each
- `Iterator`
- Java 8 `forEach`

```java
names.forEach(System.out::println);
```

## 使用建议

- 根据访问/插入场景选择 ArrayList 或 LinkedList
- 需要线程安全可使用 `Collections.synchronizedList` 或 `CopyOnWriteArrayList`
- 使用 `Objects.equals` 和 `Objects.hash` 实现 `equals/hashCode`

