import { covers, storyHref, type DemoState, type Story, type Section } from './content';
import { readState, writeState, resetState, safeUrl } from './store';
import { withBase } from '../lib/urls';
let state: DemoState = readState();
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector);
function el<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = '') { const node = document.createElement(tag); node.className = className; node.textContent = text; return node; }
function view(name: string) {
  document.querySelectorAll<HTMLElement>('[data-studio-view]').forEach(panel => { panel.hidden = panel.dataset.studioView !== name; });
  document.querySelectorAll<HTMLElement>('[data-studio-tab]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.studioTab === name || name === 'editor' && button.dataset.studioTab === 'library')));
  if (name === 'library') renderList(); if (name === 'home') renderHome(); if (name === 'channels') renderChannels(); window.scrollTo({ top: 0 });
}
function message(selector: string, text: string) { const node = $(selector); if (node) node.textContent = text; }
function persist(selector: string, success: string) { const okay = writeState(state); message(selector, okay ? success : '浏览器未能保存。请检查本地存储是否可用。'); return okay; }
function renderList() {
  const list = $('[data-studio-list]'); if (!list) return;
  const query = $<HTMLInputElement>('#studio-search')!.value.toLocaleLowerCase(); const status = $<HTMLSelectElement>('#studio-status')!.value;
  const items = state.stories.filter(story => (status === 'all' || story.status === status) && `${story.title} ${story.description} ${story.category} ${story.region || ''}`.toLocaleLowerCase().includes(query));
  message('[data-studio-count]', `${items.length} 条内容 · ${state.stories.filter(story => story.status === 'published').length} 条已发布到本地演示`);
  list.replaceChildren(...items.map(story => {
    const item = el('article', 's-list-item'); const image = el('img'); image.src = withBase(story.image); image.alt = story.imageAlt; image.loading = 'lazy';
    const copy = el('div', 's-item-copy'); copy.append(el('h3', '', story.title), el('p', '', `${story.section} / ${story.category}${story.region ? ` · ${story.region}` : ''}`));
    const badge = el('span', `s-status${story.status === 'draft' ? ' draft' : ''}`, story.status === 'published' ? '已发布' : '草稿');
    const edit = el('button', '', '编辑'); edit.setAttribute('aria-label', `编辑 ${story.title}`); edit.addEventListener('click', () => editStory(story.id));
    item.append(image, copy, badge, edit); return item;
  }));
  if (!items.length) list.append(el('p', 's-empty', '没有找到内容。换个词，或新建一条内容。'));
}
const form = $<HTMLFormElement>('#story-form')!;
const field = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement = HTMLInputElement>(name: string) => form.elements.namedItem(name) as T;
function editStory(id?: string) {
  const story = state.stories.find(item => item.id === id);
  form.reset(); field('id').value = story?.id || '';
  for (const name of ['title', 'description', 'body', 'category', 'region'] as const) field(name).value = story?.[name] || '';
  field('section').value = story?.section || 'Stories'; field('image').value = story?.image || covers[6].src;
  if (!story) { field('category').value = 'Food & culture'; field('body').value = 'A little idea worth sharing.\n\n## The story behind the image\nStart your story here.\n\n## A little more to explore\nAdd a useful detail, a documented method, or a source.'; }
  const preview = $<HTMLAnchorElement>('[data-editor-preview]')!; preview.hidden = !story || story.status !== 'published'; if (story) preview.href = storyHref(story.id);
  message('[data-editor-heading]', story ? '编辑内容' : '新建内容'); message('[data-editor-message]', ''); updateCover(); view('editor');
}
function updateCover() { const cover = covers.find(item => item.src === field('image').value); const preview = $<HTMLImageElement>('[data-cover-preview]'); if (cover && preview) { preview.src = withBase(cover.src); preview.alt = cover.alt; } }
form.addEventListener('submit', event => {
  event.preventDefault(); if (!form.reportValidity()) return;
  if (!field('title').value.trim() || !field('description').value.trim() || !field('body').value.trim() || !field('category').value.trim()) { message('[data-editor-message]', '标题、介绍、正文和分类需要填写有效文字。'); return; }
  const status = (event as SubmitEvent).submitter?.getAttribute('value') === 'draft' ? 'draft' : 'published';
  const id = field('id').value || `story-${crypto.randomUUID().slice(0, 8)}`; const index = state.stories.findIndex(story => story.id === id);
  if (index === -1 && state.stories.length >= 60) { message('[data-editor-message]', '此本地原型最多保存 60 条内容。请先导出内容。'); return; }
  const cover = covers.find(item => item.src === field('image').value)!;
  const story: Story = { id, title: field('title').value.trim(), description: field('description').value.trim(), body: field('body').value.trim(), section: field('section').value as Section, category: field('category').value.trim(), region: field('region').value.trim(), image: cover.src, imageAlt: cover.alt, status };
  if (index !== -1) state.stories[index] = story; else state.stories.unshift(story);
  if (!state.stories.some(item => item.id === state.home.featured && item.status === 'published')) state.home.featured = state.stories.find(item => item.status === 'published')?.id || '';
  if (!persist('[data-editor-message]', status === 'published' ? '已发布到本地演示。打开前台即可看到图片和详情变化。' : '草稿已保存，不会出现在前台。')) { state = readState(); return; }
  field('id').value = id; const preview = $<HTMLAnchorElement>('[data-editor-preview]')!; preview.hidden = status !== 'published'; preview.href = storyHref(id);
});
function renderHome() {
  const select = $<HTMLSelectElement>('[data-featured-select]')!; select.replaceChildren(...state.stories.filter(story => story.status === 'published').map(story => { const option = el('option', '', story.title); option.value = story.id; return option; })); select.value = state.home.featured;
  const grid = $('[data-home-preview]')!; const sorted = [...state.stories.filter(story => story.status === 'published')].sort((a, b) => Number(b.id === state.home.featured) - Number(a.id === state.home.featured)); grid.replaceChildren(...sorted.slice(0, 8).map(story => { const image = el('img'); image.src = withBase(story.image); image.alt = story.imageAlt; return image; }));
}
$<HTMLFormElement>('#home-form')!.addEventListener('submit', event => { event.preventDefault(); state.home.featured = $<HTMLSelectElement>('[data-featured-select]')!.value; persist('[data-home-message]', '首页编排已保存。刷新前台查看新的首图。'); renderHome(); });
function renderChannels() {
  const list = $('[data-channel-list]')!; list.replaceChildren(...state.channels.map(channel => {
    const row = el('div', 's-channel-row'); const copy = el('div'); copy.append(el('strong', '', `${channel.label}${channel.affiliate ? ' · 联盟链接' : ''}`), el('p', '', channel.url));
    const remove = el('button', '', '移除'); remove.addEventListener('click', () => { state.channels = state.channels.filter(item => item.id !== channel.id); persist('[data-channel-message]', '渠道已移除。'); renderChannels(); }); row.append(copy, remove); return row;
  })); if (!state.channels.length) list.append(el('p', 's-empty', '还没有配置购买渠道。先让内容找到自己的位置。'));
}
$<HTMLFormElement>('#channel-form')!.addEventListener('submit', event => {
  event.preventDefault(); const channelForm = event.currentTarget as HTMLFormElement; const values = new FormData(channelForm); const label = String(values.get('label') || '').trim(); const url = safeUrl(String(values.get('url') || ''));
  if (!label || !url) { message('[data-channel-message]', '请填写渠道名称和有效的 HTTPS 链接。'); return; }
  if (state.channels.length >= 10) { message('[data-channel-message]', '此原型最多配置 10 个渠道。'); return; }
  state.channels.push({ id: crypto.randomUUID(), label, url, affiliate: values.has('affiliate') });
  if (persist('[data-channel-message]', '渠道已添加。可以到 Kitchen 内容详情页查看。')) { channelForm.reset(); renderChannels(); } else state = readState();
});
$('[data-export]')?.addEventListener('click', () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = el('a'); link.href = url; link.download = 'cookdance-content-demo.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); message('[data-export-message]', '已导出内容 JSON。此文件是内容备份，不会自动发布到网站。'); });
let resetArmed = false;
$('[data-reset]')?.addEventListener('click', () => { if (!resetArmed) { resetArmed = true; message('[data-export-message]', '再次点击“恢复演示初始内容”将清除本机的内容修改。可以先导出备份。'); return; } if (resetState()) { state = readState(); renderHome(); renderList(); renderChannels(); message('[data-export-message]', '已恢复初始内容。收藏保持不变。'); resetArmed = false; } });
document.querySelectorAll<HTMLElement>('[data-studio-tab]').forEach(button => button.addEventListener('click', () => view(button.dataset.studioTab!)));
$('[data-new-story]')?.addEventListener('click', () => editStory()); $('[data-back-library]')?.addEventListener('click', () => view('library'));
field('image').addEventListener('change', updateCover); $('#studio-search')?.addEventListener('input', renderList); $('#studio-status')?.addEventListener('change', renderList);
view('library');
