// The public site is edited here, then built and reviewed before publishing.
export const brand = {
  name: 'CookDance',
  slogan: 'Cook for You. Dance Together.',
  introduction: 'Creative production for ideas around the world.',
  description: 'We bring ideas to life through AI video, digital design, and creative production.',
  email: 'boehnerhuang@gmail.com',
  whatsapp: 'https://wa.me/8613612993822',
  whatsappLabel: '+86 136 1299 3822',
};

export const services = [
  {
    id: 'ai-video-production', number: '01', title: 'AI Video Production',
    description: 'Product commercials, brand films, and short-form video for the way people watch today.',
    scope: ['AI product commercials', 'Social media video', 'Brand and campaign films'],
  },
  {
    id: 'cinematic-storytelling', number: '02', title: 'Cinematic Storytelling',
    description: 'An atmosphere, a character, a world. Stories shaped through cinematic images and motion.',
    scope: ['Cinematic AI trailers', 'AI short films', 'Story development and visual direction'],
  },
  {
    id: 'digital-creative-services', number: '03', title: 'Digital Creative Services',
    description: 'Thoughtful digital design, campaign visuals, and product imagery with a clear point of view.',
    scope: ['AI fashion campaigns', 'Digital and brand visuals', '3D product visualization'],
  },
] as const;
export type ServiceId = typeof services[number]['id'];

// Every ratio already exists in the original food wall. Media never chooses a size.
export const sizeRatios = {
  tall: '3 / 5', portrait: '5 / 8', standard: '4 / 5',
  square: '1 / 1', editorial: '3 / 4', landscape: '4 / 3',
} as const;
export const cardThemes = {
  olive: { background: '#27392e', color: '#faf9f6' },
  paper: { background: '#eee9df', color: '#27392e' },
  clay: { background: '#dcc5b5', color: '#27392e' },
  sage: { background: '#dbe1cf', color: '#27392e' },
  ink: { background: 'linear-gradient(145deg, #40483e, #2d342d)', color: '#faf9f6' },
} as const;
export interface CreativeCard {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  service: ServiceId;
  image?: string;
  imageAlt?: string;
  imageNote?: string;
  video?: string; // Reserved for an actual, licensed video; not a claim of completed work.
  link?: string;
  background: keyof typeof cardThemes;
  textColor?: string;
  textPosition?: 'bottom-left' | 'top-left' | 'center' | 'bottom-right';
  typeStyle?: 'serif' | 'sans';
  sizeVariant: keyof typeof sizeRatios;
  kind: 'Service direction' | 'Visual study' | 'Future exploration';
}
const studyNote = 'AI-generated still-image study from the original CookDance illustration library. This is not a commissioned campaign, a finished video, or evidence of client work.';
export const creativeCards: CreativeCard[] = [
  { id: 'ai-video-ads', title: 'AI Video\nProduction', subtitle: 'Ideas, brought to life.', category: 'AI video', service: 'ai-video-production', description: 'Explore an AI-assisted video direction for your brand, product, or next idea. Start with a brief; shape the story, images, and edit together.', background: 'olive', sizeVariant: 'tall', kind: 'Service direction' },
  { id: 'product-storytelling', title: 'Product\nStorytelling', subtitle: 'Light. Texture. Character.', category: 'Visual direction', service: 'digital-creative-services', description: 'A still-life study in light, material, and mood. An example of a visual language we could explore for a product story.', image: '/images/platform/citrus.webp', imageAlt: 'Sunlit glass, olive oil, lemon, and leaves in a warm still life', imageNote: studyNote, background: 'paper', sizeVariant: 'portrait', kind: 'Visual study' },
  { id: 'cinematic-stories', title: 'Cinematic\nStories', subtitle: 'A world worth entering.', category: 'Storytelling', service: 'cinematic-storytelling', description: 'Build a cinematic direction through a premise, visual references, a storyboard, and a considered approach to rhythm and sound.', background: 'paper', textPosition: 'center', sizeVariant: 'tall', kind: 'Service direction' },
  { id: 'ai-fashion', title: 'AI Fashion\nCampaigns', subtitle: 'A different point of view.', category: 'Fashion & identity', service: 'digital-creative-services', description: 'Explore a fashion campaign through art direction, image development, and coordinated digital assets. Product fidelity and image usage are agreed in the brief.', background: 'clay', textPosition: 'top-left', sizeVariant: 'tall', kind: 'Service direction' },
  { id: 'product-commercials', title: 'Made to\nbe seen.', subtitle: 'AI product commercials', category: 'AI video', service: 'ai-video-production', description: 'Turn a product message into a concise visual story for a launch, website, or social campaign. Deliverables and formats are scoped to the project.', background: 'sage', sizeVariant: 'standard', kind: 'Service direction' },
  { id: 'everyday-reimagined', title: 'Everyday,\nReimagined', subtitle: 'A study in atmosphere.', category: 'Lifestyle imagery', service: 'digital-creative-services', description: 'A quiet morning, observed through warm light and tactile detail. This image is a visual study for discussing tone and atmosphere.', image: '/images/platform/coffee.webp', imageAlt: 'Coffee in a ceramic cup and a croissant on a sunlit table', imageNote: studyNote, background: 'paper', sizeVariant: 'standard', kind: 'Visual study' },
  { id: 'cinematic-trailers', title: 'The art of\nanticipation.', subtitle: 'Cinematic AI trailers', category: 'Storytelling', service: 'cinematic-storytelling', description: 'Explore a trailer concept through mood, narrative tension, key images, and editing direction. A service direction, not a released film.', background: 'ink', sizeVariant: 'square', kind: 'Service direction' },
  { id: 'digital-design', title: 'Digital\nCreativity', subtitle: 'Clear ideas. Considered design.', category: 'Digital design', service: 'digital-creative-services', description: 'Bring visual consistency to a digital project through image direction, layouts, and brand assets designed around its purpose.', background: 'paper', typeStyle: 'sans', sizeVariant: 'square', kind: 'Service direction' },
  { id: 'short-films', title: 'Small films.\nOpen worlds.', subtitle: 'AI short films', category: 'Storytelling', service: 'cinematic-storytelling', description: 'Develop a short-film idea from a story premise into visual sequences. Scope, production approach, and revision stages are defined together.', background: 'clay', sizeVariant: 'standard', kind: 'Service direction' },
  { id: 'motion-design', title: 'Give an\nidea motion.', subtitle: 'Motion & storytelling', category: 'Motion design', service: 'ai-video-production', description: 'Use movement, pacing, and transitions to give an idea structure. Discuss a motion direction for a title sequence, product reveal, or campaign.', background: 'olive', textPosition: 'center', sizeVariant: 'standard', kind: 'Service direction' },
  { id: 'color-texture-story', title: 'Color. Texture.\nStory.', subtitle: 'An editorial visual study.', category: 'Art direction', service: 'digital-creative-services', description: 'A study of contrasting colors and textures drawn from everyday materials. A starting point for a conversation about a brand’s visual character.', image: '/images/platform/spices.webp', imageAlt: 'Small bowls of golden, red, and earthy spices on a textured table', imageNote: studyNote, background: 'clay', sizeVariant: 'square', kind: 'Visual study' },
  { id: 'product-visualization', title: 'Another\ndimension.', subtitle: '3D product visualization', category: 'Product imagery', service: 'digital-creative-services', description: 'Discuss form, materials, lighting, and viewpoints for product visualization. Required source assets, fidelity, and production method are scoped before work starts.', background: 'sage', sizeVariant: 'editorial', kind: 'Service direction' },
  { id: 'creative-technology', title: 'Creative\nTechnology', subtitle: 'Capability meets curiosity.', category: 'Digital creativity', service: 'digital-creative-services', description: 'Choose a creative workflow around the idea and its constraints. Tools serve the direction, with deliverables and review points agreed upfront.', background: 'ink', typeStyle: 'sans', sizeVariant: 'square', kind: 'Service direction' },
  { id: 'brand-visuals', title: 'A visual voice.', subtitle: 'Brand & campaign imagery', category: 'Visual identity', service: 'digital-creative-services', description: 'Explore a coherent visual language across a set of brand or campaign assets, from reference boards to final agreed formats.', background: 'paper', sizeVariant: 'landscape', kind: 'Service direction' },
  { id: 'social-video', title: 'A moment\nthat connects.', subtitle: 'Short-form social video', category: 'AI video', service: 'ai-video-production', description: 'Shape a focused message for short-form viewing. Aspect ratios, platform requirements, and delivery variants are agreed in the project brief.', background: 'clay', sizeVariant: 'standard', kind: 'Service direction' },
  { id: 'material-light', title: 'Material\n& Light', subtitle: 'The character of an object.', category: 'Visual direction', service: 'digital-creative-services', description: 'An illustrated study of texture, light, and familiar objects. It shows a possible visual mood, not a claim about a commercial commission.', image: '/images/platform/bread.webp', imageAlt: 'A rustic loaf, sliced bread, and butter in soft natural light', imageNote: studyNote, background: 'paper', sizeVariant: 'standard', kind: 'Visual study' },
  { id: 'visual-storytelling', title: 'Every frame,\na purpose.', subtitle: 'Visual storytelling', category: 'Storytelling', service: 'cinematic-storytelling', description: 'Connect individual images with a narrative purpose. Develop a visual outline that gives each scene a role in the wider story.', background: 'olive', sizeVariant: 'editorial', kind: 'Service direction' },
  { id: 'art-direction', title: 'A point of view.', subtitle: 'Creative & art direction', category: 'Digital design', service: 'digital-creative-services', description: 'Start with the feeling, audience, and intent. Build a creative direction that makes decisions about tone, composition, and consistency easier.', background: 'sage', sizeVariant: 'landscape', kind: 'Service direction' },
  { id: 'creative-automation', title: 'Room for\nwhat’s next.', subtitle: 'Creative automation', category: 'Future exploration', service: 'digital-creative-services', description: 'A future area of exploration for CookDance. An automation or software implementation is not offered as an established service in this first phase.', background: 'paper', sizeVariant: 'landscape', kind: 'Future exploration' },
  { id: 'dance-together', title: 'Cook for You.\nDance Together.', subtitle: 'Start with a conversation.', category: 'The CookDance idea', service: 'digital-creative-services', description: 'Cook stands for capability. Dance stands for vitality. We connect creative capability with the energy of ideas, working with people around the world.', background: 'ink', textPosition: 'center', sizeVariant: 'square', kind: 'Service direction', link: '/contact/' },
];

export function mediaSource(value?: string): string | undefined {
  const source = value?.trim();
  if (!source || /[\u0000-\u0020\\]/.test(source)) return undefined;
  if (/^\/images\/(?!.*\.\.)[a-zA-Z0-9_./-]+\.(avif|webp|png|jpe?g|gif|svg)$/i.test(source)) return source;
  try { const url = new URL(source); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
export function safeDestination(value?: string): string | undefined {
  if (!value) return undefined;
  if (/^\/(?!\/)/.test(value) && !/[\\\u0000-\u0020]/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
export function cardDestination(card: CreativeCard): string { return safeDestination(card.link) ?? `/work/${card.id}/`; }
export function cardColors(card: CreativeCard) {
  const theme = cardThemes[card.background] ?? cardThemes.paper;
  return { background: theme.background, color: /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(card.textColor ?? '') ? card.textColor! : theme.color };
}
export function cardRatio(card: Pick<CreativeCard, 'sizeVariant'>): string { return sizeRatios[card.sizeVariant] ?? sizeRatios.standard; }
export interface ProjectBrief { name: string; email: string; service: string; description: string; budget?: string; }
export function briefText(brief: ProjectBrief): string {
  return `Name: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\nService: ${brief.service}\nBudget: ${brief.budget?.trim() || 'To discuss'}\n\nProject description:\n${brief.description.trim()}`;
}
export function briefMailto(brief: ProjectBrief): string {
  return `mailto:${brand.email}?subject=${encodeURIComponent(`CookDance project — ${brief.service}`)}&body=${encodeURIComponent(briefText(brief))}`;
}
