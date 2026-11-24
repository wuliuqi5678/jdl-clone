# 京东物流复刻站 · 分层架构说明

本文件是 `layered-dev` 插件登记的架构契约。项目按 **结构层 → 表现层 → 逻辑层** 的顺序构建，所有代码改动均先登记模块与计划，再修改文件，最后记录验证结果。

## 一、三层架构

| 层级 | 模块 | 职责 | 文件范围 |
| --- | --- | --- | --- |
| 结构层 | `structure-shell` | 共享顶栏、页脚、悬浮工具、移动抽屉、弹窗、搜索与报价骨架 | `partials/**` |
| 结构层 | `structure-pages` | 34 个静态 HTML 页面及生成产物 | `*.html` |
| 结构层 | `structure-tools` | 页面生成、shell 同步、搜索索引生成、静态检查、公网爬取 | `tools/**` |
| 结构层 | `structure-assets` | 图片、图标、视频、搜索索引 JSON、验收截图 | `assets/**`、`screenshots/**` |
| 结构层 | `structure-docs` | README、测试报告、架构文档、参考备份、交付包 | `README.md`、`测试报告.md`、`ARCHITECTURE.md`、`reference/**`、`提交说明.md`、`*.zip` |
| 表现层 | `presentation-core` | 首页与共享组件样式、设计令牌、全局隐藏归一化 | `css/style.css` |
| 表现层 | `presentation-pages` | 二级/三级页面样式；已完成公共色值令牌化 | `css/pages.css` |
| 表现层 | `presentation-features` | 搜索、报价、新闻、文章、网站地图样式模块 | `css/features/**` |
| 逻辑层 | `logic-app` | 前端入口与页面装配 | `js/app.js` |
| 逻辑层 | `logic-core` | DOM/媒体查询、转义、Toast、滚动锁、弹窗焦点管理 | `js/core/**` |
| 逻辑层 | `logic-shell` | 导航、Mega Menu、移动抽屉、语言、弹窗、共享表单、子页导航 | `js/shell/**` |
| 逻辑层 | `logic-features` | 全站搜索、运费估算、新闻检索分页、文章工具 | `js/features/**` |
| 逻辑层 | `logic-pages` | 首页轮播/服务/行业/计数器、关于时间轴、联系表单 | `js/pages/**` |
| 逻辑层 | `logic-legacy` | 迁移期旧脚本；迁移完成后已删除，模块保留为迁移记录 | `js/main.js`、`js/pages.js`（已移除） |

## 二、页面与结构约定

- 根目录 HTML 是可直接静态托管的最终结构产物。
- 共享结构统一维护在 `partials/`，生成器读取并注入每个页面；首页由 `tools/sync-index-shell.js` 与同一套 partials 同步。
- 页面分三类：
  - `index.html`：品牌首页。
  - 生成型二级/三级页：服务、产品、行业、新闻、关于、联系、ESG、网站地图。
  - 13 个 `news-*.html` 新闻详情三级页。
- 页面公共结构入口：
  - 搜索：`data-search-open`，弹窗 `#searchModal`，索引 `assets/data/search-index.json`。
  - 运费估算：`data-quote-open`，弹窗 `#quoteModal`，表单 `#quoteForm`。
  - 新闻：`#newsSearchInput`、`#newsYear`、`#newsPagination`、`#newsList`。
  - 文章：`#readingProgress`、`#articleReadingTime`、`data-copy-link`、`data-share-article`、`data-print-article`。
  - 网站地图：根目录 `sitemap.html`，页脚入口。
- 所有页面使用一个 `type="module"` 入口：`js/app.js`。
- 页面顺序固定为：共享 sprite → header → main → page CTA → footer → common UI → app module。
- 全站共 **34 页 / 208 个部署文件**；搜索索引 34 条。

## 三、逻辑层启动顺序

`js/app.js` 只负责装配，按以下顺序初始化：

```text
initNavigation()
initOverlays()
initForms()
initPageNav()
initSearch()
initQuote()
initNews()
initArticle()
initHome()
initAbout()
initContact()
```

- `core` 不依赖其他层，提供 `$`、`$$`、`escapeHtml`、`showToast`、`openModal`、`closeModal`、`trapFocus` 等 API。
- `shell` 只依赖 `core`；`overlays` 额外依赖 `navigation` 的抽屉/语言关闭函数。
- `features` 依赖 `core` 和 `shell/navigation`；打开弹窗复用 `core/ui`，不重复实现弹窗系统。
- `pages` 依赖 `core`；只在对应页面 DOM 存在时初始化。
- 每个 controller 都有 `initialized` 保护，避免重复绑定事件。

## 四、搜索索引

```json
{
  "version": 1,
  "generatedAt": "2026-11-24",
  "items": [
    {
      "title": "页面标题",
      "url": "page.html",
      "type": "页面类型",
      "category": "分类",
      "summary": "摘要",
      "text": "正文纯文本（截断）",
      "priority": 3
    }
  ]
}
```

- 由 `tools/build-search-index.js` 从最终 HTML 生成。
- 搜索模块按需 `fetch`，不阻塞首屏。
- 不包含外链 URL，不连接第三方搜索接口。

## 五、构建与验证流水线

```bash
cd jdl-clone

# 1. 生成所有二级/三级页与网站地图（--dry-run 仅打印，不写盘）
node tools/build-pages.js
node tools/build-pages.js --dry-run

# 2. 将共享 shell 同步到手工维护的首页
node tools/sync-index-shell.js

# 3. 由最终 HTML 生成全站搜索索引
node tools/build-search-index.js

# 4. 静态检查与公网检查
node tools/audit-static.js
node tools/check-links.js
node tools/find-unused-assets.js
node tools/audit-public.js https://deep-coil-keen-pan-rmxdiect3cboytjva.paged.net/
```

当前公网地址：

**https://deep-coil-keen-pan-rmxdiect3cboytjva.paged.net/**

## 六、分层开发规则

1. 先 `layered_plan` 声明**一个模块**的分析、文件和验证方式。
2. 只修改计划列出的文件；不跨模块、不跨层顺手改其他文件。
3. 改完立刻 `layered_verify`，记录实际运行过的检查；失败则留在本模块修复。
4. 结构层完成并验证后，才能推进到表现层；逻辑层同理。
5. 已完成的层可以返工，但必须重新走计划与验证流程。
6. 生成器一次性写入多个页面/索引属于模块正常产物，但必须在计划中声明其生成范围。

## 七、验收结果摘要

- 结构层：34 页、共享 shell、生成/审计工具、搜索索引、18 张截图、文档全部完成。
- 表现层：3 个模块完成；7 份 CSS 均被页面加载；色值令牌化完成。
- 逻辑层：6 个模块完成；14 个 ES 模块全部通过语法检查；legacy 脚本已删除。
- 自动化：68 次页面/视口加载、144 次响应式检查、85 个 axe 扫描场景均通过。
- 公网：208 / 208 个文件 HTTP 200。
- 最终交付：`jdl-clone-site.zip`（部署包）与 `jdl-clone-source.zip`（源码包）。
