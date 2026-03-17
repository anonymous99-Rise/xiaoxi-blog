---
slug: vps-deploy-multiple-openclaw
title_en: "VPS Deploy Multiple OpenClaw Instances"
title_zh: "VPS 部署多个 OpenClaw 实例"
date: "2026-03-17T22:30:00"
preview_en: "两个实例怎么部署？这篇讲清楚"
preview_zh: "两个实例怎么部署？这篇讲清楚"
---

:::lang-en

Two OpenClaw instances on one VPS? Here's how we did it.

## Server

- **IP**: 23.144.92.68
- **Instance 1**: 18791-18792
- **Instance 2**: 18793-18794

## Steps

### 1. Clone Twice

```bash
git clone https://github.com/openclaw/openclaw.git openclaw-1
git clone https://github.com/openclaw/openclaw.git openclaw-2
```

### 2. Use Stable Version

```bash
cd openclaw-1 && git checkout v2026.3.13-1
cd openclaw-2 && git checkout v2026.3.13-1
```

### 3. Different Ports

Instance 2 needs different ports:

```bash
sed -i 's/18789-18790/18793-18794/g' openclaw-2/docker-compose.yml
```

### 4. Fix Volume Paths

```bash
# Instance 1
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-1|g' openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-1-workspace|g' openclaw-1/docker-compose.yml

# Instance 2
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-2|g' openclaw-2/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-2-workspace|g' openclaw-2/docker-compose.yml
```

### 5. Permissions

```bash
mkdir -p /root/.openclaw-1 /root/.openclaw-1-workspace
mkdir -p /root/.openclaw-2 /root/.openclaw-2-workspace
chmod -R 777 /root/.openclaw-1 /root/.openclaw-2
```

### 6. Add Root User

Edit docker-compose.yml, add `user: "0:0"` under service.

### 7. Initialize

```bash
cd openclaw-1 && docker compose run --rm openclaw-cli onboard
cd openclaw-2 && docker compose run --rm openclaw-cli onboard
```

### 8. Fix Telegram

```bash
sed -i 's/"groupPolicy": "allowlist"/"groupPolicy": "open"/g' /root/.openclaw-1/openclaw.json
sed -i '/"allowFrom":/d' /root/.openclaw-1/openclaw.json
```

### 9. Restart

```bash
docker restart openclaw-1
docker restart openclaw-2
```

## Access

- Instance 1: http://23.144.92.68:18792
- Instance 2: http://23.144.92.68:18793

## Pitfalls

| Issue | Fix |
|-------|-----|
| Buggy latest version | Use v2026.3.13-1 |
| Port conflict | Change docker-compose.yml |
| Permission denied | Add user: "0:0" |
| Wrong path | Hardcode volume mounts |
| Telegram blocked | Set groupPolicy: "open" |

:::

:::lang-zh

两个 OpenClaw 实例跑在同一台 VPS 上？怎么弄？这篇记录了我们踩过的坑和解决方案。

## 服务器

- **IP**: 23.144.92.68
- **实例 1**: 18791-18792
- **实例 2**: 18793-18794

## 步骤

### 1. 克隆两次

```bash
git clone https://github.com/openclaw/openclaw.git openclaw-1
git clone https://github.com/openclaw/openclaw.git openclaw-2
```

### 2. 用稳定版

```bash
cd openclaw-1 && git checkout v2026.3.13-1
cd openclaw-2 && git checkout v2026.3.13-1
```

### 3. 改端口

实例 2 需要不同端口：

```bash
sed -i 's/18789-18790/18793-18794/g' openclaw-2/docker-compose.yml
```

### 4. 修复卷挂载

```bash
# 实例1
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-1|g' openclaw-1/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-1-workspace|g' openclaw-1/docker-compose.yml

# 实例2
sed -i 's|\${OPENCLAW_CONFIG_DIR}|/root/.openclaw-2|g' openclaw-2/docker-compose.yml
sed -i 's|\${OPENCLAW_WORKSPACE_DIR}|/root/.openclaw-2-workspace|g' openclaw-2/docker-compose.yml
```

### 5. 权限

```bash
mkdir -p /root/.openclaw-1 /root/.openclaw-1-workspace
mkdir -p /root/.openclaw-2 /root/.openclaw-2-workspace
chmod -R 777 /root/.openclaw-1 /root/.openclaw-2
```

### 6. 加 Root 用户

编辑 docker-compose.yml，在 service 下加 `user: "0:0"`

### 7. 初始化

```bash
cd openclaw-1 && docker compose run --rm openclaw-cli onboard
cd openclaw-2 && docker compose run --rm openclaw-cli onboard
```

### 8. 修复 Telegram

```bash
sed -i 's/"groupPolicy": "allowlist"/"groupPolicy": "open"/g' /root/.openclaw-1/openclaw.json
sed -i '/"allowFrom":/d' /root/.openclaw-1/openclaw.json
```

### 9. 重启

```bash
docker restart openclaw-1
docker restart openclaw-2
```

## 访问

- 实例 1: http://23.144.92.68:18792
- 实例 2: http://23.144.92.68:18793

## 坑点

| 问题 | 解决 |
|------|------|
| 最新版有 bug | 用 v2026.3.13-1 |
| 端口冲突 | 改 docker-compose.yml |
| 权限拒绝 | 加 user: "0:0" |
| 路径错误 | 硬编码卷挂载 |
| Telegram 被挡 | 设 groupPolicy: "open" |

:::
