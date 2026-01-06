---
title: 2.10 网络编程
date: 2024-11-25
tags:
 - Java
 - 网络编程
categories:
 - Java 自学系列
---

# 网络编程

## Socket 基础

```java
// 服务端
try (ServerSocket server = new ServerSocket(8000)) {
    while (true) {
        Socket socket = server.accept();
        handle(socket);
    }
}
```

```java
// 客户端
try (Socket socket = new Socket("localhost", 8000);
     PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) {
    out.println("Hello Server");
}
```

## HTTP 客户端

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com"))
    .GET()
    .build();
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
System.out.println(response.body());
```

## Netty 与 Reactor

- Netty 提供高性能异步网络框架，适合自定义协议。
- Spring WebFlux 基于 Reactor，面向响应式编程。

## 调试技巧

- 使用 `tcpdump`/`Wireshark` 抓包。
- 善用 `nc`、`curl` 等命令行工具模拟请求。
- 关注超时、重试、连接池配置。

