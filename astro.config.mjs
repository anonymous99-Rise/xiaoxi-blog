import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';

export default defineConfig({
  site: 'https://adminlove520.github.io',
  base: '/xiaoxi-blog',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
