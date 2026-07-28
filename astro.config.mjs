import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';


export default defineConfig({
  site: 'https://anonymous99-Rise.github.io',
  bbase: '/ai-mentor-xiaoxi',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
