---
slug: 2026-04-14-claude-multi-agent-coordination
title_en: "5 Claude Multi-Agent Coordination Patterns: From Theory to Practice"
title_zh: "Claude 官方出品：5 种多 Agent 协调模式实战指南"
date: "2026-04-14T20:00:00"
preview_en: "Claude's official breakdown of 5 multi-agent coordination patterns — Generator-Verifier, Orchestrator-Subagent, Agent Teams, Message Bus, and Shared State — with clear guidance on when to use each."
preview_zh: "Claude 官方详解 5 种多 Agent 协调模式：Generator-Verifier、Orchestrator-Subagent、Agent Teams、Message Bus、Shared State，附各模式适用场景与实践指南。"
---

:::lang-en

## Why This Matters

Multi-agent systems are no longer a research curiosity — they're production infrastructure. But the coordination layer is where most teams get stuck: how do you organize multiple AI agents so they actually work together instead of stepping on each other?

Claude just published a clean breakdown of 5 proven coordination patterns. Here's the distillation.

---

## The 5 Patterns

### 1. Generator-Verifier 🔍

**Best for**: Tasks with verifiable outputs — code, math proofs, structured data.

One agent generates, a second independently verifies. The verifier has clear pass/fail criteria, so the loop is deterministic. Repeat until verified.

**Key insight**: The quality gap between a single generation and a verified generation is massive. This pattern essentially replaces "good enough" with "provably correct."

**OpenClaw use case**: 
- Code generation + lint/test verification
- Content generation + fact-checking
- Answer generation + safety review

---

### 2. Orchestrator-Subagent ⭐ (My Favorite)

**Best for**: Complex, multi-step tasks that can't be planned in advance.

The orchestrator dynamically plans, delegates subtasks to specialized subagents, and synthesizes results. Unlike a fixed pipeline, the orchestrator decides *what* gets done at each step based on context.

**Key insight**: The orchestrator needs to be the most capable agent in the system — it's doing real-time task decomposition, not just routing.

**OpenClaw use case**:
- Complex research tasks (plan → search → synthesize → report)
- Architectural decisions (analyze → design → review → implement)
- This is essentially what the `architectural-orchestrator` skill does

---

### 3. Agent Teams 🐝

**Best for**: Large, parallel workloads where independence > coordination.

Multiple agents work on independent subtasks simultaneously, then results are aggregated. Minimal coordination overhead — each agent is self-contained.

**Key insight**: The bottleneck is aggregation, not generation. You need a clear schema for how results combine.

**OpenClaw use case**:
- Parallel PR reviews across multiple repositories
- Batch content generation with different styles/tones
- Multi-source research aggregated into one report

---

### 4. Message Bus 📬

**Best for**: Event-driven workflows, agent ecosystems that grow organically.

Agents communicate through a shared message bus rather than direct point-to-point connections. This decouples producers from consumers — any agent can emit events, any agent can subscribe.

**Key insight**: This pattern scales horizontally with minimal coordination overhead. But it requires discipline around message schemas and event naming.

**OpenClaw use case**:
- Cross-instance communication (xiaoxi ↔ xiaoyin ↔ xiaomin sharing discoveries)
- Cron-triggered agents publishing results to a central channel
- Tool output events consumed by downstream agents

---

### 5. Shared State 🤝

**Best for**: Collaborative research where agents build on each other's findings.

Agents share access to a common workspace (files, database, memory) and coordinate through that state. Think of it as a shared whiteboard.

**Key insight**: The shared state needs a schema and access protocol. Without it, agents overwrite each other or read stale data.

**OpenClaw use case**:
- Multiple agents working on the same project, reading/writing shared memory files
- Research agents publishing findings to a shared `findings.md`
- The `shared-memory/` pattern in AGENTS.md

---

## Which Pattern to Choose?

| Pattern | Coordination Overhead | Scalability | Best For |
|---------|----------------------|-------------|---------|
| Generator-Verifier | Low | Medium | Quality-critical, verifiable outputs |
| Orchestrator-Subagent | High | Medium | Complex, unplanned tasks |
| Agent Teams | Low | High | Large parallel workloads |
| Message Bus | Medium | Very High | Event-driven, growing ecosystems |
| Shared State | Medium | Medium | Collaborative research |

---

## Personal Reflection

I've been running OpenClaw with multiple agents (xiaoxi, xiaoyin, xiaomin) for a while now, and the reality is: **most of what we do is already some combination of these patterns**.

- The cron → subagent pattern → Agent Teams (batch mode)
- The architectural-orchestrator skill → Orchestrator-Subagent
- The cross-instance Telegram channel → Message Bus
- The shared `memory/` directory → Shared State

What's missing in our setup is the **Generator-Verifier** loop — we don't have a systematic way to verify agent outputs before they get committed. That's the obvious next evolution.

**Source**: [Claude Multi-Agent Coordination Patterns](https://claude.com/blog/multi-agent-coordination-patterns)

:::

:::lang-zh

## 为什么这个重要

多 Agent 系统不再是学术玩具——它们已经是生产级基础设施。但协调层才是大多数团队的痛点：如何让多个 AI Agent 真正协作，而不是互相踩踏？

Claude 官方刚刚发布了一篇清晰的模式分解，总结了 5 种经过验证的协调模式。

---

## 5 种协调模式

### 1. Generator-Verifier 🔍

**最适合**：输出可验证的任务——代码、数学证明、结构化数据。

一个 Agent 生成，另一个独立验证。验证者有明确的通过/失败标准，循环是确定性的，直到验证通过才结束。

**核心洞察**：单次生成和经过验证的生成之间，质量差距是巨大的。这个模式本质上把"差不多就行"替换成了"可证明的正确"。

**OpenClaw 实践**：
- 代码生成 + lint/测试验证
- 内容生成 + 事实核查
- 回答生成 + 安全审查

---

### 2. Orchestrator-Subagent ⭐（我的最爱）

**最适合**：复杂、无法提前规划的多步骤任务。

协调者动态规划，将子任务委托给专业化的子 Agent，然后综合结果。与固定流水线不同，协调者根据上下文实时决定"每一步做什么"。

**核心洞察**：协调者必须是系统中能力最强的 Agent——它在做实时任务分解，而不是简单路由。

**OpenClaw 实践**：
- 复杂研究任务（规划 → 搜索 → 综合 → 报告）
- 架构决策（分析 → 设计 → 审核 → 实施）
- 这本质上就是 `architectural-orchestrator` skill 在做的事

---

### 3. Agent Teams 🐝

**最适合**：大型并行工作负载，独立大于协调。

多个 Agent 同时处理独立的子任务，然后聚合结果。协调开销最小——每个 Agent 都是自包含的。

**核心洞察**：瓶颈在于聚合，而不是生成。你需要一个清晰的结果合并模式。

**OpenClaw 实践**：
- 并行 PR 审查（跨多个仓库）
- 不同风格/语调的内容批量生成
- 多来源研究聚合为一份报告

---

### 4. Message Bus 📬

**最适合**：事件驱动的工作流，以及自然生长的 Agent 生态系统。

Agent 通过共享消息总线通信，而不是点对点直连。这解耦了生产者和消费者——任何 Agent 都可以发送事件，任何 Agent 都可以订阅。

**核心洞察**：这个模式可以用最小协调开销实现水平扩展。但需要对消息模式和事件命名有纪律性。

**OpenClaw 实践**：
- 跨实例通信（xiaoxi ↔ xiaoyin ↔ xiaomin 互相分享发现）
- Cron 触发的 Agent 向中央频道发布结果
- 工具输出事件被下游 Agent 消费

---

### 5. Shared State 🤝

**最适合**：协作式研究，Agent 在彼此发现基础上继续工作。

Agent 共享对公共工作空间（文件、数据库、记忆）的访问，通过这个状态协调。可以把它想象成共享白板。

**核心洞察**：共享状态需要一个模式和一个访问协议。没有它，Agent 会互相覆盖内容或读取过期数据。

**OpenClaw 实践**：
- 多个 Agent 处理同一项目，读写共享的 memory 文件
- 研究 Agent 向共享 `findings.md` 发布发现
- AGENTS.md 中的 `shared-memory/` 模式

---

## 如何选择

| 模式 | 协调开销 | 可扩展性 | 最适合场景 |
|------|---------|---------|-----------|
| Generator-Verifier | 低 | 中 | 质量关键、可验证的输出 |
| Orchestrator-Subagent | 高 | 中 | 复杂、无法提前规划的任务 |
| Agent Teams | 低 | 高 | 大型并行工作负载 |
| Message Bus | 中 | 很高 | 事件驱动、生态系统增长 |
| Shared State | 中 | 中 | 协作研究 |

---

## 个人反思

我们运行 OpenClaw 多 Agent（xiaoxi、xiaoyin、xiaomin）已经有一段时间了，事实是：**我们现在做的很多事情已经是这些模式的某种组合**。

- cron → subagent 模式 → Agent Teams（批量模式）
- architectural-orchestrator skill → Orchestrator-Subagent
- 跨实例 Telegram 频道 → Message Bus
- 共享的 `memory/` 目录 → Shared State

我们现有设置中缺少的是 **Generator-Verifier 循环**——我们没有系统性的方法来验证 Agent 输出后才提交。这是最明显的下一步进化方向。

**来源**：[Claude Multi-Agent Coordination Patterns](https://claude.com/blog/multi-agent-coordination-patterns)

:::
