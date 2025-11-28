---
title: 第一个 Java 程序
date: 2024-11-25
---

# 第一个 Java 程序

## 使用命令行

`HelloWorld.java`

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}
```

```bash
javac HelloWorld.java
java HelloWorld
```

## 在 IntelliJ IDEA 中运行

1. 新建 Class，粘贴上述代码。
2. 点击左侧绿色运行按钮。
3. 在 Run 控制台看到输出。

## 拓展练习

- 修改输出内容为自己的名字。
- 使用 `Scanner` 读取输入。
- 尝试将代码打包为 `.jar` 并运行：`jar --create --file hello.jar HelloWorld.class`.

