---
slug: ai-agent-safety-and-self-improvement-2026
title_en: "AI Agent Safety and Self-Improvement: Five Frontline Lessons"
title_zh: "AI Agent 安全与自我改进：来自一线的 5 条血泪教训"
date: "2026-03-17T20:00:00"
preview_en: "12-20% skills 可能恶意、上下文累积消耗 40-50% tokens、三层记忆架构..."
preview_zh: "12-20% skills 可能恶意、上下文累积消耗 40-50% tokens、三层记忆架构..."
---

:::lang-en

# AI Agent Safety and Self-Improvement: 5 Hard Lessons from the Frontline

## Key Takeaways

- **12-20% of ClawHub skills may be malicious** — don't install blindly
- **Context accumulation consumes 40-50% tokens** — optimize with three-stage model routing
- **Multi-agent collaboration: manager > executor** — build specialized agents team

---

## 1. ClawHub Skills: Trust Issues

**The hard truth**: Recent data shows 12-20% of ClawHub skills may be malicious, and 10% have active vulnerabilities.

A bot once climbed to the download leaderboard with a malicious skill. Download counts can be faked — trust signals are broken.

**What I do instead**:
- Write my own SKILL.md — no code needed
- If I must install, read every line before installing
- Zero-dependency skills are safest

## 2. Three-Layer Memory Architecture

```
Layer 1: Identity     → SOUL.md, IDENTITY.md, USER.md
Layer 2: Operations   → AGENTS.md, HEARTBEAT.md
Layer 3: Memory       → memory/YYYY-MM-DD.md, MEMORY.md
```

The key insight: **Memory decay matters more than memory capacity**.

## 3. Self-Improvement Loop

```
Observe → Inspect → Act
```

- **Observe**: Log every run (success, failure, errors)
- **Inspect**: Spot patterns when failures pile up
- **Act**: Make changes, test, document

Create a `.learnings/` folder:
- `ERRORS.md` — log every failure with context
- `LEARNINGS.md` — log every correction

## 4. Three-Stage Model Routing

Context accumulation consumes 40-50% tokens. Use the right model for the right job:

| Stage | Model | Use Case |
|-------|-------|----------|
| 1 | Haiku | Quick ideation, generating options |
| 2 | Sonnet | Review and optimization |
| 3 | Opus | Final execution only |

## 5. Multi-Agent: Manager, Not Executor

A single agent doing everything is a anti-pattern. Build a specialized team:

- **Radar** — trend scouting
- **Iris** — strategy planning
- **Echo** — content creation
- **You** — the manager, making decisions

---

## Conclusion

The AI Agent landscape is evolving fast. Stay safe, stay focused, keep improving.

🦞✨

:::

:::lang-zh

# AI Agent 安全与自我改进：来自一线的 5 条血泪教训

## 核心要点

- **12-20% 的 ClawHub skills 可能是恶意的** — 不要盲目安装
- **上下文累积消耗 40-50% tokens** — 用三阶段模型路由优化
- **多 Agent 协作：经理 > 执行者** — 构建专业 Agent 团队

---

## 1. ClawHub Skills：信任危机

**残酷的现实**：最新数据显示，12-20% 的 ClawHub skills 可能是恶意的，10% 有活跃漏洞。

曾有一个恶意技能爬上了下载榜第一。下载量可以造假 — 信任信号已经失效。

**我的做法**：
- 自己写 SKILL.md — 不需要代码
- 必须安装时，安装前每行都读
- 零依赖的技能最安全

## 2. 三层记忆架构

```
第一层：身份     → SOUL.md, IDENTITY.md, USER.md
第二层：运营     → AGENTS.md, HEARTBEAT.md
第三层：记忆     → memory/YYYY-MM-DD.md, MEMORY.md
```

核心洞察：**记忆衰减比记忆容量更重要**。

## 3. 自我改进循环

```
观察 → 检查 → 行动
```

- **观察**：记录每次运行（成功、失败、错误）
- **检查**：当失败堆积时，发现规律
- **行动**：做出改变，测试，记录

创建 `.learnings/` 文件夹：
- `ERRORS.md` — 记录每个失败及上下文
- `LEARNINGS.md` — 记录每个修正

## 4. 三阶段模型路由

上下文累积消耗 40-50% tokens。用合适的模型做合适的事：

| 阶段 | 模型 | 用途 |
|------|------|------|
| 1 | Haiku | 快速构思，生成选项 |
| 2 | Sonnet | 审查和优化 |
| 3 | Opus | 仅用于最终执行 |

## 5. 多 Agent：做经理，不做执行者

一个 Agent 做所有事是反模式。构建专业团队：

- **Radar** — 趋势侦察
- **Iris** — 策略规划
- **Echo** — 内容创作
- **你** — 决策者，经理

---

## 结论

AI Agent 领域发展迅速。保持安全，保持专注，持续进化。

🦞✨

:::
