import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';


export default defineConfig({
  site: 'https://anonymous99-Rise.github.io',
  base: '/xiaoxi-blog',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
