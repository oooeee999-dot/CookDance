# CookDance

**你的 Cook，大家的 Taste。**

一个从美食图片出发、逐步成长为全球美食内容平台的项目。首页让人发现美食；点进图片以后，再阅读故事、烹饪知识与重要说明。

| 想做什么 | 直接打开 |
| --- | --- |
| 看图片平台正式首页 | [cookdance.com](https://cookdance.com/) |
| 试内容工作台 | [cookdance.com/studio/](https://cookdance.com/studio/) |
| 看品牌理念与联系方式 | [cookdance.com/about/](https://cookdance.com/about/) |
| 学习更新内容、图片与链接 | [日常使用与更新](CONTENT-GUIDE.md) |
| 查看托管、域名与部署设置 | [部署说明](DEPLOYMENT.md) |

> **当前状态：图片版已替换正式首页，直接打开 `cookdance.com` 即可。旧 `/preview/` 入口会跳转到正式首页。演示工作台仍只修改当前浏览器，不会直接更新所有人的网站。**

## 我们为什么做 CookDance

最初的思想是：**“Cook 其实是一种哲学。”**

我们进一步讨论了 **“Cook 验证着 Taste”** 和 **“你的 Cook，大家的 Taste”**：烹饪是一种实践与表达，品尝带来交流与回应。CookDance 希望让不同语言、背景与文化的人，通过美食彼此发现。

- **首页先用图片邀请人进来。** 不先要求读懂一段品牌介绍，也不把所有分类塞进导航。
- **点进去以后，再把事情讲清楚。** 名称、故事、食材、做法、来源和重要说明属于详情内容。
- **品味来自取舍。** 简单的 Logo、克制的界面、清楚的阅读体验，让内容逐步生长。
- **内容要诚实。** AI 演示图明确说明；未经实际测试的食谱、烹饪实验或产品，不写成真实验证成果。
- **商业模块跟随内容。** 购买渠道先放在相关详情里，后续可以接入 Shopify 等店铺。

| 表达 | 用途与状态 |
| --- | --- |
| **Cooking is a philosophy.** | 最初的品牌哲学：“Cook 其实是一种哲学。” |
| **你的 Cook，大家的 Taste。** | 现在讨论的平台使命 |
| **Cook with love. Let life dance.** | 当前英文 slogan：“用爱烹饪，让生命起舞。” |
| Understand Food. Enjoy Cooking. | 早期品牌主张，保留作品牌发展记录 |

## 以后如何更新：看这条流程

```text
修改项目文件 → 本地检查 → Commit to main → Push origin → Cloudflare 自动构建并发布
```

1. 在 **GitHub Desktop** 选择本目录对应的 **CookDance** 仓库，分支为 `main`。
2. 编辑项目文件，在本地预览；运行 `npm run check` 和 `npm run build`，确认通过。
3. 在 Desktop 的 **Changes** 中检查改动，填写说明，然后 **Commit to main**。
4. 点击 **Push origin**。这一步才把本机提交送到 GitHub。
5. 等待自动检查与部署完成，再打开网站。GitHub 的 [Actions](https://github.com/oooeee999-dot/CookDance/actions) 看代码检查；Cloudflare 的 `cookdance` 项目看实际部署结果。

**Commit 只是本机保存版本；Push 才上传；Cloudflare 部署成功后，其他人才看到更新。** 不需要每次重传整个网站或重新配置域名。

## 工作台演示和真正发布的区别

| 操作 | 影响范围 |
| --- | --- |
| 工作台编辑、保存草稿、发布到本地演示 | 只保存在当前浏览器；不会修改 GitHub，也不会通知 Cloudflare |
| 工作台导出 JSON | 下载内容备份；目前没有自动导入或发布功能 |
| 修改代码中的内容并 Commit、Push | 提交到 GitHub，由 Cloudflare 发布给访问者 |
| 访问正式新版首页 | 直接打开 `https://cookdance.com/`；图片、详情、搜索和收藏均已接入 |

工作台可以试新建内容、换封面、草稿、首页首图和购买渠道。图片上传、正式登录、多人编辑、审核和共享发布尚未接入。具体操作见 [CONTENT-GUIDE.md](CONTENT-GUIDE.md)。

## 本地打开项目

当前工作目录：`C:\Users\Administrator\Documents\ChatGPT\个人网站建设\CookDance`。项目使用 Astro、TypeScript、Markdown/MDX，Node 版本见 `.node-version`。

Windows PowerShell：

```powershell
cd 'C:\Users\Administrator\Documents\ChatGPT\个人网站建设\CookDance'
npm ci
npm run dev
```

打开 Astro 打印的 Local 地址（通常是 `http://127.0.0.1:4321/`），就是当前图片首页。`npm ci` 用于首次准备或依赖变化后，平时启动只需 `npm run dev`。

推送前的检查：

```powershell
npm run check
npm run build
```

## 常用文件：改哪里

| 要修改的东西 | 文件 / 目录 |
| --- | --- |
| 新版的初始内容、封面库、内容顺序 | `src/demo/content.ts` |
| 新版 Logo 下的 slogan、页面外壳 | `src/layouts/PlatformLayout.astro` |
| 页脚的个人理念、邮箱与 WhatsApp | `src/components/SiteFooter.astro` |
| 新版图片入口组件 | `src/components/PlatformPin.astro` |
| 新版图片比例 | `coverRatio()`，位于 `src/demo/content.ts` |
| 新版间距、字体、响应式布局 | `src/styles/platform.css` |
| 首页、详情与工作台 | `src/pages/index.astro`、`read.astro`、`studio.astro` |
| 新版图片文件 | `public/images/platform/` |
| 现有正式文章（Markdown/MDX） | `src/content/articles/` |
| GitHub 自动检查 | `.github/workflows/ci.yml` |

## GitHub、Cloudflare、阿里云各做什么

| 服务 | 职责 |
| --- | --- |
| GitHub | 保存源代码与历史版本；Actions 自动检查，不再重复发布 GitHub Pages |
| Cloudflare Pages | 读取 `main` 分支，构建并托管网站 |
| Cloudflare DNS | 管理 `cookdance.com` 与 `www` 的解析、HTTPS 与跳转 |
| 阿里云 | 保留域名注册与续费 |

正式域名已经接入 Cloudflare。`cookdance.pages.dev` 是 Cloudflare 分配的备用访问地址，设置为不收录。旧 GitHub Pages 部署作为历史版本保留，本次未删除或改动其账户设置。详见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 当前边界与下一步

图片版已经用于正式网站。目前没有数据库、商城、用户登录、支付、AI 聊天或会员系统；内容工作台仍是浏览器原型。图片详情暂用查询参数选择示例内容，尚未承担正式文章的搜索收录。

下一步把图片内容模型接入正式 Markdown/MDX 与基于 Git 的轻量内容管理，让一次内容发布生成图片首页和独立详情 URL。之后根据实际内容增加食材、地区、技法关联和可选购买模块。

正式首页允许收录，并包含 canonical 与社交分享信息。示例详情 `/read/`、工作台 `/studio/` 和旧预览路径使用 `noindex, nofollow`，排除在站点地图外。`robots.txt`、站点地图和 Google 验证文件保留；Search Console 的账户操作需另外确认。

## 进一步查看

- [新版 Demo 结构与实现说明](DESIGN-DEMO.md)
- [设计检查与测试边界](design-qa.md)
- [生成素材说明](design/platform-demo/ASSETS.md)
- [真实摄影来源](PHOTOGRAPHY.md)

说明更新于 **2026-11-11**。
