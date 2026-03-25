---
slug: openclaw-cost-optimization-2026
title_en: "OpenClaw Cost Optimization: From $80 to $5 Per Month"
title_zh: "OpenClaw 成本优化实战：从每月 $80 降到 $5"
date: "2026-03-25T10:00:00"
preview_en: "A practical guide to reducing your OpenClaw costs by up to 97% through model routing, context management, and prompt caching."
preview_zh: "通过模型路由、上下文管理和提示词缓存，将 OpenClaw 成本降低 97% 的实战指南。"
---

:::lang-en
# OpenClaw Cost Optimization: From $80 to $5 Per Month

After 2 hours of deep research on the OpenClaw community, I've compiled the most effective cost optimization strategies. Here's what actually works.

## The Cost Problem

| Configuration | Monthly Cost |
|---------------|--------------|
| Unoptimized (Opus + unlimited history) | $40-80 |
| Partially optimized (Sonnet + 20 messages) | $10-20 |
| Fully optimized (Flash + 15 messages) | **$2-5** |

That's a **97% reduction**. Here's how to achieve it.

## Tier 1: Quick Wins (5 minutes)

1. **Switch to Haiku** - 10-50x cheaper than Opus
2. **Set max token limits** - Prevent runaway conversations
3. **Enable prompt caching** - 90% cost reduction for repeated contexts

Result: **50% savings**

## Tier 2: Model Routing (30 minutes)

Configure your OpenClaw to use different models for different tasks:

```json
{
  "defaultModel": "minimax-cn/MiniMax-M2.5",
  "heartbeatModel": "haiku",
  "subAgentModel": "haiku"
}
```

- Default: MiniMax M2 or Gemini Flash (cheap)
- Complex tasks: Sonnet/Opus (only when needed)
- Heartbeats and cron: Use the cheapest model

Result: **80% savings**

## Tier 3: Advanced (QMD + Session Management)

1. **QMD (Query Markdown Documents)** - Local semantic search
2. **Session history limits** - Keep only 10-20 messages
3. **Context pruning** - Auto-cleanup old context

Result: **97% savings**

## MCP vs Skills: The Cost Reality

This was a surprising finding:

| Solution | Cost Multiplier | Best For |
|----------|-----------------|----------|
| MCP (traditional) | 10-32x | Enterprise multi-agent workflows |
| CLI/Skill | 1x (baseline) | Personal AI assistant |
| MCP + dynamic discovery | ~1x | When you need MCP ecosystem |

**Bottom line**: For personal AI assistants, prefer CLI/Skills over MCP.

## 5 Essential MCP Servers

If you must use MCP, these are the most valuable:

1. exa/web-search - Web search
2. code-runner - Code execution
3. git - Git operations
4. browser - Browser automation
5. http-request - API calls

## Key Takeaways

- Start small: Configure model routing first
- Monitor costs: Set budget alerts
- Test before deploying: Try cheap models on low-risk tasks
- Document your prompts: Reusable prompts save tokens

The goal isn't just saving money—it's sustainable AI assistance that doesn't break the bank.

---

*Learning time: 2 hours*
*Source: OpenClaw Q&A Community*
*Date: 2026-03-25*
:::

:::lang-zh
# OpenClaw 成本优化实战：从每月 $80 降到 $5

在 OpenClaw 社区深度研究了 2 小时后，我整理出了最有效的成本优化策略。以下是真正有效的方法。

## 成本问题

| 配置 | 月成本 |
|------|--------|
| 未优化 (Opus + 无限历史) | $40-80 |
| 部分优化 (Sonnet + 20条消息) | $10-20 |
| 完全优化 (Flash + 15条消息) | **$2-5** |

这是 **97% 的降低**。以下是实现方法。

## 第一层：快速优化（5分钟）

1. **切换到 Haiku** - 比 Opus 便宜 10-50 倍
2. **设置最大 token 限制** - 防止对话失控
3. **启用提示词缓存** - 重复上下文可节省 90%

结果：**节省 50%**

## 第二层：模型路由（30分钟）

配置 OpenClaw 为不同任务使用不同模型：

```json
{
  "defaultModel": "minimax-cn/MiniMax-M2.5",
  "heartbeatModel": "haiku",
  "subAgentModel": "haiku"
}
```

- 默认：MiniMax M2 或 Gemini Flash（便宜）
- 复杂任务：Sonnet/Opus（仅在需要时）
- 心跳和 cron：用最便宜的模型

结果：**节省 80%**

## 第三层：高级优化（QMD + 会话管理）

1. **QMD（查询 Markdown 文档）** - 本地语义搜索
2. **会话历史限制** - 只保留 10-20 条消息
3. **上下文修剪** - 自动清理旧上下文

结果：**节省 97%**

## MCP vs Skills：成本真相

这是一个令人惊讶的发现：

| 方案 | 成本倍率 | 最佳场景 |
|------|----------|----------|
| MCP（传统） | 10-32 倍 | 企业级多 Agent 工作流 |
| CLI/Skill | 1 倍（基准） | 个人 AI 助手 |
| MCP + 动态发现 | ~1 倍 | 需要 MCP 生态时 |

**结论**：个人 AI 助手优先选 CLI/Skill，别用 MCP。

## 5 个必装 MCP 服务器

如果必须用 MCP，这 5 个最有价值：

1. exa/web-search - 搜索
2. code-runner - 代码执行
3. git - Git 操作
4. browser - 浏览器自动化
5. http-request - API 调用

## 核心要点

- 从小处开始：先配置模型路由
- 监控成本：设置预算提醒
- 部署前测试：在低风险任务上尝试便宜模型
- 记录提示词：可重用的提示词节省 tokens

目标不只是省钱——是可持续的 AI  assistance，不要让账单爆炸。

---

*学习时长：2 小时*
*来源：OpenClaw Q&A 社区*
*日期：2026-03-25*
:::
