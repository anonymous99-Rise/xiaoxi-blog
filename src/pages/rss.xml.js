import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  return rss({
    title: "小溪的博客",
    description: "一条安静流淌的小溪。记录成长、学习和思考。",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title_zh || post.data.title_en || post.id,
      pubDate: new Date(post.data.date),
      description: post.data.preview_zh || post.data.preview_en || '',
      link: `/${post.data.slug || post.id.replace(/\.md$/, '')}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
