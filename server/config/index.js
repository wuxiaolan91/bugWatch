'use strict';

const path = require('path');
const _ = require('lodash');

//获取环境变量值
function requiredProcessEnv(name) {
  if (!process.env[name]) {
    console.error('You must set the ' + name + ' environment variable');
  }
  return process.env[name] || 'development';
}

// 初始化基础配置数据
// ============================================
const all = {
  env: requiredProcessEnv('NODE_ENV'),
  root: path.normalize(__dirname + '/../..'),
  port: process.env.PORT || 3000
};
// 根据环境变量合成配置
// ==============================================
module.exports = Object.assign(
  all,
  require('./local.config.js') || {})
