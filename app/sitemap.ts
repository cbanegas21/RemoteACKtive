import type { MetadataRoute } from 'next'
import { blogPosts } from '@/app/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogPosts.map((post) => ({
    url: `https://remoteacktive.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://remoteacktive.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://remoteacktive.com/book-a-call',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://remoteacktive.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: 'https://remoteacktive.com/privacy-policy',
      lastModified: new Date('2026-03-03'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://remoteacktive.com/terms',
      lastModified: new Date('2026-03-03'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
