export const sections = ['Learn', 'Recipes', 'Taste Lab', 'Kitchen', 'Stories'] as const;
export type Section = typeof sections[number];
export interface Story {
  id: string;
  title: string;
  description: string;
  section: Section;
  category: string;
  image: string;
  imageAlt: string;
  body: string;
  status: 'published' | 'draft';
  region?: string;
}
export const covers = [
  { src: '/images/platform/tomato-pasta.jpg', name: 'Tomato & basil pasta', alt: 'Pasta with tomatoes, basil and grated cheese' },
  { src: '/images/platform/seasonal-table.jpg', name: 'The seasonal table', alt: 'An overhead view of a colorful vegetable salad' },
  { src: '/images/prep.jpg', name: 'In the kitchen', alt: 'A home cook preparing fresh vegetables at a cutting board' },
  { src: '/images/knife.jpg', name: 'Knife skills', alt: 'Hands slicing vegetables with a kitchen knife' },
  { src: '/images/hero.jpg', name: 'Everyday ingredients', alt: 'Fresh herbs, tomatoes and bread on a kitchen worktop' },
  { src: '/images/pasta.jpg', name: 'At the table', alt: 'A plate of pasta on a dark stone table' },
  { src: '/images/platform/mezze.webp', name: 'A shared table · AI concept', alt: 'A table of hummus, flatbread, olives and fresh vegetables' },
  { src: '/images/platform/noodles.webp', name: 'A bowl of noodles · AI concept', alt: 'Chopsticks lifting noodles from a steaming ceramic bowl' },
  { src: '/images/platform/dumplings.webp', name: 'Folding dumplings · AI concept', alt: 'Hands folding a dumpling on a flour-dusted board' },
  { src: '/images/platform/roasted-carrots.webp', name: 'Roasted carrots · AI concept', alt: 'Golden roasted carrots with herbs on a dark ceramic plate' },
  { src: '/images/platform/tacos.webp', name: 'Around the table · AI concept', alt: 'Tacos with colorful vegetables, herbs and fresh lime' },
  { src: '/images/platform/bread.webp', name: 'Bread & butter · AI concept', alt: 'A sliced rustic loaf of bread with a small dish of butter' },
  { src: '/images/platform/citrus.webp', name: 'Citrus & olive oil · AI concept', alt: 'Fresh lemons, green leaves and a glass of olive oil in sunlight' },
  { src: '/images/platform/rice-table.webp', name: 'An everyday rice table · AI concept', alt: 'Rice, soup and small plates of vegetables on a wooden table' },
  { src: '/images/platform/spices.webp', name: 'The spice shelf · AI concept', alt: 'Small bowls of golden, red and earthy spices on a rustic table' },
  { src: '/images/platform/soup.webp', name: 'A bowl of soup · AI concept', alt: 'Golden soup in an earthen bowl with seeds and fresh herbs' },
  { src: '/images/platform/vegetables.webp', name: 'Seasonal vegetables · AI concept', alt: 'Roasted seasonal vegetables arranged on a ceramic plate' },
  { src: '/images/platform/coffee.webp', name: 'A quiet morning · AI concept', alt: 'A croissant and a cup of coffee on a small ceramic plate' },
];
const editorialStories: Story[] = [
  {
    id: 'a-great-plate-of-pasta', title: 'The little things behind a great plate of pasta.',
    description: 'A closer look at texture, timing, and bringing everything together. Good cooking is in the details.',
    section: 'Learn', category: 'Everyday cooking', image: covers[0].src, imageAlt: covers[0].alt, status: 'published',
    body: `There is something quietly satisfying about a good plate of pasta. A handful of familiar ingredients comes together into something that feels complete. The interesting part is often the attention you give those ingredients.

This is a guide to thinking about pasta, rather than a tested recipe. Use it as a set of questions to bring to the stove alongside a recipe you trust.

## Start with the result you want
Think about the relationship between the pasta and its sauce. A light dressing, a chunky vegetable sauce, and a slow-cooked ragù each ask something different of the shape you choose. Look for a combination that makes sense on the fork, rather than a rule you have to memorize.

## Taste for texture
A timer is a helpful reminder to check. Tasting tells you what is happening. Notice the difference between the surface and the center, and think about whether the pasta will spend more time cooking in its sauce. Follow the guidance for the particular pasta you are using.

## Bring the parts together
Think of sauce and pasta as one dish. Before serving, take a moment to notice how they meet: does the sauce cling, pool, or disappear? Small adjustments to moisture and mixing can change the way the whole plate feels. Make one adjustment at a time so you can understand its effect.

## Finish with attention
Taste again before adding a final flourish. What does the dish need? Perhaps a little brightness, a fresh herb, or simply a warm plate and someone to share it with. Learning to ask that question is a skill that travels well beyond pasta.`,
  },
  {
    id: 'understanding-heat', title: 'Learn to read the heat.',
    description: 'Listen to the sizzle. Watch the steam. Find a little more confidence at the stove.',
    section: 'Learn', category: 'The fundamentals', image: covers[2].src, imageAlt: covers[2].alt, status: 'published',
    body: `Great cooking is often less about following a timer and more about noticing what is happening in front of you. Heat changes texture, drives off moisture, and creates new aromas. Learning to read those changes makes a recipe more useful.

## Start with the sound
When food touches a hot pan, listen. A steady sizzle suggests moisture is leaving the surface. If the sound disappears and ingredients sit in a pool of liquid, the pan may be crowded. The sound is a clue to investigate, rather than proof that the food is ready.

## Give yourself room to notice
Read your recipe before beginning and prepare what you need. With fewer things competing for attention, it becomes easier to see how the food changes. Watch for steam, the movement of oil, and changes in color. Keep the pan and heat source in mind when following preheating instructions.

## Choose the result you want
Higher heat can encourage browning when the surface is relatively dry. Gentler heat gives you more control for delicate foods and longer cooking. The useful question is: what texture and flavor are you trying to build?

## A habit to practice
Next time you cook vegetables using a familiar recipe, notice the sound, steam, and color. Write down what changed when you adjusted the heat. This is a practice prompt, not a report of a CookDance-tested experiment.`,
  },
  {
    id: 'seasoning-in-layers', title: 'Taste as you go. Find your balance.',
    description: 'How paying attention throughout cooking can make the last bite as good as the first.',
    section: 'Learn', category: 'Flavor & seasoning', image: covers[1].src, imageAlt: covers[1].alt, status: 'published',
    body: `Seasoning is a conversation with the food in front of you. Rather than hoping one final adjustment will do everything, make space to notice how a dish develops. Your own preferences are part of that conversation.

## Taste with a question
Before changing anything, ask what you are noticing. Does the dish seem flat, rich, sharp, or simply unfinished? Naming the impression helps you choose your next step. Taste only ingredients that are safe and ready to eat, using a clean spoon each time.

## Change one thing
Make a small adjustment, mix, and taste again. Adding several ingredients at once makes it harder to understand what helped. Follow a reliable recipe as your starting point and learn from the difference between one taste and the next.

## Think about the whole plate
A sauce may taste different on its own than it does with the food it accompanies. Taste the combination before deciding it needs more seasoning. Consider texture and temperature alongside flavor.

## Leave yourself a note
The most useful cooking notes are often simple: what you noticed, what you changed, and whether you preferred the result. Over time, those small observations become a vocabulary you can use in any kitchen.`,
  },
  {
    id: 'choosing-a-knife', title: 'One good knife. A very good place to start.',
    description: 'Comfort, balance, and care: what matters before the brand name.',
    section: 'Kitchen', category: 'Buying thoughtfully', image: covers[3].src, imageAlt: covers[3].alt, status: 'published',
    body: `An everyday knife should feel predictable in your hand. The best choice for one cook may feel awkward to another, so begin with comfort and control. A thoughtful purchase starts with understanding your own habits.

## Hold it before you decide
Where possible, handle the knife safely before buying. Notice the handle shape, weight, and balance. Can you grip it securely without strain? Consider the food you prepare and the room you have on your board.

## Buy for your actual kitchen
A tool that fits a professional kitchen may not fit your space or routines. Think about the ingredients you prepare most often. One versatile knife is a sensible starting point for many home kitchens; specialized tools can follow a specific need.

## Make care part of the decision
Read the maker’s guidance for washing, sharpening, and storage. A stable board and safe storage matter alongside the blade itself. Choose a maintenance routine that you can realistically keep.

## Choose with purpose
Compare the things you can describe: comfort, control, care requirements, and cost. This article is a general buying framework, not a hands-on product review or a tested ranking of brands.`,
  },
  {
    id: 'why-browning-matters', title: 'There is a reason golden tastes so good.',
    description: 'An everyday introduction to the changes we see, smell, and taste as food browns.',
    section: 'Taste Lab', category: 'The why behind the how', image: covers[5].src, imageAlt: covers[5].alt, status: 'published',
    body: `Color is one of the most immediate things we notice as food cooks. A pale surface takes on gold, then deeper shades, while its aroma changes. Paying attention to those changes gives us another way to understand a recipe.

## Notice more than color
Browning is connected to changes in flavor and aroma, but color alone does not tell the whole story. Different ingredients brown in different ways. Notice smell, texture, and the instructions in the recipe alongside what you can see.

## Think about moisture
Surface moisture influences what happens in a pan. Food that releases water may behave differently from food with a drier surface. Rather than automatically turning the heat up, look at how much food is in the pan and what your recipe is asking you to achieve.

## Make a useful observation
If you want to learn, change just one variable while following safe cooking guidance. Record what you did and what you noticed. A single observation is a starting point for more questions, rather than a universal conclusion.

## Keep the claim as small as the evidence
This is an introductory editorial note. CookDance has not conducted or documented an original experiment for this article. Future Taste Lab experiments should include their method, observations, and limitations.`,
  },
  {
    id: 'a-more-curious-kitchen', title: 'A more curious kitchen starts with a question.',
    description: 'What happens when we make a little space for observation in everyday cooking?',
    section: 'Stories', category: 'The way we cook', image: covers[4].src, imageAlt: covers[4].alt, status: 'published',
    body: `A recipe can tell us what to do. Curiosity gives us a reason to pay attention while we do it. That small shift can make an ordinary weeknight meal feel less like a task and more like something we are learning to understand.

## Let the familiar be interesting
You do not need an unfamiliar ingredient to notice something new. Start with something you already cook. What changes first? Which part asks for the most attention? What do you look forward to tasting?

## Keep a kitchen notebook
A few lines are enough. Write down the dish, one thing you noticed, and a question for next time. A notebook can hold practical reminders alongside memories of who was at the table and what made the evening feel good.

## Leave room for your own preferences
Learning a technique does not mean everyone must enjoy the same result. Knowing what you like, and being able to describe it, is part of becoming a more confident cook.

## Cooking is a philosophy
For CookDance, that means approaching food with attention, care, and a willingness to keep learning. The philosophy lives in everyday decisions: what to choose, how to use it, and how to share what we make.`,
  },
  {
    id: 'your-kitchen-before-another-pan', title: 'Before another pan, a better question.',
    description: 'Build a useful kitchen around the food you actually like to cook.',
    section: 'Kitchen', category: 'Everyday essentials', image: covers[4].src, imageAlt: covers[4].alt, status: 'published',
    body: `A well-equipped kitchen is personal. It reflects the food you make, the space you have, and the routines you enjoy. Before adding something new, take a moment to understand the tools already within reach.

## Begin with a task
What do you want to do that your current equipment makes difficult? Be specific. A clear task helps you compare tools on useful terms and may reveal that a change in technique is worth exploring first.

## Make the practical checks
Look at the manufacturer’s guidance for heat-source compatibility, care, and storage. Think about weight when the pan is full, handle comfort, and whether it fits the way you cook.

## Leave room on the shelf
Storage is part of usability. Something you can reach and care for easily is more likely to become part of your routine. Consider whether a new purchase replaces a tool or solves a separate need.

## A framework, rather than a ranking
This guide does not recommend a tested product or name a winning brand. It offers questions to help you make a deliberate choice. Any future product recommendation should state how it was assessed and disclose commercial links.`,
  },
  {
    id: 'cook-with-what-you-have', title: 'A good dinner might already be in your kitchen.',
    description: 'A gentler way to think about ingredients, leftovers, and the everyday table.',
    section: 'Stories', category: 'Everyday rituals', image: covers[1].src, imageAlt: covers[1].alt, status: 'published',
    body: `Some meals begin with a shopping list. Others begin by opening the fridge and looking closely. Cooking with what you have can be an invitation to understand ingredients and your own preferences a little better.

## Look before you plan
Take stock of what is available and suitable to use, following reliable storage and food-safety guidance. Separate the question of what you have from the question of what you feel like eating. The overlap is a useful place to begin.

## Think in roles
Instead of searching for an exact dish immediately, think about what each ingredient could contribute: substance, freshness, texture, or a finishing note. A familiar recipe can help you see those roles more clearly.

## Use a trusted starting point
Substitution is easier to understand when you know the original dish. Make a small change to a recipe you know well, keeping any safety-critical instructions intact. Notice how the result differs rather than expecting it to be identical.

## Remember the table
A meal does not have to be elaborate to be worth your attention. Sometimes the most useful kitchen skill is recognizing when you have enough, putting it on a plate, and enjoying it.`,
  },
];
const photoIdeas = [
  [6, 'the-shared-table', 'The simple pleasure of a shared table.', 'A few dishes in the middle. A little more time together.', 'Mediterranean-inspired', 'Stories', 'Around the table'],
  [7, 'a-bowl-of-noodles', 'A whole world in a bowl of noodles.', 'Texture, warmth, and the small details that make a meal feel complete.', 'East Asian-inspired', 'Stories', 'Food & culture'],
  [8, 'one-fold-at-a-time', 'Good things happen one fold at a time.', 'A closer look at the attention and repetition behind making food by hand.', 'Across cultures', 'Learn', 'Kitchen rituals'],
  [9, 'the-character-of-carrots', 'An ordinary ingredient, a little more closely.', 'Color, texture, and a different way to look at the vegetables we know.', 'Everyday ingredients', 'Learn', 'Ingredient notes'],
  [10, 'a-place-for-everyone', 'Make a little room at the table.', 'Good food invites us to gather, share, and try something new.', 'Mexican-inspired', 'Stories', 'Around the table'],
  [12, 'a-little-brightness', 'A little brightness in the kitchen.', 'Citrus, fresh herbs, and the pleasure of paying attention.', 'Everyday ingredients', 'Learn', 'Flavor & seasoning'],
  [13, 'the-everyday-table', 'The quiet beauty of an everyday meal.', 'A bowl, a few small dishes, and a moment to enjoy what is in front of you.', 'Japanese-inspired', 'Stories', 'Everyday rituals'],
  [11, 'bread-and-butter', 'Bread, butter, and a reason to slow down.', 'There is room for something simple at a thoughtful table.', 'Across cultures', 'Stories', 'Everyday rituals'],
  [14, 'follow-a-spice', 'Follow your curiosity, one spice at a time.', 'A little attention to aroma can open a new way of thinking about food.', 'Across cultures', 'Learn', 'Ingredient notes'],
  [15, 'a-bowl-for-a-quiet-day', 'A bowl for a quieter day.', 'Comfort is sometimes a texture, a temperature, and a familiar ritual.', 'Across cultures', 'Stories', 'Everyday rituals'],
  [16, 'a-season-on-a-plate', 'A season, on a plate.', 'Look at the ingredients first. Let the idea of dinner follow.', 'Seasonal inspiration', 'Learn', 'Everyday cooking'],
  [17, 'the-morning-pause', 'The pleasure of a small morning pause.', 'A cup, a pastry, and a moment before the day begins.', 'Everyday rituals', 'Stories', 'Life around food'],
] as const;
const photoStories: Story[] = photoIdeas.map(([index, id, title, description, region, section, category]) => ({
  id, title, description, region, section, category, image: covers[index].src, imageAlt: covers[index].alt, status: 'published',
  body: `${description} Food is something we notice with more than words: color, shape, texture, and the feeling of a table prepared with care. An image can be a starting point for curiosity, even before we know the name of a dish.\n\n## Look a little closer\nWhat catches your attention first? Perhaps the contrast of colors, the way ingredients sit together, or a texture you would like to understand. Start with what you can actually see, and let that guide your next question.\n\n## The idea behind the image\nThis visual concept is an invitation to explore ${region.toLowerCase()} food and everyday kitchen life. It is not a documented traditional recipe, a report from a particular place, or a record of a cooked and tested dish. The photograph is AI-generated for this design preview.\n\n## Make room for the story\nA future CookDance feature can bring an image together with its maker, cultural context, ingredient notes, and a documented method. Those details deserve the same attention as the photograph. For this demo, we are exploring the experience of discovering and reading.\n\n## Cooking is a philosophy\nYour cooking is an expression. Taste is a response. The space between them is where we learn, share, and begin to understand one another. Keep your curiosity close, and leave room at the table for a different point of view.`,
}));
export const stories: Story[] = [
  ...photoStories.slice(0, 5), editorialStories[0], editorialStories[2],
  photoStories[5], photoStories[6], photoStories[7], photoStories[8],
  editorialStories[3], photoStories[9], editorialStories[5], photoStories[10], photoStories[11],
  editorialStories[1], editorialStories[4], editorialStories[6], editorialStories[7],
];
export function coverRatio(image: string) {
  if (image.endsWith('mezze.webp') || image.endsWith('dumplings.webp') || image.endsWith('roasted-carrots.webp')) return '3 / 5';
  if (image.endsWith('noodles.webp')) return '5 / 8';
  if (image.endsWith('seasonal-table.jpg')) return '1 / 1';
  if (image.endsWith('tomato-pasta.jpg')) return '4 / 5';
  if (image.endsWith('/prep.jpg') || image.endsWith('/knife.jpg')) return '3 / 4';
  if (image.endsWith('/pasta.jpg') || image.endsWith('/hero.jpg')) return '4 / 3';
  if (image.endsWith('citrus.webp') || image.endsWith('soup.webp') || image.endsWith('spices.webp')) return '1 / 1';
  return '4 / 5';
}
export const aiImage = (image: string) => image.endsWith('.webp');
export interface Channel { id: string; label: string; url: string; affiliate: boolean; }
export interface DemoState {
  version: 1;
  stories: Story[];
  home: { featured: string; topics: boolean; kitchen: boolean };
  channels: Channel[];
}
export const initialState: DemoState = {
  version: 1, stories,
  home: { featured: stories[0].id, topics: true, kitchen: true },
  channels: [],
};
export const storyHref = (id: string) => `${import.meta.env.BASE_URL}read/?story=${encodeURIComponent(id)}`;
export const demoHref = (path = '') => `${import.meta.env.BASE_URL}${path}`;
export function readingTime(body: string) { return Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 180)); }
export function bodyParts(body: string) {
  return body.split(/\n\s*\n/).flatMap(block => {
    if (!block.startsWith('## ')) return [{ type: 'paragraph' as const, text: block }];
    const [heading, ...rest] = block.split('\n');
    return [{ type: 'heading' as const, text: heading.slice(3) }, ...(rest.join('\n').trim() ? [{ type: 'paragraph' as const, text: rest.join('\n').trim() }] : [])];
  }).map((part, index) => ({ ...part, id: `part-${index}` }));
}
