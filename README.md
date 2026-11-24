# 京东物流官网多页面复刻 · 分层重构版

> 软件工程课程作业 · Vibe Coding 实践  
> 本网站为学习用途的前端复刻，**不是**京东物流官方网站，不提供任何真实业务服务。

## 在线预览

**https://deep-coil-keen-pan-rmxdiect3cboytjva.paged.net/**

无需登录、无访问密码，桌面端和手机端均可直接打开。部署文件共 **208 个**，站点压缩包约 **18.9 MiB**。

> 交付包：`jdl-clone-site.zip` 为部署包，`jdl-clone-source.zip` 为完整源码包；两者均由 2026-11-24 最终版本生成。

## 预览截图

**首页（桌面端）**

![桌面端首页](screenshots/desktop.jpg)

**首页（移动端）**

![移动端首页](screenshots/mobile.jpg)

新增功能截图：

- [全站搜索（关键词“冷链”）](screenshots/search.jpg)
- [运费时效估算结果](screenshots/quote.jpg)
- [网站地图](screenshots/sitemap.jpg)

其他页面：

- [服务与产品](screenshots/services.jpg)
- [京东特快产品页](screenshots/product.jpg)
- [消费品行业解决方案](screenshots/industry.jpg)
- [新闻中心（搜索、年份筛选、真实分页）](screenshots/news.jpg)
- [新闻详情（阅读进度与文章工具）](screenshots/article.jpg)
- [公司介绍](screenshots/about.jpg)
- [联系我们](screenshots/contact.jpg)
- [可持续发展](screenshots/esg.jpg)
- [移动端服务页](screenshots/mobile-services.jpg)
- [移动端新闻页](screenshots/mobile-news.jpg)
- [移动端行业页](screenshots/mobile-industry.jpg)

截图清单见 [`screenshots/README.md`](screenshots/README.md)。

## 项目简介

使用 HTML5、CSS3 与原生 JavaScript 复刻京东物流官网的首页、二级页面和三级页面，共计 **34 个静态页面**。项目无后端、无第三方前端框架，所有图片、图标、视频和搜索索引均已本地化，不依赖官网素材外链。

本轮工作同时完成两件事：

1. **功能扩展**：新增全站搜索、运费时效估算、新闻检索分页、文章阅读工具和网站地图。
2. **架构重构**：按照 `layered-dev` 的结构层 → 表现层 → 逻辑层规范拆分模块，删除旧 `js/main.js` / `js/pages.js`，全站只保留一个 ES Module 入口 `js/app.js`。

## 页面范围（34 页）

| 层级 | 页面 |
| --- | --- |
| 首页 | `index.html` |
| 服务与产品 | `services.html`、`express.html`、`freight.html`、`supply-chain.html` |
| 产品三级页 | `express-jd-fastest.html`、`express-jd-standard.html`、`freight-fast-cargo.html`、`freight-vehicle.html` |
| 解决方案 | `solutions.html` 及 6 个行业页 |
| 新闻中心 | `news.html`（13 条资讯）及 13 个 `news-*.html` 详情页 |
| 关于与支持 | `about.html`、`contact.html`、`esg.html` |
| 站点导航 | `sitemap.html`（33 个内容页入口） |

## 本轮新增功能

### 1. 全站搜索

- 顶部导航和移动抽屉中的搜索按钮，支持 `Ctrl/⌘ + K` 快捷键。
- 按需加载 `assets/data/search-index.json`（34 条页面索引）。
- 对标题、分类、摘要和正文进行本地关键词打分，标题命中优先。
- 结果使用 `mark` 高亮，显示页面类型、摘要和跳转链接；空结果有明确提示。
- 全程本地静态索引，不发送查询到第三方搜索引擎。

### 2. 运费时效估算

- 入口位于顶部 Mega Menu、右侧悬浮栏、移动抽屉和联系页。
- 支持始发/目的城市、产品类型、重量、体积和声明价值。
- 使用城市经纬度距离与产品参数生成演示价格区间、计费重量和预计时效。
- 同城、重量、体积、声明价值均有前端校验；结果为课程演示，不构成真实报价。

### 3. 新闻检索与真实分页

- 新闻中心支持关键词搜索、年份筛选和分类筛选的组合使用。
- 13 条新闻按 **5 条/页** 真实分页，提供上一页、页码、下一页和当前页状态。
- 筛选后自动回到第 1 页，并同步结果数量和空状态。

### 4. 文章阅读工具

- 文章页顶部固定阅读进度条，滚动时同步 `aria-valuenow`。
- 根据正文长度计算预计阅读时间。
- 支持复制文章链接、Web Share（不可用时回退复制）和打印。

### 5. 网站地图

- `sitemap.html` 按首页、服务与产品、行业解决方案、新闻中心、关于与支持分组。
- 共 33 个内容页入口；页脚提供网站地图链接。

## 既有交互

- 首屏视频 + 图片轮播、上一张/下一张、指示点、触屏滑动。
- 10 个物流服务分类切换、6 个行业解决方案切换与数字滚动。
- Mega Menu、移动端抽屉、页脚手风琴、粘性章节导航。
- 运单查询、登录、合作咨询、二维码、语言菜单等演示交互。
- 新闻列表、发展历程、联系表单、FAQ。
- `prefers-reduced-motion` 降级、Esc 关闭、焦点陷阱、焦点返回。

> 所有表单、登录、查询、下载、报价均为**前端演示**，不会向任何服务器发送真实数据。

## 分层架构

```text
jdl-clone/
├── index.html / *.html              # 结构层：34 个可直接部署的页面
├── partials/                        # 结构层：共享 header/footer/common UI/sprite
├── tools/                           # 结构层：页面生成、索引、静态与公网审计
├── assets/                          # 结构层：本地图片、图标、视频、搜索索引
├── screenshots/                     # 结构层：验收截图
├── css/
│   ├── style.css                    # 表现层：首页与共享组件
│   ├── pages.css                    # 表现层：二级/三级页面
│   └── features/                    # 表现层：search/quote/news/article/sitemap
├── js/
│   ├── app.js                       # 逻辑层：唯一应用入口
│   ├── core/                        # DOM、Toast、弹窗焦点管理
│   ├── shell/                       # 导航、弹窗、共享表单、子页导航
│   ├── features/                    # 搜索、报价、新闻、文章
│   └── pages/                       # 首页、关于、联系页面控制器
├── README.md
├── 测试报告.md
└── ARCHITECTURE.md                  # 分层架构契约与构建流水线
```

架构说明详见 [`ARCHITECTURE.md`](ARCHITECTURE.md)。

## 技术栈

- HTML5 语义化结构
- CSS3：Grid、Flexbox、自定义属性、媒体查询、过渡动画
- 原生 JavaScript ES Modules（无运行时依赖）
- Node.js 静态页面生成、搜索索引生成和验收脚本（仅开发期）
- Python 标准库 `http.server` 本地预览
- PagedNet 静态托管

## 本地运行

项目不需要安装依赖，也不需要构建。

```bash
cd jdl-clone
python -m http.server 8080
```

打开 `http://127.0.0.1:8080/`。建议通过 HTTP 服务访问，避免 `file://` 下视频或相对路径差异。

修改共享结构或页面数据后重新生成：

```bash
cd jdl-clone
node tools/build-pages.js
node tools/sync-index-shell.js
node tools/build-search-index.js
node tools/check-links.js
node tools/audit-static.js
node tools/audit-public.js https://deep-coil-keen-pan-rmxdiect3cboytjva.paged.net/
```

## 质量验收

2026-11-24 对最终版本完成回归，详细记录见 [`测试报告.md`](测试报告.md)。

- 34 个页面分别在 1440px 和 390px 加载：**68/68 通过，0 控制台/页面错误、0 失败请求**
- 12 类页面 × 12 个视口宽度（320–1920px）：**144/144 无横向溢出**
- axe-core 4.10.2 WCAG 2.1 A/AA：**85 个页面/弹窗/抽屉扫描场景，0 违规**
- 静态检查：34 页、0 问题；178 个唯一本地引用全部可解析；153 个资源中 0 个未使用
- 公网爬取：**208/208 个 HTML/CSS/JS/图片/视频文件 HTTP 200**
- 搜索索引：34 条，86,631 bytes；页面、文章、服务、行业均可检索
- 14 个 JavaScript 模块全部通过 `node --check`

> 自动化结果不等同于完整的人工无障碍认证；主要测试环境为 Chromium，未覆盖真实 iOS Safari、Firefox 的设备级验证。

## 兼容性

- Chrome / Edge 最新版本
- Safari 最新版本
- Firefox 最新版本
- iOS Safari、Android Chrome

使用 `IntersectionObserver`、CSS Grid、CSS 自定义属性、ES Modules 等现代 Web API；极旧浏览器会退化为基本展示，交互能力下降。

## 素材与版权声明

页面中的京东物流名称、JDL 标识、图片、视频、新闻素材均来自京东物流官方网站（https://www.jdl.com/），仅作为软件工程课程作业的学习与研究素材使用。相关商标、图片、文字版权归京东物流及其权利人所有。

本项目与京东物流无任何隶属、合作或授权关系；如权利人认为存在不当使用，请联系删除。

## 演示说明

| 功能 | 行为 |
| --- | --- |
| 查快递 | 校验运单号，展示模拟物流轨迹 |
| 登录 | 演示验证码 `888888`，不连接账号系统 |
| 合作咨询 | 前端校验后模拟提交成功 |
| 运费估算 | 本地距离/重量/产品参数计算，价格与时效为演示数据 |
| 全站搜索 | 仅检索本站静态索引，不连接外部搜索服务 |
| 新闻筛选/分页 | 前端过滤与分页，不请求真实新闻接口 |
| 文章工具 | 复制链接、Web Share、打印；无服务端存储 |
| 下载方案 / 报告 | 显示“演示页面”提示，不提供真实文件 |
| 语言切换 | 展示交互预览提示，当前仅提供简体中文 |
| 二维码 | 使用本地二维码图片弹窗展示 |

---

**课程作业声明：** 本页面为软件工程课程作业，基于 Vibe Coding（AI 辅助编程）完成，仅用于前端技术学习与展示。
