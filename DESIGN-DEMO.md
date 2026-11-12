# CookDance · 图片优先的平台 Demo

在线演示：<https://cookdance.com/>

在线工作台原型：<https://cookdance.com/studio/>

这一视觉方案已通过现有 Cloudflare 流程接入正式首页 `/`；`src/pages/index.astro` 直接展示图片墙。工作台仍是浏览器原型；本次无需修改 DNS。

本地预览使用相同路径：`http://127.0.0.1:4321/` 与 `/studio/`。旧 `/preview/` 入口会跳转到正式路径。日常更新见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)，当前托管配置见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 这一版的方向

- 面向未来的全球美食内容平台，先让图片跨越语言，再让详情承接故事和知识。
- 首页只显示 Logo、品牌 slogan、搜索与收藏图标，以及美食图片墙。
- 首排以竖幅为主，其他图片使用竖幅、方形与横幅的有限组合。桌面 3—5 列，手机两列，图片依照最短列排列。
- 标题、摘要、地区、分类、阅读时间和正文放在详情页与搜索结果中。首页图片有文字描述和可访问名称。
- 品牌 slogan：**Cooking everything. Dancing anywhere.**（烹饪万物，随处起舞。）
- 品牌哲学：**Cooking is a philosophy.** 最初来自“Cook 其实是一种哲学”。

## 可以操作的内容

1. 点图片进入详情；使用右上角图标搜索食材、地区、工具或标题。
2. 图片上的书签可收藏，顶部书签打开收藏。收藏只保存在此浏览器。
3. 工作台可以新建、编辑、换封面、保存草稿、发布到本地原型。
4. 草稿不会显示在前台。修改已发布内容后，前台与详情会反映变化；已打开的其他标签页会刷新。
5. 首页编排可选择第一张图片。其余内容按内容库顺序展示，新建内容插入内容库前面。
6. 购买渠道支持 HTTPS 地址和联盟链接披露。链接显示在 Kitchen 内容详情，不显示在纯图首页。没有商店、订单、支付或预置商业合作。
7. 内容可以导出为 JSON；恢复初始内容需要连续点击两次，操作前可先导出备份。

**工作台目前是浏览器本地存储原型，不是真正上线的后台。** 换设备、换浏览器或清除网站数据不会同步内容；导出文件不会自动发布。演示素材库目前是封面下拉列表，尚未实现图片上传。

## 内容与素材的真实性

素材库包含 12 张为本次视觉方向生成的 AI 图片，以及现有和新增的 Pexels 摄影。生成图在对应详情页和工作台素材选项中说明；不表示实际烹饪、实地采访或测试成果。示例正文也明确说明未进行原创食谱、实验或产品测试。

图片采用 WebP，12 张生成图共约 2.66 MB。原 PNG 仅保留在本地 `design/platform-demo/originals/`，该目录不进入 Git；展示使用 `public/images/platform/` 内的压缩图片。

新增摄影来源：

- [Lisa Fotios / Pexels 1279330](https://www.pexels.com/photo/selective-focus-photography-of-pasta-with-tomato-and-basil-1279330/)
- [Ella Olsson / Pexels 1640777](https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/)

原有摄影来源见 [PHOTOGRAPHY.md](PHOTOGRAPHY.md)。生成图清单和 art direction 见 `design/platform-demo/ASSETS.md`。

## 文件边界

```text
src/demo/content.ts                 示例内容、图片库、分类与内容字段
src/demo/store.ts                   本地存储、字段检查、HTTPS 链接检查
src/demo/platform.ts                图片墙、搜索、收藏、详情展示
src/demo/studio.ts                  编辑、草稿、发布、首页排序、购买渠道
src/components/PlatformPin.astro    可复用的图片入口
src/layouts/PlatformLayout.astro    图片平台外壳
src/pages/index.astro               正式图片首页
src/pages/read.astro                图片详情
src/pages/studio.astro              工作台原型
src/styles/platform.css            本次 Demo 的视觉系统
design/platform-demo/              设计图、截图、对照与素材说明
```

正式首页允许索引，带 canonical 与社交分享信息。`/preview/`、`/read/`、`/studio/` 使用 `noindex, nofollow` 并排除在站点地图外。图片详情暂用 query 参数选择内容，后续接入独立静态 URL 与正式内容管理。

## 确定方向后的实施顺序

1. 把图片内容模型接入现有 Markdown/MDX 集合，以同一套数据生成首页图片入口和可索引的详情页。
2. 接入基于 Git 的轻量内容管理：上传图片、草稿预览、内容来源、测试状态、审核与发布。保存后由 GitHub 与 Cloudflare 的构建流程更新前台。
3. 把地区、食材、技法和工具关联作为内容字段；前台有实际需要时再增加筛选入口。
4. 购买链接作为可选详情模块；后续 Shopify 可使用独立商店域名或外链渠道。

## 已做的验证

Astro 类型检查与静态构建通过；浏览器验证了图片进入详情、搜索及无结果状态、收藏与刷新保留、编辑标题/封面、新建草稿、发布后出现、首页首图、购买链接与披露、恢复演示内容。手机图片墙和详情没有发现横向溢出。测试内容与测试链接已移除。

视觉对照与测试边界见项目根目录 `design-qa.md`。没有进行全站可访问性认证、真实食谱测试或正式后台部署。
