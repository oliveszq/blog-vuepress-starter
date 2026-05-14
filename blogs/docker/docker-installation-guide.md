---
title: Docker 完整安装与入门指南
date: 2026-05-14 00:01:00
categories:
 - Docker
tags:
 - docker
 - 容器
 - 运维
 - 入门
---

## 一、Docker 是什么？

Docker 是目前最主流的**容器化平台**。容器把应用和它依赖的运行环境（库、配置、二进制文件等）打包到一个**镜像（Image）**里，运行时再以**容器（Container）**的形式启动。

**容器 vs 虚拟机：**

| 对比项     | 虚拟机（VM）              | 容器（Container）      |
| ---------- | ------------------------- | ---------------------- |
| 隔离层级   | 硬件级（Hypervisor）      | 操作系统级（内核共享） |
| 启动速度   | 分钟级                    | 秒级，甚至毫秒级       |
| 体积       | GB 级（含完整 OS）        | MB 级（仅应用 + 依赖） |
| 资源占用   | 高                        | 低                     |
| 可移植性   | 好                        | 极好                   |

简单说：**虚拟机像"整栋房子"，容器像"独立公寓"**——共用一栋楼的承重和水电（宿主机内核），但彼此互不干扰。

> 本文以当前主流的 **Docker Engine 24+ / Docker Desktop 4.x** 为准，覆盖 Windows、Ubuntu/Debian、CentOS/RHEL 三大平台。

## 二、在 Windows 上安装 Docker Desktop

### 1、系统要求

- Windows 10 64 位（家庭版 21H2 或更高 / 专业版 21H1 或更高）或 Windows 11
- 启用 **WSL 2** 功能（推荐）
- 启用 **虚拟化（Virtualization）**——在 BIOS 中开启 VT-x / AMD-V
- 内存 ≥ 4GB

### 2、启用 WSL 2

以**管理员身份**打开 PowerShell，执行：

```powershell
wsl --install
```

该命令会自动启用 WSL、虚拟机平台特性，并安装默认的 Ubuntu 发行版。完成后**重启电脑**。

如果只想启用功能而不装发行版：

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
```

### 3、下载并安装 Docker Desktop

从官网下载安装包：<https://www.docker.com/products/docker-desktop/>

双击 `Docker Desktop Installer.exe`，安装时勾选：

- ✅ **Use WSL 2 instead of Hyper-V**
- ✅ **Add shortcut to desktop**

安装完成后启动 Docker Desktop，等待右下角小鲸鱼图标变为稳定状态（不再闪烁）。

### 4、验证

打开 PowerShell 或 CMD：

```powershell
docker version
docker run hello-world
```

如果看到 `Hello from Docker!` 字样，说明安装成功。

## 三、在 Ubuntu/Debian 上安装

官方推荐使用 **apt 仓库**方式安装，便于后续升级。

### 1、卸载旧版本（如有）

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 2、设置 apt 仓库

```bash
# 安装依赖
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加仓库（Ubuntu）
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

> Debian 用户把上面 URL 中的 `ubuntu` 改为 `debian` 即可。

### 3、安装 Docker Engine

```bash
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 4、一键脚本（不推荐生产使用）

如果只是测试或学习环境，可以用官方便捷脚本：

```bash
curl -fsSL https://get.docker.com | sudo sh
```

该脚本会自动识别系统并安装最新稳定版。

## 四、在 CentOS/RHEL 上安装

### 1、卸载旧版本

```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

### 2、设置 yum 仓库

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

### 3、安装 Docker Engine

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> CentOS Stream / RHEL 9 用户如果遇到 `containerd.io` 版本冲突，可加 `--allowerasing` 参数。

### 4、启动 Docker

CentOS/RHEL 上服务默认未启动，需要手动启动并设置开机自启：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 五、安装后的必要配置

### 1、普通用户免 sudo 运行（Linux）

默认情况下，Linux 上执行 `docker` 命令需要 `sudo`。把当前用户加入 `docker` 组即可：

```bash
sudo groupadd docker          # 通常已存在，提示已存在可忽略
sudo usermod -aG docker $USER
newgrp docker                 # 立即生效，或注销重新登录
```

> ⚠️ 安全提醒：`docker` 组成员等价于 root 权限（容器可挂载宿主机根目录），生产服务器请谨慎授权。

### 2、开机自启（Linux）

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

### 3、配置国内镜像加速器

国内拉取 Docker Hub 镜像经常超时，建议配置加速器。编辑（如不存在则新建）`/etc/docker/daemon.json`：

```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

重启 Docker 生效：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

**Windows / macOS Docker Desktop** 在设置界面操作：

> Settings → Docker Engine → 在 JSON 中加入上述 `registry-mirrors` → Apply & Restart

## 六、验证安装

```bash
# 查看版本
docker version

# 查看运行信息（含镜像加速器是否生效）
docker info

# 拉取并运行测试镜像
docker run hello-world
```

成功输出片段：

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

## 七、Docker Compose 安装与验证

从 Docker Engine 20.10+ 开始，**Compose V2** 以**插件**形式提供，命令变为 `docker compose`（**中间是空格**，不再是 `docker-compose` 短横线）。

- **Windows / macOS**：Docker Desktop 已自带，无需额外安装。
- **Linux**：前面安装命令中已包含 `docker-compose-plugin`。

验证：

```bash
docker compose version
```

如果你的脚本里仍习惯用 `docker-compose`（旧式短横线写法），可以装 alias：

```bash
sudo apt-get install -y docker-compose      # Debian/Ubuntu
sudo yum install -y docker-compose          # CentOS
```

## 八、第一个容器示例：跑一个 Nginx

```bash
docker run -d \
  --name my-nginx \
  -p 8080:80 \
  nginx:latest
```

参数解释：

| 参数         | 作用                                  |
| ------------ | ------------------------------------- |
| `-d`         | 后台运行（detached）                  |
| `--name`     | 给容器起个名字，方便后续操作          |
| `-p 8080:80` | 把宿主机 8080 端口映射到容器 80 端口  |
| `nginx:latest` | 镜像名:标签                         |

浏览器访问 <http://localhost:8080>，看到 "Welcome to nginx!" 即成功。

清理：

```bash
docker stop my-nginx
docker rm my-nginx
```

## 九、常用命令速查

**容器**

| 命令                              | 说明                       |
| --------------------------------- | -------------------------- |
| `docker ps`                       | 查看运行中的容器           |
| `docker ps -a`                    | 查看所有容器（含已停止）   |
| `docker start/stop/restart <id>`  | 启动/停止/重启容器         |
| `docker rm <id>`                  | 删除容器                   |
| `docker logs -f <id>`             | 查看容器日志（实时跟踪）   |
| `docker exec -it <id> bash`       | 进入运行中容器的 shell     |

**镜像**

| 命令                            | 说明                 |
| ------------------------------- | -------------------- |
| `docker images`                 | 查看本地镜像         |
| `docker pull <name>:<tag>`      | 拉取镜像             |
| `docker rmi <id>`               | 删除镜像             |
| `docker build -t name:tag .`    | 根据 Dockerfile 构建 |
| `docker tag src dst`            | 给镜像打新标签       |

**网络与数据卷**

| 命令                            | 说明             |
| ------------------------------- | ---------------- |
| `docker network ls`             | 查看网络         |
| `docker network create mynet`   | 创建自定义网络   |
| `docker volume ls`              | 查看数据卷       |
| `docker volume create mydata`   | 创建数据卷       |

**清理**

```bash
docker system df          # 查看磁盘占用
docker system prune       # 清理停止的容器、悬空镜像、网络
docker system prune -a    # 连同未使用的镜像一并清理（更激进）
```

## 十、卸载方法

### 1、Windows

控制面板 → 程序与功能 → 选择 **Docker Desktop** → 卸载。
如需彻底清理，再删除以下目录：

```
%USERPROFILE%\AppData\Roaming\Docker
%USERPROFILE%\AppData\Local\Docker
%PROGRAMDATA%\Docker
```

### 2、Ubuntu/Debian

```bash
sudo apt-get purge -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /etc/docker
```

### 3、CentOS/RHEL

```bash
sudo yum remove -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /etc/docker
```

## 十一、常见问题

### 1、Windows 启动 Docker Desktop 报 `WSL 2 installation is incomplete`

**原因**：WSL 2 内核组件未更新。
**解决**：以管理员身份运行 PowerShell：

```powershell
wsl --update
wsl --shutdown
```

然后重启 Docker Desktop。

### 2、镜像拉取卡住或超时

**原因**：网络无法访问 Docker Hub。
**解决**：参考本文「五、3、配置国内镜像加速器」一节。

### 3、Linux 执行 `docker` 提示 `permission denied`

**原因**：当前用户不在 `docker` 组。
**解决**：

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### 4、端口被占用 `port is already allocated`

**原因**：宿主机该端口已有进程在监听。
**解决**：换一个映射端口（`-p 18080:80`），或先找出占用进程：

```bash
# Linux
sudo lsof -i :8080
# Windows
netstat -ano | findstr :8080
```

### 5、CentOS 上 `containerd.io` 版本冲突

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io --allowerasing
```

## 十二、下一步

至此你已经拥有了一个可用的 Docker 环境。建议接下来：

- 阅读 [Dockerfile 官方参考](https://docs.docker.com/reference/dockerfile/)，学着构建自己的镜像
- 用 `docker compose` 编排多容器应用（如 Spring Boot + MySQL + Redis）
- 把你写的 Java/Node 项目打包成镜像并部署

容器化是现代后端绕不开的基本功，越早动手越好。Happy Dockering 🐳！
