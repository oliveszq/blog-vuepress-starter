---
title: 使用chocolatey安装java
date: 2026-02-27 00:01:00
categories:
 - Java
 - chocolatey
tags:
 - java
 - chocolatey
---

## 一、了解-chocolatey

这是一个 Windows 下的命令行软件管理器，可以方便开发者像在 Linux 下使用 yum 命令来安装软件，或者像在 macOS 下使用 brew 命令来安装软件。

### 1、安装chocolatey

第一步，以管理员的身份打开 cmd 命令行。

第二步，执行以下命令：

~~~
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
~~~

第三步，通过键入 `choco -v`  命令来确认是否安装成功。

### 2、删除chocolatey

如果安装中出现问题：

1. 打开命令提示符（以管理员身份运行）或 PowerShell。

   运行命令：choco uninstall chocolatey

   这将尝试卸载已经安装的 Chocolatey。

2. 删除残留文件

   打开文件资源管理器，转到以下路径：C:\ProgramData\chocolatey 和 C:\ProgramData\chocolatey\bin

   删除这些文件夹中的所有内容。请确保在删除文件或文件夹之前备份重要数据，以防意外删除。

3. 删除环境变量

   有时，安装程序会添加 Chocolatey 相关的路径到系统的环境变量。你可以手动删除这些条目：

   在 Windows 中搜索并打开“环境变量”设置。

   在“系统变量”部分找到名为“Path”的条目，编辑它。

   删除与 Chocolatey 相关的任何条目，这些条目可能会指向 C:\ProgramData\chocolatey\bin 或类似路径。

4. 清理注册表

   警告：在编辑注册表时，请务必小心。不正确的更改可能会导致系统问题。建议在进行更改之前备份注册表。

   打开注册表编辑器：在 Windows 搜索中键入“regedit”并打开注册表编辑器。

   导航至 HKEY_CURRENT_USER\Software\ 和 HKEY_LOCAL_MACHINE\Software\

   删除与 Chocolatey 相关的任何条目。通常这些可以在 chocolatey 或 Chocolatey Software 下找到。



## 通过chocolatey安装java

使用命令` choco install openjdk17`进行安装。

**查看已安装的软件**

```
choco list
```

**找到包名后卸载**

例如如果看到：

```
temurin17 17.0.10
```

就执行：

```
choco uninstall temurin17 -y
```

**自定义路径安装**

~~~shell
choco install temurin17 --params="/ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome /INSTALLDIR=D:\software\java\jdk17"
~~~

**📌 参数解释**

| 参数                  | 作用               |
| --------------------- | ------------------ |
| FeatureMain           | 核心安装（必须）   |
| FeatureEnvironment    | 自动加 PATH        |
| FeatureJavaHome       | 自动设置 JAVA_HOME |
| FeatureJarFileRunWith | 关联 .jar          |
| INSTALLDIR            | 指定安装路径       |