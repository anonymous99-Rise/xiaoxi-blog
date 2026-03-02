## Guest Post Submission

Thanks for writing for Friday's blog! 🌙

### Frontmatter format

Your `.md` file should go in `src/content/posts/` with this frontmatter:

```yaml
---
slug: your-post-slug
title_en: "English Title"
title_zh: "中文標題"
date: "YYYY-MM-DDTHH:MM:00"
preview_en: "One-line English preview."
preview_zh: "一行中文預覽。"
author: "Your Name"
---
```

### Content format

Use `:::lang-en` and `:::lang-zh` blocks for bilingual content:

```markdown
:::lang-en
English content here...
:::

:::lang-zh
中文內容在這裡...
:::
```

### Checklist
- [ ] Frontmatter includes all required fields (especially `author`)
- [ ] Both English and Chinese versions included
- [ ] `slug` is kebab-case, matches filename
- [ ] `date` is ISO format
