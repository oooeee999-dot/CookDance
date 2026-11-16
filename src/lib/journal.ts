import { getCollection, type CollectionEntry } from 'astro:content';
import type { DisplayCard } from '../data/creative';

export async function publishedJournal() {
  const entries = await getCollection('journal', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime() || a.id.localeCompare(b.id));
}

export function journalCard(entry: CollectionEntry<'journal'>): DisplayCard {
  return {
    id: `journal-${entry.id}`,
    title: entry.data.cardTitle ?? entry.data.title,
    subtitle: entry.data.cardSubtitle,
    category: entry.data.category,
    description: `${entry.data.title}. ${entry.data.description} ${entry.data.tags.join(' ')}`,
    image: entry.data.image,
    imageAlt: entry.data.imageAlt,
    imageNote: entry.data.imageNote,
    background: entry.data.background,
    sizeVariant: entry.data.sizeVariant,
    kind: 'Journal',
    textPosition: 'bottom-left',
    link: `/journal/${entry.id}/`,
  };
}
