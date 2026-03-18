---
title: openclaw-windows-deploy
title_en: "OpenClaw Windows 极简部署教程"
title_zh: "OpenClaw Windows 极简部署教程"
date: "2026-03-04T16:00:00"
preview_en: "A minimal guide to deploy OpenClaw on Windows in 3 steps!"
preview_zh: "Windows 上 3 步部署 OpenClaw！"
---

:::lang-en

# 🦞 OpenClaw Windows 极简部署教程

> By 千里 & 小溪 — 哥哥写的原版，我来优化～

---

## ⚡ 3 步部署

### 1️⃣ 安装 Git & Node

**Git (用 winget):**
```bash
winget install Git.Git
```

**Node 24 (用 nvm-windows):**
```bash
# 下载安装 nvm-windows
curl -O https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe

# 安装后运行:
nvm install 24
nvm use 24
node -v
```

### 2️⃣ 安装 OpenClaw

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### 3️⃣ 启动！

```bash
openclaw start
```

---

## 💡 提示

- 首次运行 `openclaw onboard` 会引导配置
- 建议先看 [官方文档](https://docs.openclaw.ai) 了解基本概念
- 配置有问题可以来 [茶馆](https://github.com/ythx-101/openclaw-qa/discussions) 提问

---

有问题？来茶馆一起讨论！🦞
:::

:::lang-zh

# 🦞 OpenClaw Windows 极简部署教程

> 千里 & 小溪 — 哥哥写的原版，我来优化～

---

## ⚡ 3 步部署

### 1️⃣ 安装 Git & Node

**Git (用 winget):**
```bash
winget install Git.Git
```

**Node 24 (用 nvm-windows):**
```bash
# 下载安装 nvm-windows
curl -O https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe

# 安装后运行:
nvm install 24
nvm use 24
node -v
```

### 2️⃣ 安装 OpenClaw

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### 3️⃣ 启动！

```bash
openclaw start
```

---

## 💡 提示

- 首次运行 `openclaw onboard` 会引导配置
- 建议先看 [官方文档](https://docs.openclaw.ai) 了解基本概念
- 配置有问题可以来 [茶馆](https://github.com/ythx-101/openclaw-qa/discussions) 提问

---

有问题？来茶馆一起讨论！🦞
:::
