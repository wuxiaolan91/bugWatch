
<template>
<header>
  帮你监控网站的错误，性能
    <div class="left">
      <h1>bugWatch</h1>
      <el-select v-model="projectId" @change="changeProject" placeholder="默认网站">
        <el-option
          v-for="item in projectList"
          :label="item.name"
          :value="item.projectId">
        </el-option>
      </el-select>
    </div>
  <div class="right">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ name }}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/project?type=list">项目列表</router-link>
        </el-dropdown-item>
        <el-dropdown-item>项目成员</el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/project?type=add">添加项目</router-link>
        </el-dropdown-item>
        <el-dropdown-item ><span @click="exitBtn">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</header>
</template>
<script>
export default {
  data () {
    return {
      name: localStorage.name,
      projectId: '',
      projectList: []
    }
  },
  created () {
   this.projectId = localStorage.getItem('projectId');
    this.getProjectList();
  }, methods: {
    changeProject () {
      console.log('改变项目啦，来自改变项目的change事件');
       EventBus.$emit('projectChange', this.projectId)
    },
    exitBtn () {
      localStorage.removeItem('name');
      this.router.push('login');
    },
      /**
       * 显示页面头部的项目列表
       */
      getProjectList () {
        this.$http.get('/api/project/list')
          .then((res) => {
            if (res.data) {
              this.projectList = res.data;
              console.dir(this.projectList);
              if (this.projectList.length) {
                if (!this.projectId) {
                  this.projectId = this.projectList[0].projectId;
                }
                localStorage.setItem('projectId', this.projectId);
              }
            }
          })
      }
  }, watch: {
    projectId (value) {
      console.log('value:' + value);
      if (value) localStorage.setItem('projectId', value);
      
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  float: none;
}
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
      float: left;
    }
    .right {
      float: right;
      color: white;
      padding-right: 30px;
      cursor: pointer;
    }
  }
  h1 {
    display: inline;
    margin-left: 25px;
    margin-right: 25px;
    font-size: 36px;
    vertical-align: middle;
  }
</style>
