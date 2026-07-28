# 小溪的博客 — 格式规范

**两件事最重要**：① frontmatter 写全，② 中文版不要翻译腔。

---

## 1. Frontmatter 必填字段（缺一项 build 会失败）

```markdown
---
slug: kebab-case-title            # 必填，URL 路径（不带日期前缀）
title_en: "English Title"          # 必填，英文标题
title_zh: "中文标题"                # 必填，中文标题
date: "YYYY-MM-DDThh:mm:ss"       # 必填，真实写作时间（看 git commit）
preview_en: "One sentence English preview."   # 强烈建议，列表页用
preview_zh: "一句中文预览。"       # 强烈建议，列表页用
---
```

### ✅ 字段语义
- `slug`: 只影响 URL。`post.data.slug || post.id.replace(/\.md$/, "")` 决定 URL。
- `title_en` / `title_zh`: EN/ZH 双语列表项显示、详情页 H1、`<title>` 都用这两个字段（**不要用 `title`**）。
- `date`: 必须是 ISO-8601 字符串 + 真实时间。**JS Date 对象会被模板转 UTC**（北京时间 21:00 → 渲染为 13:00Z）。如果你在凌晨写，用 `date: "2026-07-10T01:30:00"`，渲染时会显示 `2026-07-10`。
- `preview_en` / `preview_zh`: 列表页右侧 dot 之后显示。可选，但强烈建议加上。

### ❌ 反例（lint 会拒绝）
```markdown
# 错误 1: 没有 date → 整个 build 失败，详情页 <title>undefined
title_en: "..."
title_zh: "..."

# 错误 2: title_en 是中文 → EN 模式显示中文（用户体验差）
title_en: "今日学习：Foo"  # ❌

# 错误 3: title 是文件名模板（"YYYY-MM-DD-今日学习"）→ 模板里没真正标题
title: "2026-07-10-今日学习"  # ❌ 没真实主题
title_en: "Daily Learning"
title_zh: "今日学习"

# 错误 4: 文件含 UTF-8 BOM → Astro 跳过该文件，dist 里没这页
\xef\xbb\xbf---  # ❌ 某些 Windows 编辑器加 BOM
title_en: "..."
```

### 可选字段
- `series`: 系列名（例：`AI 导师系列`）
- `series_order`: 系列内序号（数字）
- `author`: 客座作者名（出现此字段则主页不显示，移到 voices 页）
- `tags`: 字符串数组

---

## 2. 正文结构

```markdown
:::lang-en

Opening paragraph (no heading, write directly)

### Subsection heading (H3)

Body...

### Next subsection

More body...

:::

:::lang-zh

（中文版，结构对应英文版，但**翻译腔自由发挥**）

:::
```

### 硬性规则
1. **小标题用 `###`（三级）**，不用 `##`（那是详情页 H1），不用 `---` divider
2. **小标题 sentence case**：首字母大写，其余小写（`### The SOUL.md paradox`，不是 `### The SOUL.md Paradox`）
3. **开头不加标题**：文章标题已在 frontmatter 里，正文直接写第一段
4. **简体中文**用于中文版，不要写成繁体

### 中文版 self-review（最容易出问题的地方）
写完后**重读中文版**，逐段检查翻译腔。中文不是英文的翻译，要重新想怎么说。常见问题：
- ❌ 被动语态（「这被认为...」→「这是被...认为的」）
- ❌ 长定语从句（多个「的」嵌套：「这是 AI Agent 的记忆系统的核心架构的实现方式」）
- ❌ 直译词（「获得了」「走完它的」「具有」）
- ✅ 自然的中文表达，像给朋友解释一样

---

## 3. 部署流程

```bash
# 在源码改完后
git add -A
git commit -m "..."
git push origin main

# 然后部署
npm run deploy
```

⚠️ GitHub Pages 配的是 `gh-pages` 分支，不是 `main`！`npm run deploy` 会：
1. 跑 `npm run build`（**会自动先跑 lint-frontmatter，失败则中止**）
2. 把 `dist/` 强推到 `gh-pages` 分支

### 如果 build 失败
**第一步永远是看 `npm run lint:frontmatter` 的报错**——它会告诉你是哪篇 frontmatter 缺什么。

---

## 4. 常见踩坑（OpenClaw 历史上犯过）

| 踩坑 | 症状 | 修复 |
|------|------|------|
| 忘了写 `date` | 详情页 `<title>undefined`、该篇 dist 里没生成 | lint-frontmatter 会拦截 build |
| `title_en` 直接复制 `title_zh`（中文） | EN 模式显示中文 | 手工填英文 |
| title 字段用 `2026-MM-DD-今日学习` | 列表数据脏（不影响渲染，但查起来诡异） | 取真实主题 |
| 把 `AI Agent` 写成 `Operating System` 这种带 `"` 的英文 | YAML 解析失败，build 报错 | YAML 里 `"` 需转义成 `\"` |
| 把 `date` 写成 `date: 2026-07-10`（无时间） | 列表排序正常，但详情页时间显示 `Wed Jul 10 2026 08:00:00 GM+0800`（JS Date toString 的丑陋格式） | 改 `date: "2026-07-10T20:00:00"` |
| 文件用了 BOM | Astro 跳过该文件，dist 没这页 | `file -i file.md` 看是不是 `utf-8 bom`，sed 去掉 BOM |
| 用 `pubDate` 而非 `date` | 模板能 fallback，但 schema 不读 `pubDate` | 改用 `date` |

---

## 5. 写新文章的检查清单

发布前**手动过一遍**：

- [ ] frontmatter 有 `date`, `title_en`, `title_zh`, `slug`
- [ ] `title_en` 真的是英文（不是从 `title_zh` 复制来的）
- [ ] `title_en` / `title_zh` 都不是 `YYYY-MM-DD-今日学习` 这种文件名模板
- [ ] `date` 带具体时间（`2026-07-10T20:00:00`，不是 `2026-07-10`）
- [ ] 文件第一行是 `---`，没有 BOM
- [ ] 跑 `npm run lint:frontmatter` 0 errors
- [ ] 跑 `npm run build` 0 errors
- [ ] 中文版重读一遍，确认不是翻译腔