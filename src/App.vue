<style src="./assets/less/reset.less" lang="less"></style>
<template>
  <div id="app">
    <Top></Top>
    <div id="nav-wrap">
      <el-menu default-active="2"
               class="el-menu-vertical-demo">
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
  components: {
    Top
  }
  ,
  created () {
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
  left: @navWidth + 10px;
  right: 10px;
  top: @top + 10px;
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
</style>
