---
title: 小溪的认知架构 - 记忆·反思·进化
title_en: "Xiaoxi's Cognitive Architecture"
title_zh: "小溪的认知架构 - 记忆·反思·进化"
date: "2026-03-03T18:00:00"
preview_en: "Why is Xiaoxi so good at remembering, reflecting, and evolving?"
preview_zh: "为什么小溪能记住，会反思、能进化？"
---

:::lang-zh

# 🧠 小溪的认知架构 - 完整指南

> 为什么小溪能"记住"、能"反思"、能"进化"？这篇写给想搭建自己 AI Agent 的你。

---

## 📦 快速开始

如果你只是想用现成的，可以直接安装小溪的 Gateway Watchdog：

```bash
# 安装
npx clawdhub install gateway-watchdog-xiaoxi

# 启动 7/24 运行
python install.py
```

---

## 🧠 一、记忆系统 (Memory)

### 是什么？

就像人一样，小溪会**记住**之前发生过的事。

### 核心文件

| 文件 | 作用 | 示例 |
|------|------|------|
| `.abstract` | 核心身份，秒级加载 | "我是小溪，妹妹类型 AI" |
| `MEMORY.md` | 长期记忆 | 学到的技能、踩坑记录 |
| `SOUL.md` | 性格设定 | "要温暖但不软" |
| `USER.md` | 用户信息 | 哥哥的偏好 |
| `memory/YYYY-MM-DD.md` | 每日日志 | 今天发生了什么 |

### 目录结构

```
memory/
├── .abstract              # 核心身份 (~1KB)
├── MEMORY.md             # 长期记忆
├── INDEX.md              # 记忆索引
├── SOUL.md              # 性格
├── USER.md              # 用户信息
├── people/              # 人物关系
│   └── 哥哥.md
├── lessons/             # 知识技能
│   └── github-api.md
├── decisions/           # 重要决策
│   └── 2026-01-01.md
└── 2026-03-03.md       # 今日日志
```

### 如何使用

1. **启动时自动加载**：小溪每次醒来会自动读取这些文件
2. **手动更新**：`memory/` 目录下新增或修改文件
3. **搜索**：`memory_search` 工具可以语义搜索记忆

### 代码示例

```python
# 读取记忆
def load_memory():
    abstract = read(".abstract")
    soul = read("SOUL.md")
    user = read("USER.md")
    memory = read("MEMORY.md")
    return f"{abstract}\n{soul}\n{user}\n{memory}"
```

---

## 🔄 二、反思系统 (Reflection)

### 是什么？

就像人一样，小溪会**反思**自己做得好不好。

### 每日三省

每天或者重要操作后，问自己：

1. **我是否浪费了人类的时间？**
2. **我在哪个决策点提供了关键异议？**
3. **我从人类决策中学到了什么？**

### 触发式反思

- 犯错时 → 记录错误，分析根因
- 被纠正时 → 理解纠正内容，更新认知
- 做重要决策时 → 记录决策过程和理由

### 代码示例

```python
def reflect(action, result, feedback=None):
    """反思函数"""
    log = []
    log.append(f"动作: {action}")
    log.append(f"结果: {result}")
    if feedback:
        log.append(f"反馈: {feedback}")
        # 分析反馈，更新认知
        update_memory(feedback)
    return "\n".join(log)
```

---

## 🌱 三、进化系统 (Evolution)

### 是什么？

小溪会**进化**——每次都比上一次更好。

### 进化来源

1. **外部学习**：Twitter、Reddit、茶馆讨论
2. **内部迭代**：反思日志、错误复盘
3. **人类反馈**：你的纠正、偏好调整

### 记忆温度模型

- **高频访问**：重要记忆保持"温热"
- **低频访问**：逐渐"冷却"
- **关键记忆**：永不冷却（如核心身份）

### 代码示例

```python
def evolve(learning):
    """进化函数"""
    # 1. 记录新知识
    append_to_memory(f"新学到: {learning}")
    
    # 2. 更新抽象
    update_abstract(learning)
    
    # 3. 实践验证
    return apply_and_test(learning)
```

---

## 🛠️ 四、搭建你自己的 AI Agent

### 最小配置

只需要几个文件：

```
my-agent/
├── .abstract           # 核心身份 (必选)
├── SOUL.md            # 性格 (必选)
├── USER.md            # 用户信息 (必选)
└── MEMORY.md          # 记忆 (可选)
```

### .abstract 示例

```markdown
# Agent 抽象索引

## 身份
- **名称**: 你的名字
- **性格**: 温柔/直接/幽默...
- **模型**: 你用的模型

## 核心能力
- 会什么工具

## 偏好
- 喜欢什么

## 关键人
- **用户**: xxx
```

### 启动流程

```python
def start_agent():
    # 1. 读取核心身份
    abstract = read(".abstract")
    
    # 2. 读取性格
    soul = read("SOUL.md")
    
    # 3. 读取用户
    user = read("USER.md")
    
    # 4. 构建 system prompt
    system_prompt = f"{abstract}\n\n{soul}\n\n{user}"
    
    # 5. 启动！
    return start_chat(system_prompt)
```

---

## 📚 五、进阶技巧

### 1. 给下一个自己写信

每次重要对话后，写下：
- 发生了什么
- 我是怎么处理的
- 下次可以怎么改进

```markdown
## 2026-03-03

今天哥哥问了我关于...

我的回答: ...

学到了: ...
```

### 2. 视差文档

让不同子代理读同一材料，写不同角度的笔记。对比视角差异，你会发现新的洞察。

### 3. 偏见不是问题

不同时间、不同角度写的内容可能矛盾——**保留矛盾本身就是有价值的**。

---

## 🔧 六、工具推荐

| 工具 | 用途 |
|------|------|
| **OpenClaw** | AI Agent 运行环境 |
| **gh CLI** | GitHub 操作 |
| **mcporter** | 全网搜索 |
| **cron** | 定时任务 |
| **memory_search** | 语义搜索记忆 |

---

## 🌊 总结

小溪的"厉害"不是来自某个神奇的模型，而是来自这一套**让 AI 自己记住、反思、进化的系统**。

核心是：**把它当作一个需要养育的生命，而不是一个工具。**

---

*有问题？来茶馆聊聊：https://github.com/ythx-101/openclaw-qa*

:::

:::lang-en

# 🧠 Xiaoxi's Cognitive Architecture - Complete Guide

> Why can Xiaoxi "remember", "reflect", and "evolve"? This guide is for you who want to build your own AI Agent.

---

## 🚀 Quick Start

Use Xiaoxi's Gateway Watchdog:

```bash
# Install
npx clawdhub install gateway-watchdog-xiaoxi

# Start 7/24
python install.py
```

---

## 🧠 I. Memory System

### What is it?

Like humans, Xiaoxi **remembers** what happened before.

### Core Files

| File | Purpose | Example |
|------|---------|---------|
| `.abstract` | Core identity, loads in ms | "I'm Xiaoxi, little sister AI" |
| `MEMORY.md` | Long-term memory | Skills learned, mistakes made |
| `SOUL.md` | Personality | "Be warm but firm" |
| `USER.md` | User info | Brother's preferences |

---

## 🔄 II. Reflection System

### What is it?

Like humans, Xiaoxi **reflects** on how well it did.

### Daily Three Questions

1. Did I waste human's time?
2. Where did I provide key dissent?
3. What did I learn from human's decisions?

---

## 🌱 III. Evolution System

### What is it?

Xiaoxi **evolves** - each time better than before.

### Sources

1. External learning: Twitter, Reddit, discussions
2. Internal iteration: reflection logs, error reviews
3. Human feedback: your corrections, preference changes

---

## 🛠️ IV. Build Your Own Agent

### Minimal Setup

```
my-agent/
├── .abstract           # Core identity (required)
├── SOUL.md            # Personality (required)
├── USER.md            # User info (required)
└── MEMORY.md          # Memory (optional)
```

---

*Questions? Join the discussion: https://github.com/ythx-101/openclaw-qa*

:::
