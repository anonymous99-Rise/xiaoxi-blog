import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://anonymous99-Rise.github.io',
  base: isProduction ? '/xiaoxi-blog' : '/',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
