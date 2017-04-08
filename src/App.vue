<template>
  <div id="app">
    <div id="nav-wrap">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <router-link to="/dashboard"><i class="el-icon-message"></i>Dashboard
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/bugList"><i class="el-icon-menu"></i>日志列表</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/ajax"><i class="el-icon-setting"></i>Ajax日志</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/email"><i class="el-icon-setting"></i>邮件通知</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="wrap">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
#wrap {
  position: relative;
  margin-left: 220px;
  right: 10px;
}
#nav-wrap {
  display: inline-block;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  width: 200px;
  padding-top: 20px;
  background-color: #eef1f6;
}
</style>
