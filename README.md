# CookDance

**Cook for You. Dance Together.**

Cook = Capability（能力），Dance = Vitality（生命力）。当前方向是面向全球客户的 AI 视频、电影感叙事和数字创意制作；长期连接中国的创造与制造能力。

> 当前版本：数字创意服务站，用户已确认发布。使用原 GitHub → Cloudflare Pages 自动更新流程；标准美食版已另行完整存档。

| 要做什么 | 入口 |
| --- | --- |
| 看正式首页 | https://cookdance.com/ |
| 查看创意方向 | https://cookdance.com/work/ |
| 查看新增的 13 类服务目录 | https://cookdance.com/services/ |
| 准备询盘 | https://cookdance.com/contact/ |
| 改品牌、服务与卡片 | `src/data/creative.ts` |
| 学习内容配置 | [CONTENT-GUIDE.md](CONTENT-GUIDE.md) |
| 不用 Codex，自己更新文字和图片 | [自己更新图文.md](自己更新图文.md) |
| 查看改造说明与验收 | [REMODEL-NOTES.md](REMODEL-NOTES.md) |
| 查看部署 | [DEPLOYMENT.md](DEPLOYMENT.md) |
| 找回标准美食版 | [GitHub 存档标签](https://github.com/oooeee999-dot/CookDance/tree/archive/cookdance-food-standard-2026-11-14) |

## 本地运行

2026-11-14 增补：原有 20 张创意卡片、图片、三个重点服务与旧链接全部保留。在原首页后方追加完整服务目录，并新增 13 类服务详情、分类预选询盘及按分类生成的 WhatsApp 草稿。分类内容位于 `src/data/service-catalog.ts`，不属于已接通的 CMS 后台。变更与图片来源见 [服务扩展交付说明](design/service-expansion/交付说明.md)。

Node.js 24.15.0，首次使用运行 `npm ci`，随后 `npm run dev`。终端显示本地预览地址。

```powershell
npm test
npm run check
npm run build
```

没有新增运行依赖，没有数据库或发送邮件的服务器。沿用 Astro + TypeScript、Markdown/MDX 和 Cloudflare Pages。

## 这次保留了什么

- 原 Logo、字体、近白底、深橄榄绿，以及图片墙的 20 个位置比例。
- 原最短列瀑布流：手机 2 列、平板 3 列、普通桌面 4 列、宽屏 5 列；间距 12/18px、圆角 6/8px。
- 所有旧图片和内容文件。旧美食地址作为历史内容保留，不进入新版导航和站点地图。

实际原代码没有持续自动滚动、循环复制节点或滚动速度参数。这次保留的是已有的瀑布流排列与重排机制，没有擅自添加跑马灯。

## 新版内容规则

首页混合图片卡片与文字卡片，使用同一个组件、比例和布局方法。标题在卡片内部；没有有效图片或图片加载失败时，自动使用对应尺寸的文字版。

`Work` 当前展示服务方向与内部视觉研究，没有客户案例、客户评价或已完成影片的虚构陈述。4 张旧 AI 静物图仅作为清楚标注的视觉研究，可通过配置替换。

询盘表单只在浏览器中准备邮件正文，不保存或自动发送。访客可以打开自己的邮件草稿，或复制内容发送；界面不会显示虚假的“已提交成功”。

## 美食版存档

本机另存目录：`个人网站建设/项目存档/CookDance-美食网站标准版-2026-11-14/`，包含源码目录、源码 ZIP、Git 历史 bundle、SHA256 校验和恢复说明。原版本提交为 `bc2237ed0cdb01eaea6bfa51b1101253a2bc3656`。

原美食内容工作台 `/studio/` 仍是原型，仅影响当前浏览器中的旧美食内容。它不是新版创意卡片的后台；新版卡片请修改 `src/data/creative.ts`。
