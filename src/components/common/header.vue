<style lang="less" scoped>
  header {
    position: relative;
    z-index: 2;
    min-height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: #3c8dbc;
    overflow: hidden;
    color: white;

    .left {
      width: 230px;
      float: left;
    }
    .right {
      float: right;
      color: white;
      padding-right: 30px;
      cursor: pointer;
    }
  }
</style>
<template>
<header>
    <div class="left">
      前端bug系统
    </div>
  <div class="right">
    登录
  </div>
</header>
</template>
