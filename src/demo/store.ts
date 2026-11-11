import { initialState, covers, sections, type DemoState, type Story } from './content';
const contentKey = 'cookdance-platform-content-v1';
const savedKey = 'cookdance-platform-saved-v1';
const clone = (): DemoState => structuredClone(initialState);
export function safeUrl(value: string): string | null {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
function validStory(story: Story): boolean {
  return story && typeof story.id === 'string' && /^[a-z0-9-]{1,100}$/.test(story.id)
    && typeof story.title === 'string' && story.title.length > 0 && story.title.length <= 150
    && typeof story.description === 'string' && story.description.length <= 400
    && sections.includes(story.section) && typeof story.category === 'string' && story.category.length <= 80
    && covers.some(cover => cover.src === story.image) && typeof story.imageAlt === 'string'
    && typeof story.body === 'string' && story.body.length <= 40000
    && ['draft', 'published'].includes(story.status);
}
export function readState(): DemoState {
  try {
    const raw = localStorage.getItem(contentKey);
    if (!raw || raw.length > 1000000) return clone();
    const state = JSON.parse(raw) as DemoState;
    if (state.version !== 1 || !Array.isArray(state.stories) || state.stories.length > 60 || !state.stories.every(validStory)
      || new Set(state.stories.map(story => story.id)).size !== state.stories.length
      || !state.home || typeof state.home.featured !== 'string' || typeof state.home.topics !== 'boolean' || typeof state.home.kitchen !== 'boolean'
      || !Array.isArray(state.channels) || state.channels.length > 10
      || !state.channels.every(channel => typeof channel.id === 'string' && typeof channel.label === 'string' && channel.label.length <= 80 && safeUrl(channel.url) && typeof channel.affiliate === 'boolean')) return clone();
    return state;
  } catch { return clone(); }
}
export function writeState(state: DemoState): boolean {
  try { const serialized = JSON.stringify(state); if (serialized.length > 1000000) return false; localStorage.setItem(contentKey, serialized); return true; } catch { return false; }
}
export function readSaved(): string[] {
  try { const ids: unknown = JSON.parse(localStorage.getItem(savedKey) || '[]'); return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string').slice(0, 60) : []; } catch { return []; }
}
export function writeSaved(ids: string[]) { try { localStorage.setItem(savedKey, JSON.stringify(ids)); return true; } catch { return false; } }
export function resetState() { try { localStorage.removeItem(contentKey); return true; } catch { return false; } }
