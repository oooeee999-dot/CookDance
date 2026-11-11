# CookDance 日常使用与更新

## 先区分：看演示，还是更新所有人的网站

| 你想做的事 | 这样操作 |
| --- | --- |
| 看新版效果 | 打开 [图片首页](https://cookdance.com/preview/)，点图片看详情 |
| 试内容编辑流程 | 打开 [演示工作台](https://cookdance.com/preview/studio/) |
| 更新所有人看到的内容 | 修改项目文件 → 检查 → Commit → Push origin → 等 Cloudflare 发布 |

**工作台里的“发布到本地演示”不是正式网站发布。** 它保存在当前浏览器里；电脑、手机、其他浏览器之间不会共享，也不会写回 GitHub。不要把它当作唯一的内容备份。

## 1. 用图片首页浏览

- 点图片：打开文字与图片详情。
- 右上角放大镜：搜索食材、地区、工具、标题或正文关键词。
- 图片上的书签：保存 / 取消保存。
- 顶部书签：查看这个浏览器中收藏的内容。
- 点 Logo：返回图片首页。

首页不显示标题、摘要、分类和阅读时间。文字留在详情、搜索结果、图片描述和辅助阅读信息里。

## 2. 在工作台试一条内容

1. 进入 **内容库 → 新建内容**，或者选择一条内容的 **编辑**。
2. 填标题、介绍、正文。正文用 `## 小标题`，段落之间空一行。
3. 从素材库选封面，填内容类型、分类、地区 / 风味线索。
4. 点 **保存草稿**：不出现在前台。
5. 点 **发布到本地演示**：这个浏览器的首页与详情可以看到它。
6. 点 **查看前台**，或回到图片首页检查结果。

标题虽然不直接显示在首页，但用于详情、搜索与可访问名称，仍然需要认真写。封面下拉列表里的 `AI concept` 表示演示生成图；当前还不能在工作台上传新照片。

**首页编排**可以选择第一张图片。新内容放进内容库前面；首图设置优先于普通内容顺序。

## 3. 备份本机演示内容

在 **首页编排 → 导出内容 JSON** 中下载备份。文件包含内容、图片关联、首页设置和购买渠道，**不包含图片文件本身**，也不会自动发布或自动导入项目。

“恢复演示初始内容”需要点两次，会清除当前浏览器的内容修改，恢复网站随代码提供的示例数据。需要保留修改时先导出。它不清除收藏，也不修改其他人的浏览器。

线上域名和 `127.0.0.1` 的浏览器存储相互独立；在本地演示工作台里做的修改，不会因为 Push 就出现在正式域名的演示中。

## 4. 真正更新新版的初始内容

新版内容目前位于 `src/demo/content.ts`，是独立于旧版文章的示例数据。

- `covers`：封面文件路径、素材名称、图片描述。
- `photoIdeas`：生成图对应的示例故事；第一个数字是 `covers` 中的图片索引，从 0 开始。
- `editorialStories`：较完整的知识类示例正文。
- `stories`：最终展示的内容集合与基础顺序。
- `initialState.home.featured`：首次打开时的首图。

可以在 `stories` 集合中加入这样的内容对象（示例路径使用当前已有图片）：

```ts
{
  id: 'a-small-kitchen-note',
  title: 'A small kitchen note.',
  description: 'One useful thing to notice next time you cook.',
  section: 'Learn',
  category: 'Everyday cooking',
  region: 'Across cultures',
  image: '/images/platform/seasonal-table.jpg',
  imageAlt: 'An overhead view of a colorful vegetable salad',
  status: 'published',
  body: `Start the story here.

## A useful observation

Explain the idea and name its source or limitations.`,
}
```

`id` 必须唯一，使用小写英文字母、数字与连字符。`status` 使用 `published` 或 `draft`。内容类型使用 `Learn`、`Recipes`、`Taste Lab`、`Kitchen` 或 `Stories`。

如果换成一张新照片：

1. 将图片放到 `public/images/platform/`，例如 `a-new-dish.webp`。
2. 在 `covers` 中添加它的路径和真实描述。路径写 `/images/platform/a-new-dish.webp`，不要把 `public` 写进网址。
3. 在内容对象的 `image` 中使用同一条路径；补上图片描述和正文。
4. 按需调整 `coverRatio()`：目前提供 3:5、5:8、4:5、3:4、1:1 和 4:3 的有限比例，检查主体有没有被裁掉。
5. 运行本地预览、检查、构建，再 Commit 和 Push。

素材来源需要登记。当前生成图的识别依据是 `aiImage()` 中的 `.webp` 约定，这是演示阶段的简化实现；新增真实 WebP 摄影时应同时把来源与 AI 标识改成明确字段，避免被误标。正式图片上传与来源管理留待内容后台接入。

## 5. 更新现有正式文章

现有文章在 `src/content/articles/`，支持 `.md` 和 `.mdx`。复制现有文章结构，填写 `title`、`description`、`section`、`category`、`tags`、`image`、`imageAlt`、`readTime` 等字段，再写正文。

设置 `draft: true` 不会发布到现有文章列表。检查无误后再改为 `false` 并提交。

**两套内容目前没有自动打通：** 编辑 `src/content/articles/` 更新旧版文章；编辑 `src/demo/content.ts` 更新新版演示。下一阶段将统一内容模型，避免维护两套数据。

## 6. 购买渠道怎么用

演示工作台的 **购买渠道**可以添加名称和 HTTPS 链接，勾选是否为联盟 / 佣金链接。链接会出现在 `Kitchen` 类型内容的详情页；首页保持图片浏览。联盟链接有披露说明。

目前这些设置同样只保存在当前浏览器。正式站的渠道数据、每篇内容关联的工具和 Shopify 外链，将在内容管理接入时持久化。不要填写账号、密码、API key 或其他私密资料。

## 7. 使用 GitHub Desktop 发布文件修改

1. 仓库选择 **CookDance**，分支选择 `main`。
2. 点击 **Fetch origin** 查看远端；如果提示 **Pull origin**，先拉取已有更新。
3. 在 **Changes** 中检查本次修改，避免带入无关文件。
4. 填写 Summary，例如 `Add a new cooking story`，点击 **Commit to main**。
5. 点击 **Push origin**。
6. 等 [GitHub Actions](https://github.com/oooeee999-dot/CookDance/actions) 检查通过，并在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 的 `cookdance` 项目确认新部署成功。
7. 打开对应网址查看。仅在本机 Commit 而没有 Push，线上不会更新。

本地 PowerShell 检查命令：

```powershell
cd 'C:\Users\Administrator\Documents\ChatGPT\个人网站建设\CookDance'
npm run check
npm run build
```

两项都通过再发布。依赖没变时，不用每次 `npm install` 或 `npm ci`。

## 8. 常见情况

| 看到的情况 | 先检查 |
| --- | --- |
| 已 Commit，网站没更新 | Desktop 是否还有 **Push origin** 没点？ |
| 已 Push，网站还没变化 | Cloudflare 新部署是否完成；是否打开了正确路径？新版是 `/preview/` |
| 只有一个浏览器显示旧内容 | 可能存在工作台本地覆盖；先导出备份，再恢复演示初始内容，或用未编辑过的浏览器查看 |
| 工作台改了，手机没有变化 | 这是浏览器本地原型，不是共享后台 |
| 图片无法显示 | 文件是否存在；路径有没有错误地包含 `public`；是否加入了封面库？ |
| 部署报错 | 先看 Actions / Cloudflare 构建日志，修复后再 Push，不必重配域名 |
| `.pages.dev` 不被搜索收录 | 这是预期设置；正式内容的 canonical 和 sitemap 使用 `cookdance.com` |

## 内容发布底线

AI 图要标明用途；摄影、文字与引用要有来源。未实际测试的食谱、实验和产品，不能描述为 CookDance 的真实测试结果。演示素材不要冒充原创实拍、地方传统的考证结论或已完成的商业合作。
