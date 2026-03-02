---
title: 2.4 面向对象编程
date: 2024-11-25
tags:
 - Java
 - 面向对象
categories:
 - Java 自学系列
---

# 面向对象编程

## 类与对象

```java
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void sayHello() {
        System.out.println("Hi, I'm " + name);
    }
}
```

## 封装

- 使用 `private` 隐藏内部数据
- 提供 `getter/setter`

## 继承

```java
public class Employee extends User {
    private String title;

    public Employee(String name, int age, String title) {
        super(name, age);
        this.title = title;
    }
}
```

## 多态

```java
User user = new Employee("Alice", 26, "SE");
user.sayHello(); // 调用子类实现
```

## 接口与抽象类

- 接口：约定行为，多实现
- 抽象类：部分实现，可包含状态

## 实践建议

- 遵循单一职责原则
- 组合优于继承
- 使用 Lombok 或 Record 简化数据类

