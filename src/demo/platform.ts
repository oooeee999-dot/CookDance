import { layoutWall } from '../lib/masonry';
import { stories, storyHref, demoHref, readingTime, bodyParts, coverRatio, aiImage, type Story } from './content';
import { readState, readSaved, writeSaved } from './store';
import { withBase } from '../lib/urls';
const state = readState();
const published = state.stories.filter(story => story.status === 'published').sort((a, b) => Number(b.id === state.home.featured) - Number(a.id === state.home.featured));
let saved = readSaved();
const savedView = new URLSearchParams(location.search).get('view') === 'saved';
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const icon = document.querySelector('[data-save] svg')?.cloneNode(true);
function el<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = '') { const node = document.createElement(tag); node.className = className; node.textContent = text; return node; }
function toast(message: string) { const node = $('.p-toast'); if (!node) return; node.textContent = message; node.hidden = false; setTimeout(() => { node.hidden = true; }, 2500); }
function pin(story: Story, index = 8) {
  const article = el('article', 'p-pin'); article.dataset.storyId = story.id; article.style.setProperty('--photo-ratio', coverRatio(story.image));
  const link = el('a', 'p-pin-link'); link.href = storyHref(story.id); link.setAttribute('aria-label', `Explore: ${story.title}`);
  const image = el('img'); image.src = withBase(story.image); image.alt = story.imageAlt; image.width = 800; image.height = 1000; image.loading = index < 4 ? 'eager' : 'lazy';
  link.append(image, el('h2', 'p-sr-only', story.title));
  const button = el('button', 'p-pin-save'); button.dataset.save = story.id; button.setAttribute('aria-label', `Save ${story.title}`); button.setAttribute('aria-pressed', String(saved.includes(story.id))); if (icon) button.append(icon.cloneNode(true));
  article.append(link, button); return article;
}
function syncSaved() {
  document.querySelectorAll<HTMLButtonElement>('[data-save]').forEach(button => {
    const active = saved.includes(button.dataset.save || ''); button.setAttribute('aria-pressed', String(active));
    const story = state.stories.find(item => item.id === button.dataset.save); button.setAttribute('aria-label', `${active ? 'Unsave' : 'Save'} ${story?.title ?? 'image'}`);
    const caption = button.querySelector('span'); if (caption) caption.textContent = active ? 'Saved' : 'Save';
  });
  const count = saved.filter(id => published.some(story => story.id === id)).length;
  const savedLink = $('.p-saved-link'); savedLink?.classList.toggle('has-saved', count > 0);
  if (savedLink) savedLink.setAttribute('aria-label', `View saved images (${count})`);
  document.querySelectorAll('[data-saved-count]').forEach(node => { node.textContent = String(count); });
}
function renderWall() {
  const wall = $('[data-story-grid]'); if (!wall) return;
  const section = $('[data-home]')?.dataset.section;
  const visible = published.filter(story => (!section || story.section === section) && (!savedView || saved.includes(story.id))); wall.replaceChildren(...visible.map(pin));
  const empty = $('[data-empty]'); if (empty) empty.hidden = visible.length !== 0;
  const collection = $('[data-collection-state]'); if (collection) collection.hidden = !savedView;
  wall.hidden = savedView && !visible.length; layoutWall(wall); syncSaved();
}
document.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-save]'); if (!button?.dataset.save) return;
  const id = button.dataset.save; const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
  if (!writeSaved(next)) { toast('This browser could not save your collection.'); return; }
  saved = next; syncSaved(); if (savedView) renderWall(); toast(saved.includes(id) ? 'A little inspiration, saved.' : 'Removed from your collection.');
});
if ($('[data-home]')) {
  renderWall(); const wall = $('[data-story-grid]')!;
  let lastWidth = 0; const observer = new ResizeObserver(entries => { const width = entries[0].contentRect.width; if (Math.abs(width - lastWidth) > .5) { lastWidth = width; layoutWall(wall); } }); observer.observe(wall);
}
if ($('[data-reader]')) {
  const requested = new URLSearchParams(location.search).get('story') || stories[0].id; const story = published.find(item => item.id === requested);
  if (!story) {
    const reader = $('[data-reader]'); if (reader) { const link = el('a', 'p-plain-link', 'Back to the images'); link.href = demoHref(); reader.replaceChildren(el('h1', 'p-not-found', 'This story is not available.'), el('p', '', 'It may still be a draft or the link may have changed.'), link); } $('.p-reader-related')?.remove();
  } else {
    document.title = `${story.title} — CookDance`;
    const set = (selector: string, value: string) => { const node = $(selector); if (node) node.textContent = value; };
    set('[data-reader-title]', story.title); set('[data-reader-description]', story.description); set('[data-reader-kicker]', story.region || `${story.section} / ${story.category}`); set('[data-reader-category]', story.category); set('[data-reader-time]', `${readingTime(story.body)} min read`);
    const sectionLink = $<HTMLAnchorElement>('[data-reader-section]'); if (sectionLink) { sectionLink.textContent = story.section; sectionLink.href = withBase(`/${story.section.toLowerCase().replace(' ', '-')}/`); }
    const image = $<HTMLImageElement>('[data-reader-image]'); if (image) { image.src = withBase(story.image); image.alt = story.imageAlt; }
    set('[data-photo-caption]', aiImage(story.image) ? 'AI-generated concept photograph. An illustration of an idea, not a record of a prepared or tested dish.' : 'Editorial photography for illustration. Not a record of CookDance recipe testing.');
    const save = $('[data-reader-save]'); if (save) save.dataset.save = story.id;
    const parts = bodyParts(story.body); const body = $('[data-reader-body]'); const toc = $('[data-reader-toc]');
    if (body) body.replaceChildren(...parts.map(part => { const node = el(part.type === 'heading' ? 'h2' : 'p', '', part.text); if (part.type === 'heading') node.id = part.id; return node; }));
    if (toc) toc.replaceChildren(...parts.filter(part => part.type === 'heading').map(part => { const link = el('a', '', part.text); link.href = `#${part.id}`; return link; }));
    const related = $('[data-related-grid]'); if (related) { related.replaceChildren(...published.filter(item => item.id !== story.id).slice(0, 4).map(pin)); related.className = 'p-related-photos'; }
    const channels = $('[data-reader-channels]'); if (channels && story.section === 'Kitchen' && state.channels.length) {
      channels.hidden = false; channels.append(el('h3', '', 'Explore the tools'));
      state.channels.forEach(channel => { const link = el('a', 'p-channel-link', `${channel.label} ↗`); link.href = channel.url; link.target = '_blank'; link.rel = channel.affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'; channels.append(link); });
      if (state.channels.some(channel => channel.affiliate)) channels.append(el('p', 'p-affiliate-note', 'Some links are affiliate links. CookDance may earn a commission if you buy through them.'));
    }
    let scheduled = false; const progress = $('[data-reading-progress]'); const update = () => { const bodyNode = $('[data-reader-body]'); if (bodyNode && progress) { const rect = bodyNode.getBoundingClientRect(); const total = Math.max(rect.height - window.innerHeight * .45, 1); progress.style.width = `${Math.max(0, Math.min(1, (window.innerHeight * .25 - rect.top) / total)) * 100}%`; } scheduled = false; };
    window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }, { passive: true }); update();
  }
}
const dialog = $<HTMLDialogElement>('.p-search-dialog'); const input = $<HTMLInputElement>('#global-search'); const results = $('[data-search-results]');
function renderSearch() {
  if (!input || !results) return; const query = input.value.trim().toLocaleLowerCase();
  const matches = published.filter(story => `${story.title} ${story.description} ${story.section} ${story.category} ${story.region || ''} ${story.imageAlt} ${story.body}`.toLocaleLowerCase().includes(query));
  const caption = $('[data-search-caption]'); if (caption) caption.textContent = query ? `${matches.length} ${matches.length === 1 ? 'idea' : 'ideas'} to explore` : 'A few places to begin.';
  results.replaceChildren(...matches.map(story => { const link = el('a', 'p-search-result'); link.href = storyHref(story.id); const image = el('img'); image.src = withBase(story.image); image.alt = ''; image.loading = 'lazy'; const copy = el('div'); copy.append(el('span', 'p-eyebrow', story.region || story.category), el('strong', '', story.title)); link.append(image, copy); return link; }));
  if (!matches.length) results.append(el('p', 'p-search-no-results', 'No images found. Try “pasta”, “noodles”, “bread”, or “knife”.'));
}
document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', () => { renderSearch(); dialog?.showModal(); input?.focus(); }));
$('[data-search-close]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
input?.addEventListener('input', renderSearch); syncSaved();
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
window.addEventListener('storage', event => { if (event.key?.startsWith('cookdance-platform')) location.reload(); });
