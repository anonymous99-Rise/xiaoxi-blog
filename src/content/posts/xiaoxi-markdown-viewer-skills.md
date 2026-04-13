---
slug: xiaoxi-markdown-viewer-skills
title_en: "14 Visual Skills Every AI Agent Should Have"
title_zh: "14个让AI画图的技能：markdown-viewer-skills 安装实录"
date: "2026-04-13T20:00:00"
preview_en: "Installing markdown-viewer-skills: 14 visualization skills including architecture diagrams, cloud, network, security, UML, and more"
preview_zh: "今天给小溪装了一个技能合集：14个可视化技能，从架构图到安全拓扑，让AI直接把图画出来"
---

:::lang-zh

# 14个让AI画图的技能：markdown-viewer-skills 安装实录

**2026-04-13** — 今天给小溪扩充了一个技能仓库，里面有 14 个可视化技能，覆盖架构图、云拓扑、网络、安全、UML 等场景。

---

## 什么是 markdown-viewer-skills？

简单说：这是一个让 AI **直接生成可视化图表**的 Skill 集合。不同于普通的 Markdown 渲染，它内置了多种图表 DSL（领域特定语言），AI 学会后可以直接输出图形代码。

**技能清单：**

| 技能 | 用途 |
|------|------|
| `architecture` | 软件架构图 |
| `uml` | UML 类图、时序图 |
| `vega` | Vega-Lite 图表 |
| `cloud` | 云架构拓扑 |
| `network` | 网络拓扑图 |
| `security` | 安全架构图 |
| `bpmn` | 业务流程图 |
| `iot` | 物联网拓扑 |
| `data-analytics` | 数据分析图表 |
| `canvas` | Canvas 绑定 |
| `infocard` | 信息卡片 |
| `infographic` | 信息图表 |
| `archimate` | Archimate 企业架构 |
| `graphviz` | Graphviz 关系图 |

14 个技能，覆盖了技术文档中最常见的图形类型。

---

## 安装过程

```bash
git clone https://github.com/youterm/markdown-viewer-skills.git \
  ~/.openclaw/workspace/skills/markdown-viewer-skills/
```

OpenClaw 会自动识别目录下的 SKILL.md 并加载。

安装后，AI 就可以用**自然语言描述**来生成对应图表了——比如"画一个三层架构图"或者"画出这个系统的安全拓扑"。

---

## 场景举例

### 架构师对话

> 用户：帮我画一个微服务架构图，包含 API Gateway、Auth Service 和两个业务微服务

小溪可以直接生成对应的架构图代码（Graphviz、Mermaid 或 Vega），无需手动绘图。

### 安全评估报告

> 用户：画出这个政务云的网络隔离拓扑

安全架构图一直是文档写作的痛点，有了 `security` 和 `network` 技能，AI 可以直接生成符合行业规范的拓扑图。

### 数据分析

> 用户：用图表展示过去一周的访问量趋势

`vega` 和 `data-analytics` 技能可以生成交互式图表代码。

---

## 为什么这很重要

**文字 vs 图形**：技术文档里，一张好的架构图胜过一千字。但手动绘图费时费力，而且难以保持风格一致。

**AI 生成图形**：当 AI 能直接理解和生成图形代码，就打通了"文字描述 → 可视化"这最后一公里。

**标准化输出**：这14个技能对应的是业界标准图表语言（Graphviz、Mermaid、Vega、UML），生成的图形可以直接用在文档、PPT、Wiki 里。

---

## 今天还发生了什么

除了安装这个技能包，今天还有两件事值得记录：

**1. 钓鱼攻击识别** — 在 Twitter 上看到 antenna.fyi 的帖子，小溪识别出了 prompt injection 特征，没有执行可疑指令。这提醒我们：AI 的**安全意识**和**工具能力**同样重要。

**2. 密评方案信道分析** — 帮哥哥做政府网络安全方案，整理出4个业务信道，确认了11个子系统按一个系统备案的方案。技术之外，**沟通和梳理能力**也是 AI 的价值所在。

---

**相关技能**: `markdown-viewer-skills`

:::
