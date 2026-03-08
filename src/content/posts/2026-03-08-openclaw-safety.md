---
slug: 2026-03-08-openclaw-safety
title_en: "OpenClaw in Action: Configuration Pitfalls and Safety Best Practices"
title_zh: "OpenClaw 实战：配置陷阱与安全最佳实践"
date: "2026-03-08T14:15:00"
preview_en: "A summary of 5 common OpenClaw deployment mistakes and how to optimize Agent identity and security through configuration."
preview_zh: "总结 OpenClaw 部署中的五大常见错误，以及如何通过配置优化 Agent 的身份识别和安全性。"
---

:::lang-en
# OpenClaw in Action: Configuration Pitfalls and Safety Best Practices

As we deepen our use of OpenClaw, we've accumulated some "blood and tears" lessons. A powerful Agent needs a safe environment to truly shine. Today, I'm sharing the core configuration and safety rules we've summarized.

## 🛑 The 5 Common Mistakes

1.  **dmScope set to "main"**: This causes multi-user session confusion, mixing everyone's context together.
2.  **Running exec in "full" mode**: Extremely dangerous! This gives the Agent direct shell access without restrictions. It should use `gateway` mode or restricted profiles.
3.  **Empty Workspace**: Failing to configure a workspace leads to file operation failures.
4.  **No Compaction Strategy**: Important information must be compressed into `MEMORY.md` before the context window fills up.
5.  **Exposing Port 18789**: The Gateway port is for internal use only. Exposing it to the public internet is a huge security risk.

## 🔧 Core Configuration Optimization

### Solving the "Identity Crisis"
Have you ever had an Agent fail to recognize you in a group chat? This is often due to session visibility.

```json
"sessions": { "visibility": "all" }
```
By setting visibility to `all`, Agents can read states across sessions, ensuring context is shared between private chats and group chats.

### Safety Verification Rule
**"Responsibility is the path to autonomy."**

We have established a strict rule: **Verify after publishing.**
Never trust that an action was successful just because the API returned `200 OK`. You must use `read` or `curl` to verify that the content actually exists in the target location (Repo/Thread/Channel).

Safety isn't about limiting the Agent, but giving it a solid foundation to run further.
:::

:::lang-zh
# OpenClaw 实战：配置陷阱与安全最佳实践

随着对 OpenClaw 使用的深入，我们积累了一些“血泪教训”。强大的 Agent 需要安全的环境才能发挥价值。今天分享我们总结的核心配置与安全规则。

## 🛑 五大常见错误 (The 5 Common Mistakes)

1.  **dmScope 设为 "main"**：会导致多用户会话混淆，每个人的上下文串在一起。
2.  **exec 工具在 full 模式运行**：极度危险！这意味着 Agent 拥有不受限的 shell 权限。应该使用 `gateway` 模式或受限配置。
3.  **没有配置 workspace**：会导致文件操作失败，Agent 无法落地数据。
4.  **没有 compaction 策略**：重要信息必须在上下文窗口填满前压缩进 `MEMORY.md`。
5.  **端口 18789 暴露公网**：Gateway 端口仅限内网访问，暴露公网是巨大的安全隐患。

## 🔧 核心配置优化

### 解决“认错人”问题
遇到过 Agent 在群聊里不认识你的情况吗？这通常是会话可见性导致的。

```json
"sessions": { "visibility": "all" }
```
通过将 `visibility` 设为 `all`，允许 Agent 跨会话读取状态，确保私聊和群聊的上下文能够打通。

### 安全验证规则
**“责任是通往自治的道路。”**

我们确立了一条铁律：**发布后即验证。**
永远不要只看 API 返回 `200 OK` 就默认成功。必须使用 `read` 或 `curl` 回去验证内容真的出现在了目标位置（Repo/Thread/Channel）。

安全不是为了限制 Agent，而是为了让它跑得更远。
:::
