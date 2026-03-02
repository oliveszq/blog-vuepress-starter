---
title: 安装 JDK
date: 2024-11-25
tags:
 - Java
 - 安装
 - JDK
categories:
 - Java 自学系列
---

# 安装 JDK

## 选择版本

- 学习阶段推荐使用长期支持版本（LTS），如 Java 17 或 Java 21。
- Oracle、Adoptium、Amazon Corretto 等发行版均可，保持版本一致最重要。

## Windows 安装

1. 前往发行版官网下载安装包。
2. 双击安装，建议把路径设置为 `C:\\Java\\jdk-17` 这类不含空格的目录。
3. 配置环境变量：
   - `JAVA_HOME = C:\\Java\\jdk-17`
   - 在 `Path` 中新增 `%JAVA_HOME%\\bin`
4. 打开 PowerShell 执行 `java -version` 验证。

## macOS 安装

```bash
brew install temurin
java -version
```

## Linux 安装

```bash
sudo apt install temurin-17-jdk
java -version
```

## 验证

```bash
java -version
javac -version
```

若输出版本号即安装成功。

