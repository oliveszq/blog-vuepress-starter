---
title: 2.6 Java IO
date: 2024-11-25
---

# Java IO

## 字节流与字符流

- 字节流：`InputStream` / `OutputStream`
- 字符流：`Reader` / `Writer`

```java
try (FileInputStream in = new FileInputStream("demo.txt");
     FileOutputStream out = new FileOutputStream("copy.txt")) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = in.read(buffer)) != -1) {
        out.write(buffer, 0, len);
    }
}
```

## 缓冲流

```java
try (BufferedReader reader = Files.newBufferedReader(Path.of("demo.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## NIO

- `Files`、`Paths` 提供更易用的 API
- `ByteBuffer`、`Channels` 支持更高性能的操作

## 序列化

```java
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.bin"))) {
    oos.writeObject(new User("Java", 28));
}
```

## 注意事项

- 及时关闭流，优先使用 try-with-resources
- 善用 `Files.copy`、`Files.readAllLines` 等工具方法
- 大文件传输可考虑 NIO 或 Netty

