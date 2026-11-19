import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['Learn', 'Recipes', 'Taste Lab', 'Kitchen', 'Stories']),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string(),
    imageNote: z.string(),
    imageWidth: z.number().int().positive().default(1536),
    imageHeight: z.number().int().positive().default(1024),
    imageFit: z.enum(['cover', 'contain']).default('cover'),
    cardTitle: z.string().optional(),
    cardSubtitle: z.string().optional(),
    enquiryService: z.string().optional(),
    enquiryLabel: z.string().default('Discuss your project'),
    sizeVariant: z.enum(['tall', 'portrait', 'standard', 'square', 'editorial', 'landscape']).default('standard'),
    background: z.enum(['olive', 'paper', 'clay', 'sage', 'ink']).default('paper'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, journal };
