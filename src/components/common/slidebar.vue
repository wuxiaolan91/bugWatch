<style lang="less" scoped>
  .sliderbar {
    text-align: left;
    position: absolute;
    z-index: 1;
    top: 0;
    height: 100%;
    padding-top: 50px;
    background-color: #222d32;
    width: 230px;
    color: #b8c7ce;
  li {
    padding: 12px 5px 12px 30px
  }

    a {
      text-decoration: none;
      color: #b8c7ce;
      cursor: pointer;
    }
    a:hover {
      color: white;
    }
  }
</style>
<template>
  <div class="sliderbar">
<ul>
  <li>
    <router-link to="/"> bug统计</router-link>
  </li>
  <li>
    <router-link to="/email">发送邮件</router-link>
  </li>
  <li>
    <router-link to="/login">登录</router-link>
  </li>
</ul>
  </div>
</template>

