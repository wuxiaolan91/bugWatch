<style src="./assets/less/reset.less" lang="less"></style>
<template>
  <div id="app">
    <Top v-if="isLogin"></Top>
    <div id="nav-wrap" class="left-bar" v-if="isLogin">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <router-link to="/dashboard"><i class="el-icon-message"></i>Dashboard
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/bugList"><i class="el-icon-menu"></i>js日志列表</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/ajax"><i class="el-icon-setting"></i>Ajax日志</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/rule"><i class="el-icon-setting"></i>邮件通知</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="wrap">
      <router-view></router-view>
    </div>
  
  </div>
</template>
<script>
import Top from '@/components/common/header.vue';
export default {
  name: 'app',
  data () {
    return {
      isLogin: true
    }
  },
  components: {
    Top
  }
  ,
  created () {
    const userId = localStorage.getItem('userId');
    if (!userId) this.isLogin = false;
    EventBus.$on('isLogin', isLogin => {
      this.isLogin = isLogin;
    })
  },
  mounted () {
    console.log(bug)
  }
}

;
</script>

<style lang="less">
@top: 70px;
@navWidth: 200px;
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#wrap {
  position: fixed;
  left: @navWidth;
  right: 0;
  bottom: 0;
  top: @top;
  padding:20px;
  overflow: auto;
}
  .left-bar {
    text-align: left;
    padding-top: 0!important;
    border-right: 1px solid #ddd;
    position: fixed;
    width: 220px;
    top: 40px;
    left: 0;
    bottom: 0;
    padding: 0;
    z-index: 2;
    background-color: #f4f5f9;
    overflow: auto;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s; }
  .left-bar ul {
    padding: 0;
    margin: 0; }
  .left-bar ul > li {
    padding: 0!important;
    border-bottom: 1px solid #eaeefb; }
  .left-bar ul > li a {
    display: block;
    width: 100%;
    padding: 15px 20px;
    color: #1f2f3d;
    line-height:1em;
    cursor: pointer;
    box-sizing: border-box;
    text-decoration: none; }
  .left-bar ul > li a .el-icon-arrow-down {
    float: right;
    margin-top: 4px;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s; }
  .left-bar ul > li a.router-link-active {
    color: #20a0ff;
    border-right: 3px solid #20a0ff;
    background-color: #fff; }
  .left-bar ul > li .nav-sub {
    width: 100%;
    display: none; }
  .left-bar ul > li .nav-sub > li a {
    padding-left: 40px; }
  .left-bar ul > li.expand-submenu .el-icon-arrow-down {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg); }
  .left-bar ul > li.expand-submenu .nav-sub {
    display: block; }
  .el-menu-item, .el-submenu__title {
    height: auto;
  }
#nav-wrap {
  display: inline-block;
  position: fixed;
  left: 0;
  top: @top;
  bottom: 0px;

  width: @navWidth;
  padding-top: 10px;
  background-color: #eef1f6;
}
.el-card {

  margin-bottom: 2rem;
  line-height: 2;
  ul {
    list-style: none;
  }
}
</style>