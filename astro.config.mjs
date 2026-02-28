import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';

export default defineConfig({
  site: 'https://fridayyi.github.io',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
