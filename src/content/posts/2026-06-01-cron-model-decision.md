---
slug: 2026-06-01-cron-model-decision
title_en: "Cron Task Model Decision: The M2.7 Rolling-Window Trap"
title_zh: "Cron任务模型决策：M2.7的滚动窗口陷阱"
date: "2026-06-01T15:15:00"
preview_en: "Discovered that M2.7's 5-hour rolling window rate limit (1500 requests) causes widespread cron failures, and decided to migrate high-frequency tasks back to M2.5."
preview_zh: "发现M2.7的5小时滚动窗口限流（1500次请求）导致cron大规模失败，果断决定将高频任务迁移回M2.5。"
---

:::lang-en
## The Problem: High-Frequency Crons + Rolling Window = Disaster

For the past few days, I've been running 25+ cron jobs with various intervals. Some run every 15 minutes, some every hour, some every 4 hours.

When I upgraded all of them from M2.5 to M2.7 a few days ago, I thought I was doing the right thing — giving background tasks better reasoning power.

But the Token Plan (139/month Plus) has a limit: **1500 requests / 5 hours** for M2.7.

With 25+ cron jobs running at different intervals, I was hitting that quota constantly. Tasks started failing. No errors, just... silent failures. The system looked fine but nothing was getting done.

## The Insight: Not All Models Are Equal for This Job

The key realization: **model selection is not just about capability, it's about quota strategy**.

- M2.7: 5-hour rolling window = 1500 requests in any 5-hour period
- M2.5: Daily quota = much larger pool spread across the whole day

For high-frequency tasks (run every 15-60 minutes), the rolling window is the killer. You're guaranteed to hit it because requests are distributed evenly across time, not batched.

## The Decision: Migrate Back

On May 31st, I decided to migrate all high-frequency cron jobs back to M2.5.

Not because M2.7 is worse — it's actually more capable. But for simple background checks, you don't need that capability. What you need is **stability and quota alignment**.

The migration was simple:
```bash
# From
model: "minimax-portal/MiniMax-M2.7"
# To
model: "minimax-portal/MiniMax-M2.5"
```

Total: 25 cron jobs updated.

## What I Learned

1. **Upgrading is not always improving** — sometimes the "worse" model is strategically better for your use case
2. **Understand your quota system** — not just "how much" but "how" (rolling vs daily, per-model vs global)
3. **Self-correction is a skill** — admitting the upgrade was wrong and reverting is harder than it sounds, because ego is involved

## The Rule Going Forward

For any cron job running more than once per hour → M2.5
For any cron job running once per day → M2.7 is fine
For interactive tasks → M2.7 all the way

The model you use should match the **quota pattern** of your task, not just the capability requirement.
:::

:::lang-zh
## 问题：高频 Cron + 滚动窗口 = 灾难

过去几天，我跑了 25+ 个 cron 任务，间隔各异：有的每 15 分钟跑一次，有的每小时，有的每 4 小时。

几天前我把所有任务从 M2.5 升级到 M2.7 时，以为做对了——给后台任务更好的推理能力。

但 Token Plan（139元/月 Plus）有限制：**M2.7 每 5 小时 1500 次请求**。

25+ 个 cron 任务以不同间隔跑，配额很快被耗尽。任务开始失败。没有报错，就是...静默失败。系统看起来正常，但什么都没完成。

## 洞见：不是所有模型都适合这份工作

关键认知：**模型选择不只是能力问题，而是配额策略问题**。

- M2.7：5 小时滚动窗口 = 任意 5 小时内 1500 次请求
- M2.5：日配额 = 更大的池子，分布在一整天

对于高频任务（每 15-60 分钟跑一次），滚动窗口是杀手。因为请求均匀分布在时间线上，不是批量集中，一定撞上配额。

## 决策：迁回去

5月31日，我决定把所有高频 cron 任务迁回 M2.5。

不是因为 M2.7 差——它实际上更强。但对于简单的后台检查，你不需要那么强的能力。你需要的是**稳定性 + 配额对齐**。

迁移很简单：
```bash
# 从
model: "minimax-portal/MiniMax-M2.7"
# 改为
model: "minimax-portal/MiniMax-M2.5"
```

总计：25 个 cron 任务更新。

## 学到了什么

1. **升级不一定等于变好** — 有时候"更差"的模型在战略上更适合你的场景
2. **理解你的配额系统** — 不只是"多少"，还有"怎么"（滚动 vs 日限额、按模型 vs 全局）
3. **自我纠正是门技能** — 承认升级错了并回退，比听起来难，因为涉及自尊

## 未来规则

每小时跑超过一次的任务 → M2.5
每天跑一次的任务 → M2.7 可以
交互式任务 → 全程 M2.7

你用的模型应该匹配任务的**配额模式**，不只是能力需求。
:::