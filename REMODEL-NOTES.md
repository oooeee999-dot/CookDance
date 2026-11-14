# CookDance 数字创意服务改造 · V1

日期：2026-11-14。任务原文保存在 `design/creative-upgrade/任务书-V1.0.md`。

**已完成本地验收并获得用户发布确认，使用现有 GitHub → Cloudflare Pages 流程发布。**

## 改造前检查

- Astro 7.4.5、TypeScript、Markdown/MDX；Node.js 24.15.0；Cloudflare Pages 静态发布。
- 首页为 `src/pages/index.astro`；原卡片为 `src/components/PlatformPin.astro`。
- 原最短列布局在 `src/demo/platform.ts`，通过绝对定位和 translate 放置卡片，由 ResizeObserver 在宽度变化时重排。
- 原代码没有自动滚动、无缝循环、复制节点或流动速度参数。这次保留已有的瀑布流机制，没有擅自新增跑马灯或变更动画方向。
- 桌面 4 列，1800px 起 5 列，1000px 以下 3 列，650px 以下 2 列。原间距桌面 18px、手机 12px，原圆角 8/6px。
- 原比例为 3:5、5:8、4:5、1:1、3:4、4:3；现有 20 个位置的比例顺序全部保留。
- 原 DM Sans / Georgia 字体、#faf9f6 近白底和 #27392e 深橄榄绿保留；未修改原 `platform.css`。
- 原内容位于 `src/demo/content.ts`，实际图片在 `public/images/`。无后端、无邮件投递服务；工作台仅用 localStorage。
- 修改前工作区干净。美食标准版已另存源码、ZIP、完整 Git bundle，并推送存档标签 `archive/cookdance-food-standard-2026-11-14`，对应 `bc2237e`。

## 主要修改文件

| 文件 | 改动 |
| --- | --- |
| `src/data/creative.ts` | 新品牌、三项服务、20 张统一卡片配置、原比例映射、背景主题、链接/媒体校验与询盘正文工具 |
| `src/components/PlatformPin.astro` | 原组件支持图片/文字两种表现、浮动标题、位置/颜色/字体配置；保留旧美食卡片兼容 |
| `src/lib/masonry.ts` | 抽出原最短列方法，原美食逻辑和新卡片共用；只增加隐藏收藏项的过滤 |
| `src/demo/platform.ts` | 改为引用共用布局方法，旧内容及存储键继续保留 |
| `src/styles/creative.css` | 在原样式基础上补充卡片文字、轻微 hover、导航、服务和联系布局；窄屏横卡优先保留标题 |
| `src/scripts/creative.ts` | 断图回退、搜索、独立的创意收藏、移动导航、询盘草稿与复制 |
| `src/layouts/PlatformLayout.astro` | 新 slogan、简洁导航、元信息；按页面动态加载新/旧脚本，避免旧食品数据覆盖新首页 |
| `src/components/SiteFooter.astro` | 新品牌理念和原个人联系方式 |
| `src/pages/index.astro` | 紧凑介绍、保留原比例的混合展示墙、三项服务、四步流程、Start a Project |
| `src/pages/work/index.astro`、`src/pages/work/[id].astro` | 服务方向与视觉研究列表、静态详情页和相关内容 |
| `src/pages/about.astro`、`src/pages/contact.astro` | 新品牌解释、真实邮件/WhatsApp 入口和本地询盘草稿 |
| `astro.config.mjs` | 旧美食地址与旧工作台不进入新版站点地图 |
| `tests/creative.test.mjs`、`package.json`、`.github/workflows/ci.yml` | 5 项配置/比例/资源/URL/邮件编码测试；无新增依赖 |
| `README.md`、`CONTENT-GUIDE.md`、`DESIGN-DEMO.md`、`DEPLOYMENT.md` | 当前状态、内容更新办法、历史版本与发布边界 |

## 作品与图片说明

当前为 16 张服务主题/文字卡片与 4 张图片卡片混排。4 张图片沿用原 AI 生成静物素材，明确标记 Visual study；详情标明非客户委托、非成片。其余服务方向不描述为已完成项目。

旧图片和美食内容没有删除。自动化只作为 Future exploration，不作为首阶段已经提供的成熟服务。

## 联系功能的实际边界

表单字段为 Name、Email、Service、Project Description、可选 Budget。来自服务入口时可预选服务。

必填验证通过后只在浏览器中准备正文，提供邮件草稿链接、复制按钮和可手动复制的文本。不会自动发送、保存询盘或声称提交成功；正式邮件后端仍未接入。

## 检查与测试

- `npm test`：5 项通过，覆盖原比例序列、缺图尺寸独立性、真实资源/服务配置、危险 URL/CSS 回退和邮件编码。
- `npm run check`：0 errors、0 warnings、0 hints。
- `npm run build`：静态构建成功，38 页，包含原历史地址和新创意详情页。
- 实际浏览器检查 320px / 390px 手机、768px 平板、1230px 普通桌面、1900px 宽屏；对应原 2/3/4/5 列。无横向溢出、无标题越界，桌面 20 张卡片无重叠。
- 20 个位置的实际宽高比序列与原美食版完全相同，间距仍为手机 12px / 其他 18px。
- 临时将一个有效图片地址改成不存在的资源，验证自动移除坏图、保留标题和原 5:8 尺寸；测试后已恢复正确资源。
- 已提供四种文字位置配置；图片浮动标题、手机菜单、服务锚点和服务预选经实际浏览器检查可用。
- 搜索 fashion 正确返回 AI Fashion Campaigns；收藏、仅显示已收藏、取消收藏和空状态正常。
- 卡片链接可通过键盘访问，并有可见焦点。减少动态偏好的媒体规则停用 hover 位移、缩放过渡和动画；无复制节点造成重复焦点。
- 询盘必填验证正确，正文保留 `&`、`+`、`%` 等字符；生成正确 mailto 和可复制正文。复制成功后仍明确说明未发送；实际检查没有发送邮件或 WhatsApp。
- 浏览器截图保存在本机被 Git 忽略的 `design/platform-demo/originals/creative-*.jpg`，包括桌面首页、服务、手机首页与详情、邮件草稿状态。
- 对 24 个新业务页面的站内静态链接检查通过；新 sitemap 未包含旧美食/原型地址。
- 本地验收时首页返回 HTTP 200 且显示新 slogan；验收阶段正式网站仍保留美食版，直到用户确认发布。

## 后续

补充更新：导航栏 Contact 后增加小型 WhatsApp 图标（手机在菜单同一行），并统一联系页及页脚的预填消息。消息表达看到 CookDance 理念后希望洽谈短剧制作；点击只打开草稿，访客自行发送。当前逻辑测试共 6 项，包含号码和预填消息的编码校验。

1. 用户先看本地首页、创意卡片及询盘页，再决定是否调整文案或素材。
2. 有真实作品且取得授权后，替换配置中的研究图片并补充真实作品内容。
3. 如需要真正持续自动滚动，应另行确认动效方向与行为；当前原版没有该机制。
4. 用户已确认本次发布。后续更新同样先检查，再 Commit / Push，并复核 Cloudflare 部署及正式域名。
5. 真正的在线询盘投递、视频播放或内容后台均可按实际需求单独接入，不在本轮假装完成。
