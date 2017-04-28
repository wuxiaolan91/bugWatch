
<template>
  <header>
    <!--<p id="website-desc">帮你监控错误，性能<p>-->
    <div class="left">
      <h1>bugWatch</h1>
      <el-select v-model="projectId"
                 @change="changeProject"
                 placeholder="默认网站">
        <el-option v-for="item in projectList"
                   :label="item.name"
                   :value="item.projectId">
        </el-option>
      </el-select>
    </div>
    <div class="right">
      <el-dropdown @commond="handleCommond">
        <span class="el-dropdown-link">
          {{ name }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/project?type=list">项目列表</router-link>
          </el-dropdown-item>
          <!--<el-dropdown-item>项目成员</el-dropdown-item>-->
          <el-dropdown-item>
            <router-link to="/project?type=add">添加项目</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/addUser">添加用户</router-link>
          </el-dropdown-item>
          <el-dropdown-item commond="exit"><span @click="exitBtn">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      name: localStorage.name,
      projectId: '',
      projectList: []
    }
  },
  created() {
    // this.projectId = localStorage.getItem('projectId');
    this.getProjectList();
  }, methods: {
    changeProject() {
      console.log('改变项目啦，来自改变项目的change事件');
      EventBus.$emit('projectChange', this.projectId)
    },
    exitBtn () {
      alert('退啊')
     localStorage.removeItem('name');
        this.$router.push('/login');
    },
    handleCommond(commond) {
      if (commond == 'exit') {
        localStorage.removeItem('name');
        this.$router.push('/login');
      }
      
    },
    /**
     * 显示页面头部的项目列表
     */
    getProjectList() {
      this.$http.get('/api/project/getProjectList')
        .then((res) => {
          if (res.data) {
            this.projectList = res.data;
            console.dir(this.projectList);
            if (this.projectList.length) {
              if (!this.projectId) {
                this.projectId = this.projectList[0].projectId;
                localStorage.setItem('projectId', this.projectId);
              }

            } else {
              localStorage.removeItem('projectId');
              this.$message('您还没有添加过项目，需要先添加一个项目');
              this.$router.push('/project?type=add')
            }
          }
        })
    }
  },
  events: {
    exitBtn () {
      alert('退啊2')
    }
  }, watch: {
    projectId(value) {
      console.log('value:' + value);
      if (value!= undefined) localStorage.setItem('projectId', value);

    }
  }
}
</script>
<style lang="less" scoped>
#website-desc {
  width: 250px;
  margin: 0 auto;
  line-height: 70px;
}

.el-select {
  margin-bottom: 0;
  float: none;
}

header {
  position: fixed;
  z-index: 2;
  height: 70px;
  width: 100%;
  line-height: 30px;
  background-color: #20a0ff;
  overflow: hidden;
  color: white;
  .left,
  .right {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .left {
    float: left;
  }
  .right {
    right: 0;
    color: white;
    padding-right: 30px;
    cursor: pointer;
  }
}

h1 {
  display: inline;
  margin-left: 25px;
  margin-right: 50px;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>
