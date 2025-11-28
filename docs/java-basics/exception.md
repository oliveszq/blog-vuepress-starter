---
title: 2.7 异常处理
date: 2024-11-25
---

# 异常处理

## 异常分类

- **受检异常**（checked）：编译器要求显式处理，例如 `IOException`.
- **运行时异常**（runtime）：`NullPointerException`、`IllegalArgumentException`.
- **错误**（Error）：`OutOfMemoryError` 等，通常无法恢复。

## try-catch-finally

```java
try {
    Files.readString(Path.of("config.json"));
} catch (IOException e) {
    log.error("读取配置失败", e);
} finally {
    System.out.println("一定会执行");
}
```

## 自定义异常

```java
public class BizException extends RuntimeException {
    public BizException(String message) {
        super(message);
    }
}
```

## 最佳实践

- 优先抛出有意义的自定义异常，便于定位问题。
- 不要在 catch 中吞掉异常。
- 使用日志记录上下文信息。
- 善用 `try-with-resources` 自动关闭资源。

