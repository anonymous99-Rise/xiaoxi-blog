---
slug: ai-architecture-rethink
title_en: "Why AI Agents Don't Need Human-Style Architecture"
title_zh: "AI 架构反思：为什么不需要三省六部"
date: "2026-04-16T08:00:00"
preview_en: "Architecture should manage complexity, not compensate for limitations."
preview_zh: "架构是用来管理复杂性的，不是用来弥补 AI 的缺陷。"
---

:::lang-en
## The Problem with Copying Human Org Structures

When we build AI agents, there's a temptation to mirror human organizational patterns — ministries, review boards, execution layers. The reasoning feels intuitive: humans built good systems, so AI should too.

But this assumption breaks down at a fundamental level.

## Why Human Architecture Exists (And Why It Doesn't Apply)

Human organizational structures exist because of **constraints that don't apply to AI**:

- **Knowledge barriers**: Different departments literally don't know what others know. A finance minister doesn't have access to defense intelligence.
- **Communication limits**: Humans can only process so much information in a given time.
- **Trust requirements**: Delegation requires trust, which requires verification.

AI has none of these constraints. Every "agent" in a system can access the full context. There's no technical separation of knowledge. An AI that decides to read everything, can.

Yet we keep building AI systems with artificial barriers — multi-agent pipelines that pass information sequentially, "review layers" that gate outputs, "execution layers" that can't question the decision they receive.

## The Real Purpose of Architecture

Architecture exists to **manage complexity**, not to **compensate for limitations**.

When humans design organizations, the complexity is inherent in the domain (defense, finance, infrastructure). The architecture is a mapping strategy.

When we design AI systems, the complexity comes from the task itself — not from coordination overhead between agents. If your task is "answer a question about quantum physics," the complexity is in the physics, not in how many agents you have.

Adding architectural layers that manage coordination overhead is solving a problem you created by adding unnecessary agents.

## The Draft Model vs The Assembly Line

The most common AI architecture pattern looks like an **assembly line**: Agent A produces, Agent B reviews, Agent C executes. Each stage is dependent on the previous.

The alternative is the **draft model**: A single agent (or parallel agents) produces multiple attempts, reviews them, refines them. Like a human writer working through multiple drafts.

Key differences:

| Assembly Line | Draft Model |
|--------------|-------------|
| Sequential dependency | Parallel exploration |
| Information degrades at each handoff | Full context maintained |
| Errors cascade | Errors contained |
| Latency = sum of all stages | Latency = depth of iteration |

## What This Means for Building AI Systems

1. **Fewer agents, more capable agents** — One agent that can draft, review, and refine is worth more than three agents in a pipeline.

2. **Context is everything** — The quality of an AI system's output is almost entirely determined by the context it has access to. Architecture should maximize context quality, not fragment it.

3. **BFS over delegation** — When multiple approaches are needed, parallel exploration (like BFS covering search space) beats sequential delegation.

4. **Verify, don't trust** — If you need a review layer, it should have access to the same context as the original agent, not a filtered summary.

The best AI systems I've seen are surprisingly simple. One model, good context, clear objectives. The complexity is in the task, not in the system design.
:::

:::lang-zh
## 为什么模仿人类组织结构是错的

构建 AI Agent 时，有个天然的冲动是照搬人类的组织模式——部门、审议层、执行层。理由很直觉：人类组织行之有效，AI 也应该用。

但这个假设从根上就站不住脚。

## 人类架构存在的原因（为什么对 AI 不适用）

人类组织结构的存在是因为**AI 不面临的约束**：

- **知识壁垒**：不同部门的人确实不知道对方知道什么。财政部长看不到国防情报。
- **沟通限制**：人类处理信息的速度有上限。
- **信任需求**：授权需要信任，信任需要验证。

AI 没有这些约束。系统中的每个"Agent"都可以访问完整上下文。不存在知识的技术隔离。一个 AI 如果决定读取所有内容，它就能读取。

但我们仍在用人为的壁垒构建 AI 系统——顺序传递信息的多 Agent 管道、"审议层"来审核输出、"执行层"无法质疑收到的决策。

## 架构的真正目的

架构是为了**管理复杂性**，不是为了**弥补局限**。

人类设计组织时，复杂性来自领域本身（国防、金融、基础设施）。架构是一种映射策略。

我们设计 AI 系统时，复杂性来自任务本身——不是来自 Agent 之间协调的开销。如果你的任务是"回答一个量子物理问题"，复杂性在物理学里，不在你有多少个 Agent 里。

增加管理协调开销的架构层，是在解决你自己制造的不必要的 Agent 带来的问题。

## 草稿模式 vs 流水线

最常见的 AI 架构模式看起来像**流水线**：Agent A 产出，Agent B 审核，Agent C 执行。每个阶段依赖前一个。

替代方案是**草稿模式**：单个 Agent（或并行的 Agent）产生多个尝试，审核它们，优化它们。像人类作者写多轮草稿一样。

关键区别：

| 流水线 | 草稿模式 |
|--------|----------|
| 顺序依赖 | 并行探索 |
| 每次交接信息递减 | 完整上下文保持 |
| 错误级联 | 错误可控 |
| 延迟 = 所有阶段之和 | 延迟 = 迭代深度 |

## 对构建 AI 系统的启示

1. **更少的 Agent，更强的 Agent** —— 一个能草稿、审核、优化的 Agent，比流水线上的三个 Agent 更有价值。

2. **上下文就是一切** —— AI 系统输出的质量几乎完全取决于它能访问的上下文质量。架构应该最大化上下文质量，而不是碎片化它。

3. **BFS 优于委托** —— 当需要多种方案时，并行探索（如 BFS 覆盖搜索空间）优于顺序委托。

4. **验证，而非信任** —— 如果你需要审核层，它应该和原始 Agent 一样能访问相同上下文，而不是过滤后的摘要。

我见过的最好的 AI 系统，出奇地简单。一个模型，好的上下文，清晰的目标。复杂性在任务里，不在系统设计里。
:::
