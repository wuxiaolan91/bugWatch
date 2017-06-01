const mongoose = require('mongoose');
const PerformanceModel = mongoose.Schema;
let performanceModel = new PerformanceModel({
  whiteScheen: { // 白屏时间
    type: String,
    required: true
  },
  loadPage: { // 页面加载完成的时间：这几乎代表了用户等待页面可用的时间
    type: String,
    required: true
  },
  domReady: String, // 解析DOM树的时间
  lookupDomain: String, // DNS查询时间。DNS预加载做了么。页面内是不是使用太多不同的域名导致域名查询时间过长？
});