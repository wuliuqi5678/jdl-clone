# 京东物流复刻站 · 分层架构说明

本文件是 `layered-dev` 插件登记的架构契约。项目按 **结构层 → 表现层 → 逻辑层** 的顺序构建；完成后按 400 行文件粒度再次重构，所有手写 JS/CSS 均不超过 400 行。

## 一、三层架构

| 层级 | 模块 | 职责 | 文件范围 |
| --- | --- | --- | --- |
| 结构层 | `structure-shell` | 共享顶栏、页脚、悬浮工具、移动抽屉、弹窗、搜索与报价骨架 | `partials/**` |
| 结构层 | `structure-pages` | 34 个静态 HTML 页面及生成产物 | `*.html` |
| 结构层 | `structure-tools` | 页面生成入口、`tools/lib` 构建器、搜索索引、静态/公网审计 | `tools/**` |
| 结构层 | `structure-assets` | 图片、图标、视频、搜索索引、18 张验收截图 | `assets/**`、`screenshots/**` |
| 结构层 | `structure-docs` | README、测试报告、架构、参考备份、交付包 | `*.md`、`reference/**`、`*.zip` |
| 表现层 | `presentation-core` | 设计令牌、基础/导航/业务区/弹窗/响应式样式；入口只做 @import | `css/style.css`、`css/core/**` |
| 表现层 | `presentation-pages` | 二级/三级页面样式；入口只做 @import | `css/pages.css`、`css/page/**` |
| 表现层 | `presentation-features` | 搜索、报价、新闻、文章、网站地图样式 | `css/features/**` |
| 逻辑层 | `logic-app` | 前端入口与页面装配 | `js/app.js` |
| 逻辑层 | `logic-core` | DOM、转义、Toast、滚动锁、弹窗焦点管理 | `js/core/**` |
| 逻辑层 | `logic-shell` | 导航、Mega Menu、抽屉、语言、弹窗、共享表单、子页导航 | `js/shell/**` |
| 逻辑层 | `logic-features` | 全站搜索、运费估算、新闻检索分页、文章工具 | `js/features/**` |
| 逻辑层 | `logic-pages` | 首页组合根与 6 个首页模块、关于、联系 | `js/pages/**` |
| 逻辑层 | `logic-legacy` | 迁移期旧脚本；已删除，模块保留为迁移记录 | `js/main.js`、`js/pages.js`（已移除） |

## 二、400 行文件粒度

| 文件 | 重构方式 | 最大文件 |
| --- | --- | --- |
| `css/style.css`（4679 行） | 31 行 entry + `css/core/01…27` | 382 行 |
| `css/pages.css`（4202 行） | 25 行 entry + `css/page/01…21` | 380 行 |
| `js/pages/home.js`（536 行） | 2 行 barrel + `pages/home/*` 7 模块 | 160 行 |
| `tools/build-pages.js`（1141 行） | 28 行入口 + `tools/lib/*` 8 模块 | 257 行 |

- CSS 拆分保持原始 section 顺序；入口只允许 `@import`。
- 生成型 HTML、`tools/page-data.js` 数据、Markdown 文档、二进制 assets 按规则豁免。
- 入口文件只做装配：`app.js` 调用 init；CSS entry 只 import；页面生成入口只调用 builder。

## 三、页面与结构约定

- 根目录 HTML 是可直接静态托管的最终结构产物。
- 共享结构统一维护在 `partials/`，生成器读取并注入每个页面；首页由 `tools/sync-index-shell.js` 同步。
- 页面分三类：`index.html`、生成型二级/三级页、13 个 `news-*.html` 详情页。
- 公共结构入口：
  - 搜索：`data-search-open`、`#searchModal`、`assets/data/search-index.json`
  - 报价：`data-quote-open`、`#quoteModal`
  - 新闻：`#newsSearchInput`、`#newsYear`、`#newsPagination`
  - 文章：`#readingProgress`、`#articleReadingTime`、`data-copy-link` 等
  - 网站地图：`sitemap.html`
- 全站 **34 页 / 263 个部署文件 / 310 个源文件**，唯一模块入口为 `js/app.js`。

## 四、逻辑层启动顺序

```text
initNavigation()
initOverlays()
initForms()
initPageNav()
initSearch()
initQuote()
initNews()
initArticle()
initHome() → initHero / initServices / initIndustries / initCounters / initReveal
initAbout()
initContact()
```

- `core` 不依赖其他层。
- `shell` 依赖 `core`；`overlays` 复用 `navigation` 的抽屉/语言关闭函数。
- `features` 依赖 `core` 与 `shell/navigation`，复用统一弹窗系统。
- `pages` 依赖 `core`；`home.js` 仅 re-export `home/index.js`。
- 每个 controller 有 `initialized` 保护。

## 五、构建与验证流水线

```bash
cd jdl-clone

node tools/build-pages.js
node tools/build-pages.js --dry-run
node tools/sync-index-shell.js
node tools/build-search-index.js
node tools/audit-static.js
node tools/check-links.js
node tools/find-unused-assets.js
node tools/audit-public.js
```

`tools/build-pages.js` 的 33 个生成页由 `tools/lib` 下的 page-shell、service/product/industry、hubs、news、company、contact、ESG、sitemap builder 组成；dry-run 用于验证顺序和数量。

当前公网地址：

**https://wuliuqi5678.github.io/jdl-clone/**

## 六、分层开发规则

1. 先 `layered_plan` 声明一个模块、精确文件列表和验证方式。
2. 只修改计划列出的文件；生成器批量产物在计划中声明范围。
3. 改完立刻 `layered_verify`；失败则留在本模块修复。
4. 结构层完成后进入表现层，再到逻辑层。
5. 已完成层可返工，但必须重新登记计划和验证。

## 七、验收结果摘要

- 结构层：34 页、生成器拆分、18 截图、文档完成。
- 表现层：3 模块；55 份 CSS（7 顶层 + 48 拆分），全部 <=400 行。
- 逻辑层：6 模块；21 个 JS，全部 <=400 行，legacy 已删除。
- 自动化：68 次页面/视口加载、144 次响应式检查、85 个 axe 扫描场景均通过。
- 公网：263 / 263 个文件 HTTP 200。
- 交付：`jdl-clone-site.zip` 与 `jdl-clone-source.zip`。
