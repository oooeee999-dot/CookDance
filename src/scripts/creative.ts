import { creativeCards, cardDestination, brand, services, briefText, briefMailto, type ProjectBrief } from '../data/creative';
import { layoutWall } from '../lib/masonry';
import { withBase } from '../lib/urls';
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const savedKey = 'cookdance-creative-saved-v1';
const knownIds = new Set(creativeCards.map(card => card.id));
function readSaved(): string[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(savedKey) ?? '[]'); return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))].slice(0,100) : []; } catch { return []; }
}
let saved = readSaved();
function toast(text: string) { const node = $('.p-toast'); if (!node) return; node.textContent = text; node.hidden = false; window.setTimeout(() => {node.hidden = true;},2500); }
const savedView = new URLSearchParams(location.search).get('view') === 'saved';
const wall = $('[data-creative-grid]');
function syncSaved() {
  document.querySelectorAll<HTMLButtonElement>('[data-creative-save]').forEach(button => {
    const active = saved.includes(button.dataset.creativeSave ?? ''); button.setAttribute('aria-pressed',String(active));
    const card = creativeCards.find(item => item.id === button.dataset.creativeSave);
    button.setAttribute('aria-label',`${active ? 'Unsave' : 'Save'} ${card?.title.replace(/\n/g,' ') ?? 'idea'}`);
  });
  document.querySelectorAll('[data-saved-count]').forEach(node => { node.textContent = String(saved.length); });
  const link = $('.p-saved-link'); link?.classList.toggle('has-saved',saved.length > 0); link?.setAttribute('aria-label',`View saved ideas (${saved.length})`);
  if (wall) {
    Array.from(wall.children).forEach(child => { if (child instanceof HTMLElement) child.hidden = savedView && !saved.includes(child.dataset.cardId ?? ''); });
    const empty = $('[data-creative-empty]'); if (empty) empty.hidden = !savedView || saved.length > 0;
    const label = $('[data-creative-collection]'); if (label) label.hidden = !savedView;
    layoutWall(wall);
  }
}
document.addEventListener('click',event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-creative-save]');
  const id = button?.dataset.creativeSave; if (!id || !knownIds.has(id)) return;
  const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved,id];
  try { localStorage.setItem(savedKey,JSON.stringify(next)); } catch { toast('This browser could not save your collection.'); return; }
  saved = next; syncSaved(); toast(saved.includes(id) ? 'An idea, saved.' : 'Removed from your collection.');
});
// Failed media changes presentation only. The original ratio and masonry position remain stable.
document.querySelectorAll<HTMLImageElement>('[data-card-media],[data-detail-media]').forEach(image => {
  const fallback = () => { const parent = image.closest<HTMLElement>('[data-has-image]'); if (parent) parent.dataset.hasImage = 'false'; image.remove(); };
  image.addEventListener('error',fallback,{once:true});
  if (image.complete && image.naturalWidth === 0) fallback();
});
if (wall) {
  let lastWidth = 0;
  new ResizeObserver(entries => { const width = entries[0].contentRect.width; if (Math.abs(width-lastWidth)>.5) {lastWidth = width; layoutWall(wall);} }).observe(wall);
}
syncSaved();

const dialog = $<HTMLDialogElement>('.p-search-dialog');
const search = $<HTMLInputElement>('#global-search');
const results = $('[data-search-results]');
function renderSearch() {
  if (!search || !results) return;
  const query = search.value.trim().toLocaleLowerCase();
  const matches = creativeCards.filter(card => `${card.title} ${card.subtitle ?? ''} ${card.category} ${card.description}`.replace(/\s+/g,' ').toLocaleLowerCase().includes(query));
  results.replaceChildren();
  for (const card of matches) {
    const link = document.createElement('a'); link.className = 'c-search-result'; const destination = cardDestination(card); link.href = destination.startsWith('/') ? withBase(destination) : destination;
    const kind = document.createElement('span'); kind.className = 'p-eyebrow'; kind.textContent = `${card.kind} / ${card.category}`;
    const title = document.createElement('strong'); title.textContent = card.title.replace(/\n/g,' '); link.append(kind,title); results.append(link);
  }
  if (!matches.length) {const text = document.createElement('p'); text.className = 'p-search-no-results'; text.textContent = 'No matching ideas. Try “video”, “fashion”, or “product”.'; results.append(text);}
  const caption = $('[data-search-caption]'); if (caption) caption.textContent = query ? `${matches.length} ${matches.length === 1 ? 'direction' : 'directions'} to explore` : 'A few places to begin.';
}
document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click',() => {renderSearch(); dialog?.showModal(); search?.focus();}));
$('[data-search-close]')?.addEventListener('click',() => dialog?.close());
dialog?.addEventListener('click',event => {if (event.target === dialog) {const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();}});
search?.addEventListener('input',renderSearch);
document.querySelectorAll('.p-mobile-menu a').forEach(link => link.addEventListener('click',() => {const menu = link.closest('details'); if (menu) menu.open = false;}));
document.addEventListener('keydown',event => {if (event.key === 'Escape') document.querySelectorAll<HTMLDetailsElement>('.p-mobile-menu').forEach(menu => {menu.open = false;});});

const form = $<HTMLFormElement>('#project-brief');
let preparedBrief = '';
if (form) {
  const serviceInput = form.elements.namedItem('service') as HTMLSelectElement;
  const preset = new URLSearchParams(location.search).get('service');
  if (services.some(service => service.id === preset)) serviceInput.value = preset!;
  form.addEventListener('submit',event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const data = new FormData(form);
    const brief: ProjectBrief = {name:String(data.get('name') ?? ''),email:String(data.get('email') ?? ''),service:serviceInput.selectedOptions[0].textContent ?? 'Let’s discuss',description:String(data.get('description') ?? ''),budget:String(data.get('budget') ?? '')};
    preparedBrief = briefText(brief);
    const preview = $<HTMLTextAreaElement>('[data-brief-preview]'); if (preview) preview.value = preparedBrief;
    const mailto = $<HTMLAnchorElement>('[data-brief-mailto]'); if (mailto) mailto.href = briefMailto(brief);
    const output = $('[data-brief-result]'); if (output) output.hidden = false;
    const status = $('[data-brief-status]'); if (status) status.textContent = 'Your brief is ready. Nothing has been sent. Open an email draft or copy the brief to send it yourself.';
    output?.scrollIntoView({block:'nearest',behavior:'auto'});
  });
  form.addEventListener('input',() => {const output = $('[data-brief-result]'); if (output) output.hidden = true; preparedBrief = '';});
  $('[data-brief-copy]')?.addEventListener('click',async () => {
    const status = $('[data-brief-status]');
    try {await navigator.clipboard.writeText(preparedBrief); if (status) status.textContent = `Brief copied. Paste it into your email or message to ${brand.email}. Nothing has been sent.`;}
    catch {if (status) status.textContent = 'Automatic copying is unavailable. Select and copy the prepared brief below.'; $<HTMLTextAreaElement>('[data-brief-preview]')?.select();}
  });
  form.hidden = false;
}
window.addEventListener('storage',event => {if (event.key === savedKey || event.key === null) {saved = readSaved(); syncSaved();}});
window.addEventListener('pageshow',() => {saved = readSaved(); syncSaved();});
