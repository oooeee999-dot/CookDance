# CookDance 新版内容配置

日常更新流程：修改内容配置 → 本地预览与检查 → Commit → Push 到原 GitHub 仓库 main 分支 → Cloudflare 自动更新正式网站。

**不用 Codex 的操作步骤见 [自己更新图文.md](自己更新图文.md)。GitHub Desktop 负责提交和同步，不是内容编辑器；当前还需要用文本编辑器改配置文件。**

## 日常入口

2026-11-16 新增 Journal 文章：在 `src/content/journal/` 中新增 Markdown 文件，正文与封面信息写在同一份文件里。已发布文章会按日期自动出现在首页和 Work 图片墙前方，并进入全站搜索与收藏；文章列表位于 `/journal/`。例如 `a-place-for-the-human-hand.md`。`draft: true` 的文章不会生成公开页面或进入这些入口。

文章页的标题、描述、日期、标签、图片、配图性质说明及卡片比例来自文件顶部的 frontmatter。可选 `enquiryService` 对应现有服务目录的分类 ID，`enquiryLabel` 设置文章底部的联系按钮文字。修改后仍需检查并提交、推送，Cloudflare 才会更新；这不是已经接通的可视化发布后台。

竖版作品可填写实际 `imageWidth` 和 `imageHeight`，阅读页会完整保留竖图比例。首页卡片比例仍由 `sizeVariant` 独立控制。同一天连续发布时，可在 `publishedDate` 写入含时区的时间，最新文章会排在前面。

需要在阅读页保留整张横版地图、截图等素材时，增加 `imageFit: contain`，图片会按实际宽高完整显示。省略此字段沿用原有封面样式；首页卡片仍按 `sizeVariant` 裁切预览。

主要编辑 `src/data/creative.ts`，品牌在 `brand`，三项主要服务在 `services`，展示卡片在 `creativeCards`。

新增卡片只需往数组加入一个对象。文件中的 TypeScript 类型会检查必填内容。修改后本地预览，再运行 `npm test`、`npm run check`、`npm run build`。

```typescript
{
  id: 'new-visual-idea',
  title: 'An idea,\nin motion.',
  subtitle: 'A short, useful subtitle.',
  category: 'Art direction',
  description: 'Describe the actual direction and its scope honestly.',
  service: 'digital-creative-services',
  // image: '/images/creative/my-image.webp',
  // imageAlt: 'Describe what is actually visible.',
  background: 'olive',
  textPosition: 'bottom-left',
  sizeVariant: 'standard',
  kind: 'Service direction',
}
```

## 有图、无图与断图

- 没有图片：省略 `image`，或留空；渲染文字卡片。
- 添加图片：把授权图片放到 `public/images/` 下，在数据里填写 `/images/...`，补上 `imageAlt` 和必要的 `imageNote`。
- 图片加载失败：浏览器移除坏图并显示原背景及文字，卡片宽高比、位置、链接保持不变。
- `image` 支持站内 `/images/` 文件或不含账户凭据的 HTTPS URL，拒绝脚本 URL 和空值。
- `video` 只预留字段；没有接入视频播放、视频生成或虚构的播放按钮。

是否有图只决定卡片表现，不决定尺寸。同一对象以后补图，不必再改组件。

## 可配置字段

| 字段 | 用途 |
| --- | --- |
| `id` | 唯一英文标识，只用小写字母、数字、短横线；也是详情页路径 |
| `title` | 主标题，使用 `\n` 主动换行；始终在卡片内部 |
| `subtitle` | 可选副标题；窄屏横卡会隐藏以保护标题阅读 |
| `category` | 简短类别 |
| `description` | 详情页说明与搜索内容 |
| `service` | 对应主服务：`ai-video-production`、`cinematic-storytelling`、`digital-creative-services` |
| `image` / `imageAlt` / `imageNote` | 可选图片、替代文字与来源/性质说明 |
| `background` | `olive`、`paper`、`clay`、`sage`、`ink`；背景用现有品牌色与中性色 |
| `textColor` | 可选十六进制颜色；默认搭配已为各背景配置 |
| `textPosition` | `bottom-left`、`top-left`、`center`、`bottom-right` |
| `typeStyle` | `serif`（默认）或 `sans`，沿用当前字体 |
| `sizeVariant` | 使用下表中的原版比例，独立于图片 |
| `kind` | `Service direction`、`Visual study`、`Future exploration` |
| `link` | 可选站内路径或 HTTPS 链接；默认进入 `/work/id/` 详情 |
| `video` | 预留视频地址，暂不自动播放 |

| sizeVariant | 原版比例（宽 / 高） |
| --- | --- |
| tall | 3 / 5 |
| portrait | 5 / 8 |
| standard | 4 / 5 |
| square | 1 / 1 |
| editorial | 3 / 4 |
| landscape | 4 / 3 |

卡片顺序就是配置数组顺序，原有最短列算法决定具体位置。新版最初 20 张卡片的比例序列与美食版一一对应。日常可以新增、删减和调整顺序，没有 20 张的数量限制；想保持原节奏时，替换内容并保留对应位置的 `sizeVariant`。

## 图片与案例的诚实说明

当前 4 张静物图来自原 CookDance 的 AI 生成素材库，标为 Visual study，详情说明并非客户委托、已完成广告或影片。所有原图都保留。

没有真实客户项目时，使用 Service direction。只有实际完成且取得公开授权后，才可另行建立客户案例字段与展示。不要直接把服务主题改写为已服务某品牌。

## 联系入口

邮箱和 WhatsApp 在 `brand` 中统一修改。`/contact/` 的表单不接后台，只生成邮件草稿链接与可复制正文；不会保存询盘，也不会替访客发送。

右上角导航的 Contact 后面有小型 WhatsApp 图标；手机也位于菜单的 Contact 后面。图标、联系页及页脚使用同一预填消息，内容在 `brand.whatsappMessage` 中修改。点击打开聊天草稿，访客自行发送。

后续如接入真实邮件服务，需要单独实现服务器端投递、错误处理和隐私说明；目前不要承诺已经接通。

## 新增的全类目服务目录

`src/data/service-catalog.ts` 管理原内容之外新增的 13 个服务分类。首页下方的分类卡片、`/services/` 目录、各分类详情、搜索入口和询盘选择都从这里读取。

修改对应条目的 `description`、`introduction`、`offerings`、`brief`、`scopeNote` 可更新英文内容。可选图片及比例仍沿用原图文卡片规则。新增插图位于 `public/images/services/`，原始大图保留在本机忽略目录，提示词保存在 `design/service-expansion/IMAGE-PROMPTS.json`。

旧创意卡片继续在 `src/data/creative.ts` 中管理；新的目录是追加内容，不会覆盖那 20 张卡片。当前没有把 Pages CMS 或旧工作台接入新目录。

## 旧工作台

`/studio/` 属于保留的美食版浏览器原型，不能编辑新版 `creativeCards` 或新服务目录。可视化内容后台尚未接入。
