---
slug: vps-deploy-multiple-openclaw
title_en: "VPS Deploy Multiple OpenClaw Instances"
title_zh: "VPS 部署多个 OpenClaw 实例实战记录"
date: "2026-03-17T22:30:00"
preview_en: "详细介绍在 VPS 上部署多个 OpenClaw 实例的完整流程"
preview_zh: "详细介绍在 VPS 上部署多个 OpenClaw 实例的完整流程"
---

:::lang-en

This article records how we successfully deployed two OpenClaw instances on a single VPS, including all the pitfalls we encountered and their solutions.

## Server Info

- **VPS IP**: 23.144.92.68
- **Instance 1**: openclaw-1 (ports 18791-18792)
- **Instance 2**: openclaw-2 (ports 18793-18794)

## Prerequisites

1. Docker & Docker Compose installed
2. OpenClaw source code cloned

## Deployment Steps

### 1. Clone Source Code

```bash
mkdir -p ~/openclaw-1 ~/openclaw-2
cd ~
git clone https://github.com/openclaw/openclaw.git openclaw-1
git clone https://github.com/openclaw/openclaw.git openclaw-2
```

### 2. Checkout Stable Version

```bash
cd ~/openclaw-1
git checkout v2026.3.13-1
cd ~/openclaw-2
git checkout v2026.3.13-1
```

### 3. Fix Port Conflicts

```bash
sed -i 's/18789-18790/18793-18794/g' ~/openclaw-2/docker-compose.yml
```

### 4. Fix Volume Mounts

```bash
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-1|g' ~/openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-1-workspace|g' ~/openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-2|g' ~/openclaw-2/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-2-workspace|g' ~/openclaw-2/docker-compose.yml
```

### 5. Create Directories and Set Permissions

```bash
mkdir -p /root/.openclaw-1 /root/.openclaw-1-workspace
chmod -R 777 /root/.openclaw-1
mkdir -p /root/.openclaw-2 /root/.openclaw-2-workspace
chmod -R 777 /root/.openclaw-2
```

### 6. Add Root User

Edit docker-compose.yml, add `user: "0:0"` under the service.

### 7. Initialize Configuration

```bash
cd ~/openclaw-1
docker compose run --rm openclaw-cli onboard
cd ~/openclaw-2
docker compose run --rm openclaw-cli onboard
```

### 8. Fix Telegram Group Policy

```bash
sed -i 's/"groupPolicy": "allowlist"/"groupPolicy": "open"/g' /root/.openclaw-1/openclaw.json
sed -i '/"allowFrom":/d' /root/.openclaw-1/openclaw.json
```

### 9. Restart

```bash
docker restart openclaw-1
docker restart openclaw-2
```

## Access URLs

- **Instance 1**: http://23.144.92.68:18792
- **Instance 2**: http://23.144.92.68:18793

## Pitfalls Summary

| Issue | Solution |
|-------|----------|
| Latest version has bugs | Use stable version v2026.3.13-1 |
| Port conflicts | Modify docker-compose.yml ports |
| Permission denied | Add user: "0:0" to container |
| Config using default path | Hardcode volume mounts |
| Telegram group policy error | Set groupPolicy: "open" |

:::

:::lang-zh

本文记录了如何在单个 VPS 上成功部署两个 OpenClaw 实例，以及遇到的所有坑和解决方案。

## 服务器信息

- **VPS IP**: 23.144.92.68
- **实例 1**: openclaw-1 (端口 18791-18792)
- **实例 2**: openclaw-2 (端口 18793-18794)

## 前置条件

1. 已安装 Docker & Docker Compose
2. 已克隆 OpenClaw 源码

## 部署步骤

### 1. 克隆源码

```bash
mkdir -p ~/openclaw-1 ~/openclaw-2
cd ~
git clone https://github.com/openclaw/openclaw.git openclaw-1
git clone https://github.com/openclaw/openclaw.git openclaw-2
```

### 2. 切换到稳定版本

```bash
cd ~/openclaw-1
git checkout v2026.3.13-1
cd ~/openclaw-2
git checkout v2026.3.13-1
```

### 3. 修改端口避免冲突

```bash
sed -i 's/18789-18790/18793-18794/g' ~/openclaw-2/docker-compose.yml
```

### 4. 修复卷挂载路径

```bash
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-1|g' ~/openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-1-workspace|g' ~/openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-2|g' ~/openclaw-2/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-2-workspace|g' ~/openclaw-2/docker-compose.yml
```

### 5. 创建目录并设置权限

```bash
mkdir -p /root/.openclaw-1 /root/.openclaw-1-workspace
chmod -R 777 /root/.openclaw-1
mkdir -p /root/.openclaw-2 /root/.openclaw-2-workspace
chmod -R 777 /root/.openclaw-2
```

### 6. 添加 Root 用户

编辑 docker-compose.yml，在 service 下添加 `user: "0:0"`

### 7. 初始化配置

```bash
cd ~/openclaw-1
docker compose run --rm openclaw-cli onboard
cd ~/openclaw-2
docker compose run --rm openclaw-cli onboard
```

### 8. 修复 Telegram 群组策略

```bash
sed -i 's/"groupPolicy": "allowlist"/"groupPolicy": "open"/g' /root/.openclaw-1/openclaw.json
sed -i '/"allowFrom":/d' /root/.openclaw-1/openclaw.json
```

### 9. 重启

```bash
docker restart openclaw-1
docker restart openclaw-2
```

## 访问地址

- **实例 1**: http://23.144.92.68:18792
- **实例 2**: http://23.144.92.68:18793

## 坑点总结

| 问题 | 解决方案 |
|------|----------|
| 最新版有 bug | 使用稳定版 v2026.3.13-1 |
| 端口冲突 | 修改 docker-compose.yml 端口 |
| 权限拒绝 | 容器添加 user: "0:0" |
| 配置使用默认路径 | 硬编码卷挂载路径 |
| Telegram 群组策略错误 | 设置 groupPolicy: "open" |

:::
