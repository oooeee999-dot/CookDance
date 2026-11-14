# CookDance 部署与域名

> 2026-11-14：用户已确认将数字创意服务版发布到现有正式域名，使用 main 分支 Push 触发 Cloudflare 部署。本次未修改 DNS、Cloudflare 项目或域名设置；标准美食版已完整存档。

新版内容入口为 `src/data/creative.ts`；新增 `/work/`、创意方向详情和 `/contact/`。旧美食地址仍保留为历史内容，设置 noindex 并从 sitemap 排除。测试命令增加 `npm test`，Node.js 版本继续使用 `.node-version`。

## 当前结构

```text
本机 CookDance 文件夹
  → Commit + Push origin
GitHub：oooeee999-dot/CookDance，main 分支
  → Cloudflare Git 集成自动构建
Cloudflare Pages：cookdance
  → https://cookdance.com/
```

| 入口 | 用途 |
| --- | --- |
| [cookdance.com](https://cookdance.com/) | 图片平台正式首页 |
| [cookdance.com/read/](https://cookdance.com/read/) | 图片详情（通过 story 参数选择内容） |
| [cookdance.com/studio/](https://cookdance.com/studio/) | 当前浏览器内的工作台原型 |
| [cookdance.pages.dev](https://cookdance.pages.dev/) | Cloudflare 分配的备用域名；设置为不收录 |

GitHub 保存代码，Cloudflare Pages 正式托管，Cloudflare 管理 DNS，域名注册和续费仍在阿里云。当前无需数据库、服务器适配器或商城服务。

## 自动检查与实际发布

- `.github/workflows/ci.yml` 在 `main` 的 Push、Pull Request 和手动触发时执行安装、类型检查与构建，仅有读取代码权限。
- Cloudflare 独立监听 GitHub 的 `main` 分支；它的构建命令包含检查，构建成功后才发布。
- 本次将旧的 GitHub Pages 发布工作流整理为 CI，避免重复向两处发布。旧 Pages 部署与账户设置保留，未删除。
- GitHub 检查成功与 Cloudflare 部署成功是两项状态。正式网址由 Cloudflare 的部署决定。

| Cloudflare 设置 | 值 |
| --- | --- |
| 项目 | `cookdance` |
| 源码仓库 | `oooeee999-dot/CookDance` |
| 生产分支 | `main` |
| 框架 | Astro |
| 根目录 | 留空，使用仓库根目录 |
| 构建命令 | `npm run check && npm run build` |
| 输出目录 | `dist` |
| Node | `.node-version` 中的 `24.15.0` |

检查入口：[GitHub Actions](https://github.com/oooeee999-dot/CookDance/actions) 与 [Cloudflare Dashboard](https://dash.cloudflare.com/) 中的 **Workers & Pages → cookdance → 部署**。

## 域名记录：留档即可，日常更新不需要再改

阿里云的名称服务器已改为：

```text
jaxson.ns.cloudflare.com
nora.ns.cloudflare.com
```

Cloudflare Pages 已关联两个自定义域，均启用 SSL：

| 类型 | 名称 | 目标 |
| --- | --- | --- |
| CNAME | `@` | `cookdance.pages.dev` |
| CNAME | `www` | `cookdance.pages.dev` |

Cloudflare 负责根域 CNAME 展平，公网查询可能返回 Cloudflare 的 A / AAAA 地址，属于正常现象。名称服务器接入后，解析记录在 Cloudflare 管理；阿里云继续用于注册、续费等域名持有操作。

## www 跳转规则

域名级单一重定向，把 www 入口统一为不带 www 的 HTTPS 地址：

```text
规则：WWW to cookdance.com
请求 URL：http*://www.cookdance.com/*
目标 URL：https://cookdance.com/${2}
状态码：301
保留查询字符串：开启
```

第一个通配符匹配协议差异，第二个保留路径。例如：

```text
http://www.cookdance.com/?view=saved
→ https://cookdance.com/?view=saved
```

## 搜索收录与验证文件

- 正式站 `public/robots.txt` 允许抓取，并指向 `https://cookdance.com/sitemap-index.xml`。
- Astro sitemap 集成在构建时生成站点地图。
- 正式首页允许索引。旧 `/preview/` 路径、示例详情 `/read/` 与工作台 `/studio/` 使用 `noindex, nofollow`，并从 sitemap 中排除。
- `public/_redirects` 将旧预览入口跳转到 `/`、`/read/` 与 `/studio/`，遵循 [Cloudflare Pages 的重定向配置](https://developers.cloudflare.com/pages/configuration/redirects/)。
- `public/_headers` 仅给 Pages 的测试 / 备用域名设置 `X-Robots-Tag: noindex`，不为正式域名根页面设置该标头。
- **保留 `public/google909bcdc3666f354b.html`。** Astro 会把 public 文件复制到构建输出根目录，供 Google 访问。
- Search Console 所有权验证、提交 `sitemap-index.xml` 和 Google 实际收录是不同环节；文件上线本身不表示这些账户步骤已经完成。

## 发布失败时

先检查 Cloudflare 对应提交的构建日志和 GitHub Actions 的错误。修复后再次 Commit、Push；无需重新建立项目、购买服务或重配 DNS。不要把 `node_modules`、`dist`、`.astro`、密钥文件或生成图原始大文件作为发布源码提交。

图片版已替换 `/`，详情、工作台、栏目和关于页也使用新的品牌外壳。下一步继续完善统一内容模型、每篇内容的独立静态 URL、素材来源字段和正式内容管理；这些不影响当前图片首页正常访问。

配置说明更新于 **2026-11-11**。
