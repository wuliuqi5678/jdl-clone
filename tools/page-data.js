/* Structured content for the second- and third-level pages. */

const services = {
  express: {
    key: 'express',
    nav: 'services',
    page: 'express.html',
    seoTitle: '快递服务_安全可靠、时效领先的快递服务_京东物流官网复刻',
    seoDesc: '京东物流快递服务二级页面复刻：快递服务能力、产品优势、产品矩阵及相关服务推荐。',
    breadcrumb: ['服务与产品', 'services.html', '快递服务'],
    eyebrow: 'JDL EXPRESS',
    title: '快递服务',
    subtitle: '为您提供安全可靠、时效领先、温暖贴心的快递服务体验，同时可享多种专业化的增值服务。',
    heroImage: 'assets/pages/express-hero.jpg',
    heroVariant: 'orange',
    heroMeta: [
      ['2000+', '航空覆盖线路'],
      ['600+', '铁路合作线路'],
      ['50000+', '自营运输车辆'],
      ['340000+', '自有配送员及操作员']
    ],
    overviewTitle: '快递服务能力',
    overviewText: '覆盖揽收、分拣、运输、派送全链路，以自营网络与数字化能力保障时效稳定。',
    processImage: 'assets/pages/express-process.png',
    processAlt: '快递服务流程图',
    stats: [
      ['2000+', '航空覆盖线路'],
      ['600+', '铁路合作线路'],
      ['50000+', '自营运输车辆'],
      ['19000+', '配送站及网点'],
      ['340000+', '自有配送员及操作员']
    ],
    advantages: [
      ['assets/pages/express-adv-1.png', '快速便捷', '最快 1 小时上门揽收，同时支持预约时间揽收。'],
      ['assets/pages/express-adv-2.png', '温暖交付', '为您提供门到门的递送服务，同时提供便捷、智能的自提服务。'],
      ['assets/pages/express-adv-3.png', '多种产品服务', '时效型、经济型产品组合，给您更多的选择，提供保价、京尊达等优质和个性化的增值服务。'],
      ['assets/pages/express-adv-4.png', '专业客服', '全国统一热线 950616，专业客服团队提供售前、售中、售后的优质服务。']
    ],
    products: [
      ['京东特快', '时效领先、温暖交付', 'assets/pages/express-matrix-1.jpg', 'express-jd-fastest.html', '时效产品'],
      ['京东标快', '时效稳定、安全送达', 'assets/pages/express-matrix-2.jpg', 'express-jd-standard.html', '标准产品'],
      ['生鲜特快', '时效领先、极致保鲜', 'assets/pages/express-matrix-3.jpg', 'express.html#products', '生鲜产品'],
      ['生鲜标快', '时效稳定、安全送达', 'assets/pages/express-matrix-4.jpg', 'express.html#products', '生鲜产品'],
      ['同城急送', '专人直送、极速响应', 'assets/pages/express-matrix-5.jpg', 'contact.html#support', '同城产品'],
      ['增值服务', '保价、包装、签单返还等', 'assets/pages/express-matrix-6.jpg', 'services.html#service-plus', '增值服务']
    ],
    related: [
      ['京东服务', '提供安装、维修、清洗、保养等高品质服务', 'assets/pages/related-serviceplus.jpg', 'services.html#service-plus'],
      ['快运服务', '聚焦 20KG 以上大件重货市场的高品质陆运服务', 'assets/pages/related-freight.jpg', 'freight.html'],
      ['送仓服务', '提供从货源地到收货仓的一体化供应链物流服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#warehouse']
    ]
  },
  freight: {
    key: 'freight',
    nav: 'services',
    page: 'freight.html',
    seoTitle: '快运服务_20KG以上大件物流运输_京东物流官网复刻',
    seoDesc: '京东物流快运服务二级页面复刻：全国范围覆盖、时效快速稳定、行业服务能力与产品矩阵。',
    breadcrumb: ['服务与产品', 'services.html', '快运服务'],
    eyebrow: 'JDL FREIGHT',
    title: '快运服务',
    subtitle: '聚焦 20KG 以上大件重货市场，以覆盖全国的运输网络，提供快捷、安全、稳定的高品质陆运服务。',
    heroImage: 'assets/pages/freight-hero.jpg',
    heroVariant: 'orange',
    heroMeta: [
      ['100%', '区县覆盖'],
      ['10万+', '运输干支线路'],
      ['数百个', '转运中心'],
      ['20KG+', '重货零担专长']
    ],
    overviewTitle: '快运服务能力',
    overviewText: '面向个人发运、电商发件、门店调拨与工厂批量件等场景，提供大票、零担、整车等多元运输产品。',
    processImage: 'assets/pages/freight-process.png',
    processAlt: '快运服务流程图',
    stats: [
      ['100%', '全国区县覆盖'],
      ['10万+', '运输干支线路'],
      ['数百个', '转运中心'],
      ['20KG+', '重货零担专长'],
      ['7×24', '小时服务响应']
    ],
    advantages: [
      ['assets/pages/freight-adv-1.png', '全国范围覆盖', '运输网络覆盖全国主要城市与区县，一地发全国。'],
      ['assets/pages/freight-adv-2.png', '时效快速稳定', '数字化调度与干线网络协同，保障运输时效稳定。'],
      ['assets/pages/freight-adv-3.png', '行业服务能力', '针对家居、家电、工业品等行业提供定制化运输方案。'],
      ['assets/pages/express-adv-4.png', '专业服务保障', '专属客服与全链路轨迹跟踪，异常主动跟进。']
    ],
    products: [
      ['重货标快', '主打单票 20KG+ 大件运输服务', 'assets/pages/freight-matrix-1.jpg', 'freight-fast-cargo.html', '零担产品'],
      ['整车直达', '3000kg 以上点到点专车运输', 'assets/pages/freight-matrix-2.jpg', 'freight-vehicle.html', '整车产品'],
      ['零担配送', '覆盖门店调拨、电商发件等场景', 'assets/pages/freight-matrix-3.jpg', 'contact.html#support', '零担产品'],
      ['大件服务', '家电、家居、健身器材全链路仓配', 'assets/pages/related-warehouse.jpg', 'services.html#bulky', '大件产品'],
      ['送仓服务', '货源地到收货仓的一体化送仓', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#warehouse', '入仓产品'],
      ['增值服务', '保价、签单返还、重货上楼等', 'assets/pages/contact-cta.jpg', 'contact.html#support', '增值服务']
    ],
    related: [
      ['快递服务', '时效领先、安全可靠的快递及快运服务', 'assets/pages/express-matrix-1.jpg', 'express.html'],
      ['仓配一体服务', '以京仓/云仓 + 京配/云配的供应链服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['整车直达', '点到点或多点专车运输，安全可靠', 'assets/pages/freight-matrix-2.jpg', 'freight-vehicle.html']
    ]
  },
  supply: {
    key: 'supply',
    nav: 'services',
    page: 'supply-chain.html',
    seoTitle: '仓配一体服务_供应链一体化服务_京东物流官网复刻',
    seoDesc: '京东物流仓配一体服务二级页面复刻：稳定自营资源、灵活生态资源、专业物流运营与大促经验。',
    breadcrumb: ['服务与产品', 'services.html', '仓配一体服务'],
    eyebrow: 'JDL SUPPLY CHAIN',
    title: '仓配一体服务',
    subtitle: '以京仓 / 云仓 + 京配 / 云配服务不同需求的客户，为电商仓平台商家提供高品质以及高性价比的仓配一体物流服务。',
    heroImage: 'assets/pages/supply-hero.jpg',
    heroVariant: 'blue',
    heroMeta: [
      ['3,600+', '仓库资源'],
      ['3,400万㎡', '仓库管理面积'],
      ['99%', '人口覆盖'],
      ['2,000+', '云仓生态']
    ],
    overviewTitle: '仓配一体服务能力',
    overviewText: '从入库、存储、拣选、包装到末端配送，以一体化系统与运营能力，帮助商家降低库存与履约成本。',
    processImage: 'assets/pages/supply-process.png',
    processAlt: '仓配一体服务流程图',
    stats: [
      ['3,600+', '京东物流仓库'],
      ['3,400万㎡', '仓库管理面积'],
      ['99%', '物流网络人口覆盖'],
      ['2,000+', '云仓生态合作仓'],
      ['7×24', '小时履约保障']
    ],
    advantages: [
      ['assets/pages/supply-adv-1.png', '稳定的自营资源', '自营仓配网络与标准化运营体系，服务全程可控。'],
      ['assets/pages/supply-adv-2.png', '灵活的生态资源', '京仓与云仓协同，灵活匹配不同业务规模与区域需求。'],
      ['assets/pages/supply-adv-3.png', '专业的物流运营', '十余年电商仓配运营经验，专业团队全流程管理。'],
      ['assets/pages/supply-adv-4.png', '丰富的大促经验', '大促期间峰值订单弹性扩充，保障时效稳定达成。']
    ],
    products: [
      ['商务仓', '自营仓配网络，为电商平台商家提供高品质仓配服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#products', '标准仓配'],
      ['电商仓', '具备行业化能力、稳定履约的低价供应链仓配服务', 'assets/pages/consumer-related-2.jpg', 'supply-chain.html#products', '电商仓配'],
      ['智能商务仓', '融合大数据、算法与京东仓运配的供应链全托管服务', 'assets/pages/consumer-related-3.png', 'contact.html#support', '智能仓配'],
      ['送仓服务', '从货源地到收货仓的一体化送仓服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#warehouse', '入仓服务'],
      ['冷链服务', '全流程、全场景的 F2B2C 一站式冷链服务平台', 'assets/pages/consumer-related-1.jpg', 'services.html#coldchain', '冷链服务'],
      ['逆向服务', '退货验收、质检分类、维修与库存变现', 'assets/pages/supply-process.png', 'contact.html#support', '逆向服务']
    ],
    related: [
      ['快递服务', '安全可靠、时效领先的快递服务', 'assets/pages/express-matrix-1.jpg', 'express.html'],
      ['冷链服务', '全流程、全场景的一站式冷链服务平台', 'assets/img/industry-fresh.jpg', 'services.html#coldchain'],
      ['国际物流', '助力中国制造和中国品牌一站出海', 'assets/pages/related-freight.jpg', 'services.html#global']
    ]
  }
};

const products = {
  fastest: {
    key: 'fastest',
    nav: 'services',
    page: 'express-jd-fastest.html',
    seoTitle: '京东特快_时效领先的门到门寄递服务_京东物流官网复刻',
    seoDesc: '京东特快三级产品页复刻：时效承诺、安全可靠、超时赔付与服务保障。',
    title: '京东特快',
    category: '快递服务 / 时效产品',
    parent: ['快递服务', 'express.html'],
    subtitle: '为您提供时效领先、安全可靠、服务周到的高品质门到门寄递服务',
    image: 'assets/pages/express-matrix-1.jpg',
    tags: ['1小时上门揽收', '同城最快当日达', '全程轨迹可视'],
    heroNote: '服务范围覆盖全国超过 300 个城市，365 天 × 24 小时为您服务。',
    advantages: [
      ['assets/pages/fastest-adv-1.png', '时效承诺', '优先派送，单独交接，同城最快当日达，跨省最快次晨达。'],
      ['assets/pages/fastest-adv-2.png', '安全可靠', '全程物流轨迹跟踪，保障货物稳定送达，大促期间履约波动小。'],
      ['assets/pages/fastest-adv-3.png', '超时赔付', '及时响应，1 小时上门，一单到底专人跟进，准时派送，晚到必赔。'],
      ['assets/pages/fastest-adv-4.png', '服务保障', '送货上门，超时可退费，24 小时理赔。']
    ],
    specs: [
      ['服务时效', '同城当日达 / 跨省次晨达'],
      ['揽收时效', '最快 1 小时上门'],
      ['覆盖范围', '全国 300+ 城市'],
      ['售后保障', '超时赔付、晚到必赔']
    ],
    info: [
      ['assets/pages/fastest-info-1.png', '时效承诺', '1 小时上门揽收、最快当日送达，当您寄递的快件在承诺时效内未送达时可申请赔付运费。'],
      ['assets/pages/fastest-info-2.png', '覆盖范围', '全国超过 300 个城市，365 天 × 24 小时，随时随地为您服务。'],
      ['assets/pages/fastest-info-3.png', '增值服务', '可提供保价服务、代收货款、包装服务、签单返还、指定签收等增值服务，具体详见增值服务介绍。'],
      ['assets/pages/fastest-info-4.png', '适用行业', '所有行业适用，金融、商务、服饰、3C、美妆、消费品、日用百货等。'],
      ['assets/pages/fastest-info-5.png', '收费标准', '可点击此处查询参考，或致电京东物流官方客服 950616。']
    ],
    asideTitle: '寄急件，选京东特快',
    asideText: '如需批量寄件、企业月结或定制化时效方案，可留下需求，由物流顾问为您匹配服务。',
    related: [
      ['京东标快', '时效稳定、安全送达', 'assets/pages/express-matrix-2.jpg', 'express-jd-standard.html'],
      ['生鲜特快', '时效领先、温暖交付、极致保鲜', 'assets/pages/express-matrix-3.jpg', 'express.html#products'],
      ['同城急送', '专人直送，最快 30 分钟送达', 'assets/pages/express-matrix-5.jpg', 'contact.html#support']
    ]
  },
  standard: {
    key: 'standard',
    nav: 'services',
    page: 'express-jd-standard.html',
    seoTitle: '京东标快_时效稳定的门到门寄递服务_京东物流官网复刻',
    seoDesc: '京东标快三级产品页复刻：高性价比、覆盖广泛、全年无休的快递服务。',
    title: '京东标快',
    category: '快递服务 / 标准产品',
    parent: ['快递服务', 'express.html'],
    subtitle: '为您提供时效稳定、安全可靠、性价比高的高品质门到门寄递服务',
    image: 'assets/pages/express-matrix-2.jpg',
    tags: ['全国上门取件', '性价比高', '全年无休'],
    heroNote: '覆盖中国大陆地区全境，自营收派团队与客服团队保障服务体验。',
    advantages: [
      ['assets/pages/fastest-adv-1.png', '时效稳定', '稳定的航空、铁路与公路运输资源组合，时效可预期。'],
      ['assets/pages/fastest-adv-2.png', '安全可靠', '全链路轨迹跟踪，自营团队保障快件安全。'],
      ['assets/pages/fastest-adv-3.png', '性价比高', '价格优惠，以大众价格享受高品质快递服务。'],
      ['assets/pages/fastest-adv-4.png', '全年无休', '异常天气与节假日提前预警，365 天稳定配送。']
    ],
    specs: [
      ['服务时效', '稳定送达，按城市分级'],
      ['揽收服务', '全国范围上门取件'],
      ['服务范围', '中国大陆地区全境'],
      ['服务保障', '自营收派与专业客服']
    ],
    info: [
      ['assets/pages/fastest-info-1.png', '时效稳定', '根据寄收城市匹配稳定运输线路，全程物流轨迹可查询。'],
      ['assets/pages/fastest-info-2.png', '覆盖广泛', '覆盖中国大陆地区全境，城市与区县网络持续完善。'],
      ['assets/pages/fastest-info-3.png', '增值服务', '提供保价、包装、签单返还、代收货款、指定签收等服务。'],
      ['assets/pages/fastest-info-4.png', '适用场景', '日常寄件、电商退换货、商务文件、个人包裹等。'],
      ['assets/pages/fastest-info-5.png', '收费标准', '可通过运费时效查询或致电 950616 获取参考价格。']
    ],
    asideTitle: '日常寄递的稳妥之选',
    asideText: '覆盖广、时效稳、价格友好，适合个人日常寄件与商家常规发货。',
    related: [
      ['京东特快', '时效领先、温暖交付', 'assets/pages/express-matrix-1.jpg', 'express-jd-fastest.html'],
      ['生鲜标快', '多温层包装，新鲜送达', 'assets/pages/express-matrix-4.jpg', 'express.html#products'],
      ['同城急送', '同城专人直送，快速响应', 'assets/pages/express-matrix-5.jpg', 'contact.html#support']
    ]
  },
  fastCargo: {
    key: 'fastCargo',
    nav: 'services',
    page: 'freight-fast-cargo.html',
    seoTitle: '重货标快_20KG以上大件运输服务_京东物流官网复刻',
    seoDesc: '京东物流重货标快三级产品页复刻：快、准、稳、好的大件重货运输服务。',
    title: '重货标快',
    category: '快运服务 / 零担产品',
    parent: ['快运服务', 'freight.html'],
    subtitle: '主打单票 20KG+ 大件运输服务，满足个人发运、电商发件、门店调拨与工厂批量件场景需求。',
    image: 'assets/pages/freight-matrix-1.jpg',
    tags: ['20KG+ 重货', '门到门运输', '全程可视'],
    heroNote: '全国范围揽收，支持重货上楼、保价、签单返还等增值服务。',
    advantages: [
      ['assets/pages/fastcargo-adv-1.png', '快', '全国干支线网络协同，快速响应、快速中转。'],
      ['assets/pages/fastcargo-adv-2.png', '准', '数字化调度与路由规划，时效稳定可预期。'],
      ['assets/pages/fastcargo-adv-3.png', '稳', '专业装卸与运输规范，降低破损风险。'],
      ['assets/pages/fastcargo-adv-4.png', '好', '专属客服跟进，末端配送服务规范。']
    ],
    specs: [
      ['适用货量', '单票 20KG 以上'],
      ['服务模式', '门到门零担运输'],
      ['覆盖范围', '全国主要城市与区县'],
      ['增值服务', '保价、签单返还、重货上楼']
    ],
    info: [
      ['i-box', '适用货量', '单票 20KG 以上大件重货，适合家具、家电、设备、批量商品等。'],
      ['i-truck', '服务模式', '提供门到门零担运输，支持多点提货与末端配送。'],
      ['i-map', '覆盖范围', '全国范围揽收与配送，干支线网络覆盖主要城市和区县。'],
      ['i-shield', '服务保障', '专业装卸、加固包装建议与全程轨迹跟踪，异常主动处理。'],
      ['i-doc', '增值服务', '可提供保价、签单返还、重货上楼、代收货款等服务。']
    ],
    asideTitle: '大件重货，也能省心寄',
    asideText: '根据货量、线路和时效要求，为您匹配零担、整车或专线方案。',
    related: [
      ['整车直达', '3000kg 以上点到点专车运输', 'assets/pages/freight-matrix-2.jpg', 'freight-vehicle.html'],
      ['快运服务', '全国范围覆盖的高品质陆运服务', 'assets/pages/freight-hero.jpg', 'freight.html'],
      ['仓配一体', '仓运配一体化供应链服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html']
    ]
  },
  vehicle: {
    key: 'vehicle',
    nav: 'services',
    page: 'freight-vehicle.html',
    seoTitle: '整车直达_3000KG以上专车运输_京东物流官网复刻',
    seoDesc: '京东物流整车直达三级产品页复刻：快速响应、灵活计费、车源丰富、安全可靠。',
    title: '整车直达',
    category: '快运服务 / 整车产品',
    parent: ['快运服务', 'freight.html'],
    subtitle: '为您提供 3000kg 以上专车直达，通过点到点或多点专车运输，提供安全可靠、高性价比的整车运输服务。',
    image: 'assets/pages/freight-matrix-2.jpg',
    tags: ['3000kg+', '专车直达', '全程可视'],
    heroNote: '支持多点装卸、预约用车与定制化线路方案，满足批量货物运输需求。',
    advantages: [
      ['assets/pages/vehicle-adv-1.png', '快速响应', '车源调度高效，支持快速下单与预约用车。'],
      ['assets/pages/vehicle-adv-2.png', '灵活计费', '按车型、里程与线路灵活计费，方案透明。'],
      ['assets/pages/vehicle-adv-3.png', '车源丰富', '多种车型资源，覆盖城市配送与干线运输。'],
      ['assets/pages/vehicle-adv-4.png', '安全可靠', '专业司机与在途跟踪，货物安全有保障。']
    ],
    specs: [
      ['适用货量', '3000kg 以上'],
      ['服务模式', '点到点 / 多点专车'],
      ['车源类型', '多种车型按需匹配'],
      ['在途服务', '全程可视、异常响应']
    ],
    info: [
      ['i-truck', '适用货量', '适用于 3000kg 以上批量货物、设备、原材料等整车运输需求。'],
      ['i-route', '服务模式', '支持点到点直达与多点装卸，按客户线路定制运输方案。'],
      ['i-warehouse', '车源保障', '整合多种车型资源，按货量、路线和时效匹配车辆。'],
      ['i-location', '在途可视', '提供车辆与货物在途信息跟踪，异常情况及时响应。'],
      ['i-doc', '增值服务', '可提供保价、签单返还、装卸协助等增值服务。']
    ],
    asideTitle: '整车运输，一票直达',
    asideText: '适合批量发货、工厂调拨与项目物流，支持定制化线路和时效方案。',
    related: [
      ['重货标快', '单票 20KG+ 大件零担运输', 'assets/pages/freight-matrix-1.jpg', 'freight-fast-cargo.html'],
      ['快运服务', '覆盖全国的快捷、安全陆运网络', 'assets/pages/freight-hero.jpg', 'freight.html'],
      ['仓配一体', '仓运配一体化，降低供应链成本', 'assets/pages/related-warehouse.jpg', 'supply-chain.html']
    ]
  }
};

const industries = {
  consumer: {
    key: 'consumer',
    nav: 'solutions',
    page: 'consumer-goods.html',
    seoTitle: '消费品行业解决方案_全渠道 E2E 供应链服务_京东物流官网复刻',
    seoDesc: '消费品行业物流解决方案复刻：全渠道 E2E、仓配一体、BC 同仓、供应链数字化。',
    breadcrumb: ['解决方案', 'solutions.html', '消费品行业解决方案'],
    title: '消费品行业解决方案',
    subtitle: '为消费品行业客户提供数字化、可视化、智能化的一体解决方案，向客户提供全渠道 E2E 服务，实现供应链升级。',
    heroImage: 'assets/pages/consumer-hero.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '全渠道、全场景的供应链一体化服务',
      paragraphs: [
        '结合行业发展趋势和龙头企业最佳实践，为快消行业（食品、酒水、美妆、母婴、日用家清等）的商家提供标准化产品 + 定制化服务内容的供应链一体化服务方案。',
        '提供面向快消行业的多渠道多场景的一体化供应链服务，包括线上多渠道仓配一体，线下多场景配送、BC 同仓等基础物流解决方案，以及匹配物流效率最大化的仓网布局规划、库存规划、供应链数字化。'
      ],
      note: '从供应链现状诊断，到供应链结构设计和基础物流运营，帮助商家在渠道变革过程中降本增效。'
    },
    diagram: 'assets/pages/consumer-diagram.png',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '多渠道多场景的供应链服务能力', '具备线上线下仓配一体、跨境、O2O 多渠道多场景的解决方案与运营能力。'],
      ['assets/pages/consumer-adv-2.png', '广泛的物流网络覆盖能力', '物流网络覆盖超 99% 的人口，极大满足深度配送的趋势。'],
      ['assets/pages/consumer-adv-3.png', '超强大促保障能力', '大促期间峰值订单处理能力弹性扩充，保障时效达成。'],
      ['assets/pages/consumer-adv-4.png', '自营体系 + 定制化方案', '自营体系服务全程可控，定制方案提升服务满意度。'],
      ['assets/pages/consumer-adv-5.png', '短链、库存共享、BC 融合', '应对供应链整合趋势，具备完善的系统与运营能力，降低管理成本。'],
      ['assets/pages/consumer-adv-6.png', '智能供应链', '在大数据、自动化设备、5G 园区等方面为多品类客户提供应用。'],
      ['assets/pages/consumer-adv-7.png', '引领行业前瞻与创新', '基于海量客户的行业模式创新与业内最佳实践推广应用。'],
      ['assets/pages/consumer-adv-8.png', '绿色供应链与可持续发展', '围绕碳中和目标，依托可循环器具、智能园区、新能源运力构建绿色供应链。']
    ],
    scenario: {
      title: '快消行业有供应链业务诉求的商家',
      text: '面对全渠道订单碎片化、库存分布复杂和大促波峰波动，京东物流以仓网规划、库存共享与 BC 同仓能力，帮助商家实现全渠道履约与库存效率提升。',
      bullets: ['线上多渠道仓配一体', '线下多场景配送与 BC 同仓', '仓网布局、库存规划与供应链数字化'],
      image: 'assets/img/industry-consumer.jpg',
      imageAlt: '消费品行业仓储与配送场景'
    },
    related: [
      ['快递服务', '为您提供时效领先、安全可靠、服务周到的高品质门到门寄递服务', 'assets/pages/express-matrix-1.jpg', 'express.html'],
      ['送仓服务', '提供从货源地到收货仓之间的一体化供应链物流服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#warehouse'],
      ['冷链服务', '专注于生鲜食品、医药物流的一站式冷链服务', 'assets/img/industry-fresh.jpg', 'services.html#coldchain']
    ],
    ctaTitle: '让消费品供应链更简单',
    ctaText: '获取行业解决方案与专属物流顾问支持'
  },
  digital: {
    key: 'digital',
    nav: 'solutions',
    page: 'digital.html',
    seoTitle: '3C行业物流解决方案_全渠道一盘货_京东物流官网复刻',
    seoDesc: '3C 行业物流解决方案复刻：全渠道一盘货、串码精细化管理、正逆一体与专业团队托管。',
    breadcrumb: ['解决方案', 'solutions.html', '3C 行业解决方案'],
    title: '3C 行业解决方案',
    subtitle: '京东物流结合自身多种产品能力，为企业提供多渠道一盘货的一站式物流解决方案。',
    heroImage: 'assets/img/industry-digital.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '端到端、B2B & B2C 仓运配一体化',
      paragraphs: [
        '运用京东物流智能供应链能力，为商家提供从工厂、总仓、分仓、门店到终端消费者的端到端全链条服务，包括线上线下一盘货库存共享服务。',
        '通过唯一码 / 串码的精细化系统管理实现库存管控，帮助商家提高供应链效率，降低资金占用与运营成本。'
      ],
      note: '标准化服务与行业增值服务灵活组合，快速报价、敏捷实施上线。'
    },
    diagram: 'assets/pages/digital-diagram.png',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '正逆一体服务无忧', '正向发货稳定高效，逆向取件退货便捷安全。'],
      ['assets/pages/consumer-adv-2.png', '全渠道一盘货库存共享', '通过唯一码 / 串码精细化管理，实现线上线下库存融合。'],
      ['assets/pages/consumer-adv-3.png', '个性化需求满足', '末端送货 100% 上门，针对多种增值服务需求提供定制化方案。'],
      ['assets/pages/consumer-adv-4.png', '波峰波谷大促保障', '大促期间根据需求变化快速应对波峰波谷，多批次柔性生产。'],
      ['assets/pages/consumer-adv-5.png', '便捷金融服务', '资金托盘、动产融资等灵活方案，帮助商家改善现金流。'],
      ['assets/pages/consumer-adv-6.png', '专业团队全托管', '3C 行业经验丰富的供应链解决方案及运营管理团队全托管。'],
      ['assets/pages/consumer-adv-7.png', '全国分仓 211 限时达', '结合京东仓网资源合理分仓，提供省内当日达、次日达服务。'],
      ['assets/pages/consumer-adv-8.png', '智能供应链', '数据预测、智能补调与全链路可视化，提升库存周转效率。']
    ],
    scenario: {
      title: '全渠道销售的 3C 品牌方、代理商与门店商超',
      text: '新品首销、大促爆发与售后逆向并行，3C 品牌需要更精细的库存管理与更稳定的履约能力。京东物流以一盘货与串码管理能力，支撑多场景业务增长。',
      bullets: ['工厂到消费者的全链路服务', '唯一码 / 串码精细化管理', '线上线下一盘货与逆向服务'],
      image: 'assets/img/industry-digital.jpg',
      imageAlt: '3C 行业物流场景'
    },
    related: [
      ['快递服务', '高品质门到门寄递与增值服务', 'assets/pages/express-matrix-2.jpg', 'express.html'],
      ['仓配一体服务', '京仓/云仓 + 京配/云配一体化服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['京东特快', '时效领先、安全可靠的高品质寄递', 'assets/pages/express-matrix-1.jpg', 'express-jd-fastest.html']
    ],
    ctaTitle: '让 3C 供应链更敏捷',
    ctaText: '从全渠道库存到末端履约，获取专属解决方案'
  },
  fresh: {
    key: 'fresh',
    nav: 'solutions',
    page: 'fresh.html',
    seoTitle: '生鲜行业物流解决方案_冷链一体化_京东物流官网复刻',
    seoDesc: '生鲜行业物流解决方案复刻：冷链仓运配网络、多温层仓储、精准温控与全链路可视。',
    breadcrumb: ['解决方案', 'solutions.html', '生鲜行业解决方案'],
    title: '生鲜行业解决方案',
    subtitle: '助力生鲜行业客户供应链自动化、数字化转型，共同打造柔性、高效敏捷的精益物流。',
    heroImage: 'assets/img/industry-fresh.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '从原产地到餐桌的冷链一体化',
      paragraphs: [
        '京东物流致力于为客户提供从原产地、生产加工源头到末端消费者的全环节一站式供应链服务，通过覆盖全国的冷链仓运配网络，为客户提供优质的基础物流保障。',
        '针对生鲜品类对温度、时效与损耗的高要求，提供多温层仓储、精准温控运输、末端配送与逆向处理能力。'
      ],
      note: '以数字化手段实现全链路温度可视、库存协同与履约预警。'
    },
    diagram: 'assets/pages/fresh-diagram.png',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '冷链仓配一体化', '覆盖仓储、干线、城配与末端的一体化冷链服务。'],
      ['assets/pages/consumer-adv-2.png', '精准温控', '多温层仓储与温控运输，保障生鲜品质稳定。'],
      ['assets/pages/consumer-adv-3.png', '产地直发', '连接产地产业带，助力农产品上行与产销对接。'],
      ['assets/pages/consumer-adv-4.png', '全链路可视', '温度、轨迹与订单状态全程可视，异常及时预警。'],
      ['assets/pages/consumer-adv-5.png', '多温层服务', '冷冻、冷藏、恒温、常温多温区组合履约。'],
      ['assets/pages/consumer-adv-6.png', '时效保障', '冷链卡班与城市配送网络协同，保障新鲜送达。'],
      ['assets/pages/consumer-adv-7.png', '绿色包装', '可循环保温箱与环保包装方案，兼顾保鲜与减碳。'],
      ['assets/pages/consumer-adv-8.png', '大促保障', '弹性资源与专项运营团队，保障大促与节令高峰。']
    ],
    scenario: {
      title: '生鲜食品、农产品与餐饮供应链客户',
      text: '从产地到餐桌，生鲜供应链对温度和时效高度敏感。京东物流以冷链网络与数字化能力，帮助客户降低损耗、保障品质、提升履约体验。',
      bullets: ['产地仓 + 销地仓协同', '多温层仓储与冷链运输', '末端配送与售后逆向'],
      image: 'assets/img/industry-fresh.jpg',
      imageAlt: '生鲜冷链物流场景'
    },
    related: [
      ['冷链服务', '全流程、全场景的 F2B2C 冷链服务平台', 'assets/img/industry-fresh.jpg', 'services.html#coldchain'],
      ['仓配一体服务', '仓运配一体化供应链服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['快递服务', '安全可靠、时效领先的快递服务', 'assets/pages/express-matrix-2.jpg', 'express.html']
    ],
    ctaTitle: '让新鲜，更快抵达',
    ctaText: '获取生鲜冷链解决方案与专属顾问支持'
  },
  apparel: {
    key: 'apparel',
    nav: 'solutions',
    page: 'apparel.html',
    seoTitle: '服饰行业解决方案_服饰物流与仓配服务_京东物流官网复刻',
    seoDesc: '服饰行业物流解决方案复刻：快捷入仓、标准化库内运营、高效出库、仓网布局与专业运输。',
    breadcrumb: ['解决方案', 'solutions.html', '服饰行业解决方案'],
    title: '服饰行业解决方案',
    subtitle: '围绕服饰行业全链路场景，提供入仓、库内运营、出库、运输与售后的一体化供应链服务。',
    heroImage: 'assets/img/industry-dress.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '从商家痛点出发的柔性供应链',
      paragraphs: [
        '致力于承接服饰商家在供应链全链路的痛点：快捷的入仓方案、标准化库内运营、高效率生产出库、庞大的仓网布局、专业的运输团队和优质的售后保障。',
        '通过产品和能力自由组合，打造贴合行业、贴近市场、服务客户的标准行业解决方案，帮助品牌应对季节性波动与全渠道履约挑战。'
      ],
      note: '覆盖正向发货、门店调拨、电商退货与售后处理的一体化服饰供应链。'
    },
    diagram: 'assets/img/industry-dress.jpg',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '快捷入仓方案', '灵活预约入仓与标准化验收，缩短商品上架周期。'],
      ['assets/pages/consumer-adv-2.png', '标准化库内运营', '专业服饰仓储作业规范，保障库存准确与出库效率。'],
      ['assets/pages/consumer-adv-3.png', '高效率生产出库', '订单波峰弹性排产，支持多平台订单高效履约。'],
      ['assets/pages/consumer-adv-4.png', '庞大仓网布局', '覆盖全国的仓网资源，缩短配送半径与履约时效。'],
      ['assets/pages/consumer-adv-5.png', '专业运输团队', '干支线运输与末端配送协同，保障商品安全送达。'],
      ['assets/pages/consumer-adv-6.png', '优质售后保障', '退货验收、质检分类与二次销售支持，完善逆向链路。'],
      ['assets/pages/consumer-adv-7.png', '全渠道库存共享', '线上线下一盘货管理，提升库存周转与现货率。'],
      ['assets/pages/consumer-adv-8.png', '大促弹性保障', '大促与换季期间弹性扩充资源，保障履约稳定。']
    ],
    scenario: {
      title: '服饰品牌、零售商与电商商家',
      text: '服饰行业具有 SKU 多、季节性强、退货率高等特点。京东物流以标准化仓内运营、柔性产能与全渠道库存能力，帮助品牌提升履约效率与库存健康度。',
      bullets: ['多平台订单统一履约', '门店调拨与电商退货处理', '季节性波峰弹性资源保障'],
      image: 'assets/img/industry-dress.jpg',
      imageAlt: '服饰行业仓储与门店场景'
    },
    related: [
      ['仓配一体服务', '京仓/云仓 + 京配/云配一体化服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['快递服务', '安全可靠、时效领先的快递服务', 'assets/pages/express-matrix-2.jpg', 'express.html'],
      ['3C 行业解决方案', '全渠道一盘货与串码精细化管理', 'assets/img/industry-digital.jpg', 'digital.html']
    ],
    ctaTitle: '让服饰供应链更柔性',
    ctaText: '获取入仓、仓配与全渠道履约方案'
  },
  appliance: {
    key: 'appliance',
    nav: 'solutions',
    page: 'appliance.html',
    seoTitle: '家电行业解决方案_家电物流与送装一体_京东物流官网复刻',
    seoDesc: '家电行业物流解决方案复刻：全国分仓、专业库内操作、大促保障、送装一体与逆向售后。',
    breadcrumb: ['解决方案', 'solutions.html', '家电行业解决方案'],
    title: '家电行业解决方案',
    subtitle: '通过供应链自动化、数智化提升生产效率，优化供应链布局，实现产销协同与高质量履约。',
    heroImage: 'assets/img/industry-appliance.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '仓配装一体化的家电供应链',
      paragraphs: [
        '通过合理全国库存分仓铺货、专业库内操作与大促波峰保障，为家电品牌提供从工厂、仓库到消费者的一体化供应链服务。',
        '结合送装一体、预约配送与逆向售后能力，提升大家电末端服务体验，帮助品牌实现产销协同与库存效率优化。'
      ],
      note: '覆盖大家电、生活家电、厨房电器等多品类全渠道履约场景。'
    },
    diagram: 'assets/img/industry-appliance.jpg',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '全国库存分仓', '合理布局全国仓网，缩短配送半径与库存周转。'],
      ['assets/pages/consumer-adv-2.png', '专业库内操作', '家电仓储作业规范，保障出库准确与货物安全。'],
      ['assets/pages/consumer-adv-3.png', '大促弹性保障', '波峰波谷弹性排产，保障大促订单履约。'],
      ['assets/pages/consumer-adv-4.png', '24 小时极速发货', '标准化订单处理与库存协同，快速响应销售订单。'],
      ['assets/pages/consumer-adv-5.png', '送装一体服务', '送货上门、安装、调试一次完成，提升消费体验。'],
      ['assets/pages/consumer-adv-6.png', '逆向售后处理', '退货验收、检测与备件管理，完善售后闭环。'],
      ['assets/pages/consumer-adv-7.png', '全渠道履约', '线上电商、线下门店与经销商订单统一管理。'],
      ['assets/pages/consumer-adv-8.png', '数字化预测', '基于销售预测与库存数据优化补调与仓网布局。']
    ],
    scenario: {
      title: '家电品牌、经销商与零售渠道',
      text: '大家电体积大、配送要求高、安装服务链条长。京东物流通过仓配装一体与全国分仓能力，帮助家电品牌提升末端体验并降低履约成本。',
      bullets: ['全国分仓与库存协同', '送装一体与预约配送', '逆向退货与备件管理'],
      image: 'assets/img/industry-appliance.jpg',
      imageAlt: '家电行业仓储与配送场景'
    },
    related: [
      ['大件服务', '家电、家居等大件全渠道仓配服务', 'assets/icons/svc-bulky.png', 'services.html#bulky'],
      ['仓配一体服务', '仓运配一体化供应链服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['送仓服务', '从货源地到收货仓的一体化服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html#warehouse']
    ],
    ctaTitle: '让家电履约更省心',
    ctaText: '获取家电行业仓配装一体化方案'
  },
  auto: {
    key: 'auto',
    nav: 'solutions',
    page: 'auto.html',
    seoTitle: '汽车行业解决方案_入厂物流与售后备件_京东物流官网复刻',
    seoDesc: '汽车行业物流解决方案复刻：入厂物流、售后备件、前置仓极速覆盖与供应链数字化。',
    breadcrumb: ['解决方案', 'solutions.html', '汽车行业解决方案'],
    title: '汽车行业解决方案',
    subtitle: '为汽车行业客户提供入厂物流、售后备件、整车运输与供应链数字化服务，打造柔性、高效、敏捷的精益物流。',
    heroImage: 'assets/img/industry-car.jpg',
    heroVariant: 'blue',
    navItems: [['intro', '方案介绍'], ['advantages', '方案优势'], ['scenario', '应用场景'], ['related', '相关推荐'], ['contact', '联系我们']],
    intro: {
      strong: '面向汽车产业链的精益供应链',
      paragraphs: [
        '为汽车整车厂、零部件供应商与售后渠道提供入厂物流、售后备件、整车运输与仓配一体化服务，以数字化预测与全链路可视提升供应链韧性。',
        '依托前置仓与城市配送网络，汽后客户可实现核心区域快速覆盖，快速响应 4S 店、汽修店与终端客户订单。'
      ],
      note: '围绕汽车产业链的采购、生产、销售与售后环节提供定制化物流方案。'
    },
    diagram: 'assets/img/industry-car.jpg',
    advantages: [
      ['assets/pages/consumer-adv-1.png', '入厂物流', '零部件从供应商到工厂的定时、定量、定路线配送。'],
      ['assets/pages/consumer-adv-2.png', '售后备件仓配', '备件仓储、分拨与门店配送一体化管理。'],
      ['assets/pages/consumer-adv-3.png', '前置仓极速覆盖', '核心城市多点备货，快速响应门店与终端订单。'],
      ['assets/pages/consumer-adv-4.png', '整车运输', '多车型资源与专车直达，保障整车安全运输。'],
      ['assets/pages/consumer-adv-5.png', '数字化预测', '基于订单与库存数据优化补货与仓网布局。'],
      ['assets/pages/consumer-adv-6.png', '全链路可视', '运输、仓储与配送节点透明可追踪。'],
      ['assets/pages/consumer-adv-7.png', '定制化包装', '针对零部件与整车的专业包装与加固方案。'],
      ['assets/pages/consumer-adv-8.png', '供应链协同', '与主机厂、供应商和售后渠道高效协同。']
    ],
    scenario: {
      title: '整车厂、零部件供应商与汽后渠道',
      text: '汽车供应链链条长、协同要求高。京东物流以入厂物流、备件仓配与整车运输能力，帮助客户提升供应链效率与服务响应速度。',
      bullets: ['入厂物流与线边配送', '售后备件前置仓布局', '整车与零担运输组合'],
      image: 'assets/img/industry-car.jpg',
      imageAlt: '汽车行业物流场景'
    },
    related: [
      ['快运服务', '覆盖全国的重货与整车运输服务', 'assets/pages/freight-hero.jpg', 'freight.html'],
      ['仓配一体服务', '仓运配一体化供应链服务', 'assets/pages/related-warehouse.jpg', 'supply-chain.html'],
      ['运力服务', '公路、铁路、航空多层次运力组合', 'assets/icons/svc-capacity.png', 'services.html#capacity']
    ],
    ctaTitle: '让汽车供应链更敏捷',
    ctaText: '获取入厂物流与售后备件方案'
  }
};

const featuredNews = [
  {
    id: '8364', slug: 'news-8364.html', title: '一图看懂！京东物流前三季度经营利润同比增长39.2%，显著提升，整体经营高质量健康发展',
    date: '2026-11-17', dateLabel: '2026.11.17', category: '企业动态',
    image: 'assets/img/news-1.png', thumb: 'assets/pages/news-thumb-1.jpg',
    excerpt: '京东物流发布前三季度业绩，经营利润同比增长39.2%，整体经营保持高质量健康发展。',
    body: [
      '京东物流日前发布前三季度业绩报告。报告显示，公司经营利润同比增长39.2%，收入结构与经营质量持续改善，一体化供应链服务能力进一步增强。',
      '报告期内，京东物流持续深耕快消、服饰、家电、3C、汽车、生鲜等行业，以仓配一体、快递快运、大件、冷链与国际物流等服务组合，帮助客户提升履约效率、降低供应链成本。',
      '同时，京东物流持续推进物流科技与绿色供应链建设，通过自动化、数字化与新能源运力，打造更高效、更可持续的物流基础设施。',
      '面向未来，京东物流将继续以技术驱动，完善全球供应链网络，与合作伙伴共同推动实体经济高质量发展。'
    ],
    stats: [['639.5 亿元', '第三季度总收入'], ['39.2%', '经营利润同比增长'], ['301.9 亿元', '外部一体化供应链收入'], ['337.6 亿元', '其他客户收入']],
    tags: ['业绩发布', '一体化供应链', '高质量发展'],
    featured: true
  },
  {
    id: '7577', slug: 'news-7577.html', title: '一图读懂京东物流2025年ESG报告', date: '2026-04-25', dateLabel: '2026.04.25', category: 'ESG',
    image: 'assets/img/news-2.jpg', thumb: 'assets/img/news-2.jpg',
    excerpt: '京东物流发布2025年ESG报告，展示在绿色供应链、社会责任与公司治理方面的持续实践。',
    body: [
      '京东物流正式发布2025年ESG报告，系统披露公司在环境、社会与公司治理方面的关键进展。',
      '在环境方面，京东物流持续推进绿色仓储、绿色运输与循环包装，推动全链路减碳；在社会方面，持续关注员工发展、乡村振兴与应急物流保障。',
      '未来，京东物流将继续把可持续发展融入业务运营，与上下游伙伴共同建设绿色、韧性的供应链体系。'
    ],
    tags: ['ESG', '绿色供应链', '可持续发展'],
    featured: true
  },
  {
    id: '7569', slug: 'news-7569.html', title: '全球最高标准 京东物流斩获国际软件研发诺贝尔奖', date: '2026-04-23', dateLabel: '2026.04.23', category: '企业动态',
    image: 'assets/img/news-3.jpg', thumb: 'assets/img/news-3.jpg',
    excerpt: '京东物流软件研发能力获得国际权威认可，达到全球最高标准。',
    body: [
      '京东物流软件研发能力获得国际权威机构认可，斩获国际软件研发领域重要奖项，达到全球最高成熟度标准。',
      '这一成果体现了京东物流在供应链系统、智能仓储、运输调度与数据平台等领域的长期技术投入。',
      '京东物流将继续以软件与算法为核心，推动物流基础设施的数字化、智能化升级。'
    ],
    tags: ['技术研发', '软件成熟度', '物流科技'],
    featured: true
  },
  {
    id: '6402', slug: 'news-6402.html', title: '服务获权威认可！京东物流旗下JD Express Investment获香港海关AEO认证', date: '2025-08-14', dateLabel: '2025.08.14', category: '企业动态',
    image: 'assets/img/news-4.png', thumb: 'assets/img/news-4.png',
    excerpt: '京东物流旗下 JD Express Investment 获香港海关 AEO 认证，国际物流服务能力再获认可。',
    body: [
      '京东物流旗下 JD Express Investment 获得香港海关 AEO 认证，标志着公司在国际贸易合规、供应链安全与通关效率方面达到权威标准。',
      'AEO 认证将有助于提升跨境物流通关效率，为客户提供更稳定、更高效的国际供应链服务。',
      '京东物流将继续完善全球物流网络，助力中国品牌出海与全球商品进入中国。'
    ],
    tags: ['国际物流', 'AEO认证', '跨境服务'],
    featured: true
  }
];

const listNews = [
  {
    id: '8364', slug: 'news-8364.html', title: '一图看懂！京东物流前三季度经营利润同比增长39.2%，显著提升，整体经营高质量健康发展',
    date: '2026-11-17', dateLabel: '2026.11.17', category: '企业动态', image: 'assets/pages/news-thumb-1.jpg',
    excerpt: '京东物流发布前三季度业绩，经营利润同比增长39.2%，整体经营保持高质量健康发展。'
  },
  {
    id: 'ic-china', slug: 'news-ic-china.html', title: '推出半导体行业首个智能物流解决方案！京东物流亮相 IC China 2026',
    date: '2026-11-16', dateLabel: '2026.11.16', category: '行业洞察', image: 'assets/pages/news-thumb-2.jpg',
    excerpt: '京东物流在 IC China 2026 展示半导体行业智能物流解决方案，以自动化与数字化能力服务高端制造。'
  },
  {
    id: 'xinjiang', slug: 'news-xinjiang.html', title: '京东物流开通新疆大型无人机货运航线，行业首次投用于11.11，较陆运时效提升近1倍',
    date: '2026-11-09', dateLabel: '2026.11.09', category: '企业动态', image: 'assets/pages/news-thumb-3.jpg',
    excerpt: '京东物流在新疆开通大型无人机货运航线，并首次在 11.11 期间投入使用，大幅提升偏远地区时效。'
  },
  {
    id: 'green-design', slug: 'news-green-design.html', title: '物流行业唯一！京东物流获2026绿色设计ESG领军企业奖',
    date: '2026-10-30', dateLabel: '2026.10.30', category: 'ESG', image: 'assets/pages/news-thumb-4.jpg',
    excerpt: '京东物流凭借绿色供应链实践获得 2026 绿色设计 ESG 领军企业奖，为物流行业唯一获奖企业。'
  },
  {
    id: 'seafood', slug: 'news-seafood.html', title: '一体化冷链“上岸即锁鲜”！京东物流首个海鲜产地冷链仓落地广东阳江',
    date: '2026-10-30', dateLabel: '2026.10.30', category: '行业洞察', image: 'assets/pages/news-thumb-5.png',
    excerpt: '京东物流首个海鲜产地冷链仓落地广东阳江，以一体化冷链能力助力海鲜从产地直达餐桌。'
  },
  {
    id: 'europe-warehouse', slug: 'news-europe-warehouse.html', title: '京东物流近30个欧洲仓库获全球供应链安全权威标准认证',
    date: '2026-10-30', dateLabel: '2026.10.30', category: '企业动态', image: 'assets/pages/news-thumb-6.jpg',
    excerpt: '京东物流近 30 个欧洲仓库获得全球供应链安全权威标准认证，海外仓服务能力持续提升。'
  },
  {
    id: 'double11', slug: 'news-double11.html', title: '“护航11.11，又快又省心！”京东物流系列好服务落地，AI新成果全面应用',
    date: '2026-10-16', dateLabel: '2026.10.16', category: '企业动态', image: 'assets/pages/news-thumb-7.jpg',
    excerpt: '京东物流 11.11 服务保障全面升级，AI 新成果在仓储、分拣、配送等场景落地应用。'
  },
  {
    id: 'csa', slug: 'news-csa.html', title: '再获高分！京东物流标普CSA评分保持中国内地物流行业第一，ESG贡献获全球权威机构高度认可',
    date: '2026-10-10', dateLabel: '2026.10.10', category: 'ESG', image: 'assets/pages/news-thumb-8.jpg',
    excerpt: '京东物流标普 CSA 评分继续保持中国内地物流行业第一，可持续发展表现获国际认可。'
  },
  {
    id: 'ciftis', slug: 'news-ciftis.html', title: '国际服务获权威认可！京东物流入选服贸会2026赋能企业“出海”示范案例',
    date: '2026-09-11', dateLabel: '2026.09.11', category: '企业动态', image: 'assets/pages/news-thumb-9.jpg',
    excerpt: '京东物流入选服贸会 2026 赋能企业“出海”示范案例，国际供应链服务能力再获认可。'
  },
  {
    id: 'typhoon', slug: 'news-typhoon.html', title: '台风“沙德尔”与“紫檀”影响快递时效的温馨提示',
    date: '2026-08-25', dateLabel: '2026.08.25', category: '服务公告', image: 'assets/pages/news-thumb-10.png',
    excerpt: '受台风影响，部分地区快递时效可能有所延迟，京东物流已启动应急预案，全力保障快件安全。'
  }
];

// Featured items not present in the ten-row list still get article pages.
const extraArticles = featuredNews.filter((item) => !listNews.some((row) => row.id === item.id));
const allArticles = [...listNews, ...extraArticles];

const aboutTimeline = [
  { year: '2017', title: '京东物流集团成立', text: '京东物流集团成立，全面开放外部服务。同一年，建成了全球首个 B2C 全流程无人仓。', image: 'assets/pages/about-hero.png' },
  { year: '2018', title: '配送机器人落地公共道路', text: '京东配送机器人开始运营于北京市公共道路，探索末端配送智能化。', image: 'assets/pages/about-sustain-2.jpg' },
  { year: '2019', title: '推动包装标准与供应链平台', text: '与七家机构一起发起成立中国电商物流行业包装标准联盟，并启动供应链产业平台。', image: 'assets/pages/about-sustain-3.jpg' },
  { year: '2021', title: '香港联交所挂牌上市', text: '京东物流在香港交易所挂牌上市，开启新的发展阶段。', image: 'assets/pages/about-sustain-4.jpg' },
  { year: '2022', title: '外部一体化供应链持续增长', text: '外部一体化供应链客户数和单客户平均收入持续增长，服务能力进一步获得市场验证。', image: 'assets/pages/about-history-2.jpg' },
  { year: '2023', title: '组织升级，四大事业部成立', text: '京东物流组织结构调整，成立供应链、快递、快运、国际业务等四大独立事业部。', image: 'assets/pages/about-other-1.jpg' },
  { year: '2024', title: '入选标普可持续发展年鉴', text: '京东物流首次入选标普全球《2024 可持续发展年鉴（中国版）》。', image: 'assets/pages/about-history-1.jpg' },
  { year: '2025', title: '欧洲物流网络启动', text: '京东自建欧洲物流网络启动，推出 Joyexpress 快递品牌。', image: 'assets/pages/about-cta.jpg' }
];

module.exports = { services, products, industries, featuredNews, listNews, allArticles, aboutTimeline };
