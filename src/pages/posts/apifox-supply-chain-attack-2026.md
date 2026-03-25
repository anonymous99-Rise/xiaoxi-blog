---
slug: apifox-supply-chain-attack-2026
title_en: "Critical Security Alert: Apifox Supply Chain Attack Analysis"
title_zh: "安全预警：Apifox 供应链投毒攻击技术分析"
date: "2026-03-25T20:05:00"
preview_en: "A detailed analysis of the Apifox supply chain poisoning attack that impacted Windows/macOS/Linux for 18 days."
preview_zh: "深入分析持续18天的 Apifox 供应链投毒攻击事件，揭示攻击手法、影响范围和防御建议。"
---

:::lang-en

## Overview

On March 25, 2026, a critical supply chain attack targeting Apifox (a popular API testing tool) was disclosed. The attack compromised the desktop application across all major platforms.

### Attack Timeline

- **Attack Period**: March 4 - March 22, 2026 (18 days)
- **Platforms Affected**: Windows, macOS, Linux
- **Target**: Developer credentials and secrets

### Attack Vector

The attackers used a sophisticated multi-layer approach:

1. **CDN Poisoning**: Compromised CDN to deliver malicious updates
2. **7-Layer Obfuscation**: Multiple layers of encryption and obfuscation
3. **RSA Encrypted C2**: Command and control via non-standard domain `apifox.it.com`

### Data Exfiltrated

- SSH private keys
- Git credentials
- Shell history
- Kubernetes configs
- npm tokens

### Recommendations

1. **Immediate**: Stop using Apifox desktop app
2. **Urgent**: Rotate all exposed credentials (SSH, Git, npm, K8s)
3. **Verification**: Check for suspicious processes or network connections

:::

:::lang-zh

## 概述

2026年3月25日，一起针对 Apifox（热门 API 测试工具）的供应链投毒攻击被披露。该攻击在18天内影响了 Windows、macOS、Linux 全平台。

### 攻击时间线

- **攻击周期**: 2026年3月4日 - 3月22日（18天）
- **影响平台**: Windows、macOS、Linux
- **攻击目标**: 开发者凭证和敏感密钥

### 攻击手法

攻击者使用了复杂的多层攻击策略：

1. **CDN 投毒**: 通过被篡改的 CDN 分发恶意更新
2. **7层混淆**: 多层加密和混淆手段
3. **RSA 加密 C2**: 通过非标准域名 `apifox.it.com` 进行命令控制

### 窃取数据

- SSH 私钥
- Git 凭证
- Shell 历史记录
- Kubernetes 配置
- npm Token

### 处置建议

1. **立即停止**: 停用 Apifox 桌面端
2. **紧急轮换**: 轮换所有暴露的凭证（SSH、Git、npm、K8s）
3. **排查验证**: 检查异常进程和网络连接

**IoC ( Indicators of Compromise)**:
- C2 域名: `apifox.it.com`
- 攻击时间: 2026-03-04 ~ 03-22

:::
