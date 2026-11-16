import type { DisplayCard } from './creative';

export interface ServiceCategory {
  id: string;
  title: string;
  cardTitle: string;
  tagline: string;
  description: string;
  introduction: string;
  offerings: { title: string; description: string }[];
  brief: string[];
  scopeNote: string;
  example: string;
  related: string[];
  background: DisplayCard['background'];
  sizeVariant: DisplayCard['sizeVariant'];
  image?: string;
  imageAlt?: string;
}
export const conceptImageNote = 'AI-generated concept illustration. It does not depict a client commission, a real CookDance workplace, or a completed project.';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'graphics-design', title: 'Graphics & Design', cardTitle: 'Graphics\n& Design', tagline: 'Give an idea a visual identity.',
    description: 'Brand identity, packaging, digital graphics, and 3D design shaped around your creative brief.',
    introduction: 'A new brand, a product launch, or a more coherent visual language. Bring us the idea and the context. We’ll shape the design direction with you and work through the details, from early concepts to the files you need for launch.',
    offerings: [
      {title:'Brand identity',description:'Logo exploration, typography, color, and a practical set of brand assets shaped around your audience.'},
      {title:'Packaging & product concepts',description:'Packaging layouts, mockups, and product-design concepts, with dimensions and production requirements discussed upfront.'},
      {title:'Illustration, digital & 3D assets',description:'Hand-drawn illustration, campaign graphics, ecommerce visuals, and 3D assets shaped around the project. Technique, formats, and usage rights are agreed together.'},
      {title:'Wedding & anniversary keepsakes',description:'Personalized couple portraits and illustrated story maps featuring meaningful places, pets, and milestones. Drawing technique, digital files, physical originals, and any printing or framing are agreed before work begins.'},
    ],
    brief:['Brand background and audience','References and existing brand files','Dimensions, formats, and intended uses','Launch date and revision expectations'],
    scopeNote:'Concept design, production-ready artwork, and manufacturing support are different scopes. We confirm what the project includes, along with source-file handover and usage rights.',
    example:'A coordinated identity, packaging mockup, and product-image set for an upcoming independent brand.',
    related:['photography-retouching','video-animation','ai-services'],background:'paper',sizeVariant:'tall',image:'/images/services/brand-design.webp',imageAlt:'An unbranded olive glass bottle, sculptural ivory carton, and textured paper swatches',
  },
  {
    id:'digital-marketing',title:'Digital Marketing',cardTitle:'Digital\nMarketing',tagline:'Connect the message and the audience.',
    description:'Search content, campaign creative, and social media support for brands reaching audiences across markets.',
    introduction:'Start with the audience you want to reach and the action you want them to take. We’ll develop the content, creative, and practical support your campaign needs, with a clear plan for the channels, deliverables, and measures of progress.',
    offerings:[
      {title:'Search & website content',description:'Content briefs, landing-page copy, and practical on-page improvements aligned with the actual service or product.'},
      {title:'Campaign creative',description:'Visual and copy variations for agreed advertising channels, with clear formats and a consistent message.'},
      {title:'Social media support',description:'Content planning, asset preparation, and publishing support, scoped around the platforms and languages you use.'},
    ],
    brief:['Target countries, languages, and audience','Product, offer, and existing website','Channels and available account access','Objectives, timeline, and production or media budget'],
    scopeNote:'Creative production, campaign management, and advertising spend are scoped separately. We do not promise search positions, sales, or a fixed advertising return.',
    example:'A launch content plan with product copy and a coordinated set of social and advertising assets.',
    related:['writing-localization','data-analytics','graphics-design'],background:'sage',sizeVariant:'standard',
  },
  {
    id:'writing-localization',title:'Writing & Localization',cardTitle:'Writing\n& Translation',tagline:'Clear words, across borders.',
    description:'Copywriting, translation, and localization for product pages, brands, scripts, and international communication.',
    introduction:'Good writing makes the intent clear. Good localization makes it feel at home in the intended market. We work with your source material, tone, and audience to create language that carries the right meaning, with careful review before delivery.',
    offerings:[
      {title:'Brand & product copy',description:'Website copy, product descriptions, campaign messages, and editorial writing with a defined purpose and voice.'},
      {title:'Translation & localization',description:'Content adapted for agreed language pairs and markets, with terminology and review responsibilities set in the brief.'},
      {title:'Scripts & subtitles',description:'Script development, subtitle text, and language adaptation for video and audio projects.'},
    ],
    brief:['Source text and approximate volume','Target language, market, and audience','Tone, terminology, and reference materials','Required review standard and delivery format'],
    scopeNote:'Language pairs, specialist knowledge, and final proofreading are confirmed for each project. Certified or regulated translations require a specifically agreed delivery arrangement.',
    example:'Product descriptions and an introductory video script localized for an international storefront.',
    related:['digital-marketing','video-animation','business-support'],background:'paper',sizeVariant:'standard',
  },
  {
    id:'video-animation',title:'Video & Animation',cardTitle:'Video\n& Animation',tagline:'Find the story in the brief.',
    description:'Product commercials, short-form dramas, animation, trailers, and editing for international creative projects.',
    introduction:'A product reveal, an episodic short drama, or a film that introduces a new idea. Our original focus on AI video and cinematic storytelling continues here, alongside broader animation and post-production support. We agree the production approach around the story, budget, and intended viewing experience.',
    offerings:[
      {title:'Commercials & brand films',description:'Product messages, social edits, and brand stories developed for the agreed audience and channels.'},
      {title:'Short dramas & cinematic stories',description:'Story development, visual direction, AI-assisted sequences, and editing for scoped narrative projects.'},
      {title:'Animation & post-production',description:'Motion graphics, animation, compositing, and edits prepared for agreed formats and delivery requirements.'},
    ],
    brief:['Idea, script, or reference films','Audience, platform, duration, and aspect ratio','Available footage, product assets, and brand materials','Sound, subtitles, rights, timeline, and budget'],
    scopeNote:'Live action, animation, AI-generated imagery, and post-production involve different workflows. We confirm the method, revision stages, and asset rights before starting.',
    example:'A short-form drama pilot, or a product film with coordinated vertical and landscape edits.',
    related:['music-audio','graphics-design','ai-services'],background:'olive',sizeVariant:'tall',
  },
  {
    id:'music-audio',title:'Music & Audio',cardTitle:'Music\n& Audio',tagline:'The part you feel before you see.',
    description:'Voiceover, sound design, music production, and audio post-production for your project.',
    introduction:'Sound sets the pace and changes how a story feels. From a spoken introduction to the sound world of a short film, we work with you on the right voice, texture, and rhythm. Performance, licensing, and final audio formats are considered from the start.',
    offerings:[
      {title:'Voiceover & spoken content',description:'Voice direction and recording support for commercials, explainers, narration, and agreed language needs.'},
      {title:'Music & sound design',description:'Original or appropriately licensed music approaches, sound effects, and sonic ideas for creative projects.'},
      {title:'Editing & mixing',description:'Dialogue cleanup, podcast editing, and audio mixes prepared to the agreed technical requirements.'},
    ],
    brief:['Script or picture reference','Language, voice, and performance direction','Duration and technical file requirements','Usage territories, platforms, and licensing expectations'],
    scopeNote:'Voice consent, music rights, and permitted uses are agreed in the project. Human performance and AI-assisted audio are identified rather than presented interchangeably.',
    example:'Narration, a music approach, and a finished sound mix for a short product film.',
    related:['video-animation','writing-localization','learning-hobbies'],background:'ink',sizeVariant:'portrait',image:'/images/services/music-audio.webp',imageAlt:'A studio microphone and pop shield in warm light against olive acoustic fabric',
  },
  {
    id:'programming-tech',title:'Programming & Tech',cardTitle:'Web, Apps\n& Technology',tagline:'Useful ideas, made functional.',
    description:'Websites, applications, integrations, and technical development built around practical business requirements.',
    introduction:'Bring a problem, a workflow, or a product idea. We’ll turn it into a practical development plan and work through the design, build, testing, and handover. Together, we define what the software should do and what support you’ll need after delivery.',
    offerings:[
      {title:'Websites & web applications',description:'Business websites, content platforms, and tailored web tools developed against an agreed feature list.'},
      {title:'Apps & integrations',description:'Application development, API integrations, and connections between existing business systems.'},
      {title:'Technical improvements',description:'Maintenance, performance work, and workflow automation scoped after reviewing the current environment.'},
    ],
    brief:['Problem, users, and essential features','Current website, systems, and technical constraints','Design references and integrations','Ownership, hosting, support, timeline, and budget'],
    scopeNote:'Source-code access, hosting costs, third-party subscriptions, acceptance checks, and ongoing maintenance are defined in the project scope.',
    example:'A service website with an editable content workflow, or a small tool that connects two existing systems.',
    related:['ai-services','data-analytics','business-support'],background:'paper',sizeVariant:'tall',image:'/images/services/web-technology.webp',imageAlt:'An unbranded laptop showing an abstract olive and ivory web layout on a quiet desk',
  },
  {
    id:'ai-services',title:'AI Services',cardTitle:'AI, applied\nwith purpose.',tagline:'Start with the use, then the tools.',
    description:'AI-assisted creative production, prototypes, and workflow development focused on a clear use case.',
    introduction:'AI can be part of a creative process or a technical workflow. We start with the outcome you need and discuss where AI is appropriate, what inputs are available, and how the result will be reviewed. This category connects related work across design, video, writing, and development.',
    offerings:[
      {title:'AI creative production',description:'Image development, video concepts, and coordinated creative assets with the generated nature of material made clear.'},
      {title:'Workflow prototypes',description:'Scoped experiments and proof-of-concept workflows to explore whether an AI-assisted approach is useful.'},
      {title:'AI-enabled integrations',description:'Technical project scoping for connecting models, knowledge sources, or existing applications.'},
    ],
    brief:['Use case and desired outcome','Available inputs, data, and permissions','Quality criteria and human review needs','Systems, model costs, timeline, and deployment expectations'],
    scopeNote:'We do not present a concept as a proven production system. Feasibility, data handling, external tool costs, and review requirements are established for the specific project.',
    example:'An AI-assisted product-visual workflow or a prototype for organizing an internal knowledge collection.',
    related:['video-animation','programming-tech','graphics-design'],background:'olive',sizeVariant:'tall',
  },
  {
    id:'data-analytics',title:'Data & Analytics',cardTitle:'Data\n& Analytics',tagline:'Make information useful.',
    description:'Data preparation, analysis, reporting, dashboards, and visualization for clearly defined business questions.',
    introduction:'Useful analysis begins with a question. We work from the data you have towards reports, dashboards, and visualizations you can use. Clear definitions, documented assumptions, and an understandable handover help make the result practical.',
    offerings:[
      {title:'Data preparation',description:'Cleaning, organizing, and combining agreed datasets into a documented, usable structure.'},
      {title:'Reports & dashboards',description:'Recurring reports, spreadsheet models, and dashboard views tailored to an agreed set of measures.'},
      {title:'Analysis & visualization',description:'Exploratory analysis and understandable charts that communicate findings and their limitations.'},
    ],
    brief:['Business question and intended audience','Sample data, definitions, and source formats','Required metrics and reporting frequency','Data permissions, delivery tools, and timeline'],
    scopeNote:'Results depend on the quality and coverage of the available data. Data access, assumptions, and the limits of any analysis are documented rather than hidden.',
    example:'A repeatable sales-reporting workbook and dashboard built from existing ecommerce exports.',
    related:['programming-tech','business-support','finance-bookkeeping'],background:'sage',sizeVariant:'standard',
  },
  {
    id:'business-support',title:'Business Support',cardTitle:'Business\nSupport',tagline:'Room to focus on the next step.',
    description:'Ecommerce operations, research, documentation, and practical project support for overseas businesses.',
    introduction:'Growing a business creates work beyond the core product. From product catalogs to research and documentation, we help move those tasks forward with an agreed workflow, clear updates, and a useful handover.',
    offerings:[
      {title:'Ecommerce support',description:'Product-information preparation, catalog maintenance, and store-operation tasks with clear access and approval boundaries.'},
      {title:'Business research',description:'Structured desk research, information gathering, and comparison documents around a defined question.'},
      {title:'Documentation & coordination',description:'Process documentation, presentation preparation, and administrative project support.'},
    ],
    brief:['Tasks, current workflow, and desired result','Platforms, templates, and available materials','Frequency, volume, and approval process','Access requirements, timezone, and delivery expectations'],
    scopeNote:'We agree which decisions remain with you and which tasks the project team will carry out. Sensitive account access and ongoing operational work require a specific arrangement.',
    example:'Preparing and organizing a product catalog for an international ecommerce launch.',
    related:['digital-marketing','strategy-consulting','finance-bookkeeping'],background:'paper',sizeVariant:'standard',
  },
  {
    id:'strategy-consulting',title:'Strategy & Consulting',cardTitle:'Strategy\n& Consulting',tagline:'A clearer view of the decision.',
    description:'Business, brand, and project consulting focused on your market, questions, and next decision.',
    introduction:'Start with the decision you need to make. We’ll clarify the questions, examine the available evidence, and work towards a useful recommendation. The subject, expected output, and any specialist requirements are agreed before work begins.',
    offerings:[
      {title:'Business & market questions',description:'Project scoping for market research, business planning, and an informed assessment of options.'},
      {title:'Brand & communication strategy',description:'Audience, positioning, and communication direction to guide subsequent creative work.'},
      {title:'Specialist project input',description:'A structured route to discuss a specific challenge and establish the expertise required.'},
    ],
    brief:['Decision or challenge to address','Relevant business context and market','Existing research and constraints','Expected deliverable and specialist requirements'],
    scopeNote:'Consulting is scoped to a defined subject and market. We confirm the delivery team’s relevant background and do not assume that general business support replaces regulated professional advice.',
    example:'A market-entry research brief with a defined set of questions, evidence sources, and decision criteria.',
    related:['business-support','data-analytics','finance-bookkeeping'],background:'ink',sizeVariant:'tall',
  },
  {
    id:'photography-retouching',title:'Photography & Retouching',cardTitle:'Photography\n& Retouching',tagline:'Objects, seen with intention.',
    description:'Product photography, image retouching, and ecommerce image preparation for your brand.',
    introduction:'A useful product image makes form, detail, and character easy to understand. We’ll work with you on the shot list, visual direction, retouching, and final image formats. Physical photography and AI-generated concepts are clearly identified so you know how each image is made.',
    offerings:[
      {title:'Product photography',description:'Shot planning and photography for products, materials, details, and agreed lifestyle settings.'},
      {title:'Retouching & preparation',description:'Background work, color adjustments, cleanup, and exports prepared for the intended channels.'},
      {title:'Coordinated image sets',description:'Consistent product and campaign images shaped around a shot list and reference direction.'},
    ],
    brief:['Product references, quantities, and shot list','Physical sample availability and shipping needs','Style references, color accuracy, and fidelity requirements','Image dimensions, channels, and usage rights'],
    scopeNote:'Sample handling, shooting location, retouching scope, and image rights are agreed before production. Concept illustrations are not presented as photographs of a real product shoot.',
    example:'A consistent set of main images, detail photographs, and lifestyle visuals for a new product range.',
    related:['graphics-design','digital-marketing','video-animation'],background:'clay',sizeVariant:'standard',
  },
  {
    id:'finance-bookkeeping',title:'Finance & Bookkeeping',cardTitle:'Finance\n& Bookkeeping',tagline:'Clear records. Defined responsibilities.',
    description:'Bookkeeping support, financial-report preparation, and analysis scoped to the relevant market and requirements.',
    introduction:'Tell us which records or reporting tasks need attention and where the business operates. We’ll agree a clear plan for organizing the information and preparing the required output. Applicable professional requirements, data handling, and final review are clarified before work begins.',
    offerings:[
      {title:'Bookkeeping support',description:'Record organization and agreed bookkeeping tasks based on the systems and review process you use.'},
      {title:'Reporting preparation',description:'Spreadsheet reports, reconciliations, and management-information preparation within a defined scope.'},
      {title:'Financial analysis support',description:'Analysis of supplied business figures, with documented assumptions and a clear explanation of limitations.'},
    ],
    brief:['Business location and reporting context','Required task and current accounting system','Sample records and data-access arrangements','Professional requirements and final reviewer'],
    scopeNote:'Country-specific accounting rules, filing responsibilities, and any licensing or qualification requirements must be confirmed. This page is a service introduction, not financial, tax, investment, or legal advice.',
    example:'Organizing transaction exports and preparing a monthly management-report workbook for review.',
    related:['business-support','data-analytics','strategy-consulting'],background:'sage',sizeVariant:'tall',
  },
  {
    id:'learning-hobbies',title:'Learning & Hobbies',cardTitle:'Learning\n& Hobbies',tagline:'Curiosity, with a little direction.',
    description:'Subject-specific lessons, creative learning, and hobby support matched to your goals and preferred format.',
    introduction:'A creative skill, a new tool, or a subject you want to explore. Tell us your starting point and what you’d like to achieve. We’ll work with you on a practical learning plan, with the subject, instructor, language, and session format agreed in advance.',
    offerings:[
      {title:'Creative skills',description:'Project-based introductions to areas such as design, storytelling, image-making, and audio production.'},
      {title:'Tools & practical workflows',description:'Guided sessions around a specific software tool or a clearly defined practical task.'},
      {title:'Hobby learning',description:'Subject-specific lessons or guidance, matched to the topic and the learner’s starting point.'},
    ],
    brief:['Subject and what you want to achieve','Current level and example interests','Preferred language, session format, and schedule','Instructor requirements and expected learning materials'],
    scopeNote:'The subject, instructor background, session availability, and learning objectives are confirmed in advance. Sessions are shaped around your starting point and goals.',
    example:'A short series of guided sessions to develop a first storyboard or learn an image-editing workflow.',
    related:['music-audio','writing-localization','programming-tech'],background:'clay',sizeVariant:'standard',
  },
];

export const catalogCards: DisplayCard[] = serviceCategories.map(category => ({
  id:`category-${category.id}`,title:category.cardTitle,subtitle:category.tagline,
  category:'Services',description:`${category.title}. ${category.description} ${category.offerings.map(item => item.title).join('. ')}`,
  background:category.background,sizeVariant:category.sizeVariant,kind:'Service direction',
  image:category.image,imageAlt:category.imageAlt,imageNote:category.image ? conceptImageNote : undefined,
  textPosition:'bottom-left',link:`/services/${category.id}/`,
}));
export const categoryHref = (id: string) => `/services/${id}/`;
export function categoryWhatsAppUrl(category: ServiceCategory, baseUrl: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set('text',`Hi! I found CookDance and would like to discuss a ${category.title} project. Could we talk about the scope and next steps?`);
  return url.href;
}
