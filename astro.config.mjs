import { defineConfig } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://adminlove520.github.io',
  base: isProduction ? '/xiaoxi-blog' : '/',
  output: 'static',
});
