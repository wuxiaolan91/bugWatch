const PerformanceModel = require('../models/performanceModel.js');
const performanceObj = {
  * addPerformance () {
    const timing = this.request.body;
    const newPerformance = yield new PerformanceModel.save();
    this.body = newPerformance;
  }
}
module.exports = performanceObj;
