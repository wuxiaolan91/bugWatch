<template>
  <div id="app">
    <div id="nav-wrap">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-message"></i>
          <router-link to="/dashboard">Dashboard</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <router-link to="/list">日志列表</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <router-link to="/ajax">Ajax日志</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <router-link to="/email">邮件通知</router-link>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#wrap {
  position: fixed;
  top: 30px;
  left: 220px;
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
