
<template>
  <header>
    <!--<p id="website-desc">帮你监控错误，性能<p>-->
    <div class="left">
      <h1>bugWatch</h1>
      <el-select
        :value="projectId"
        @input="changeProject"

        placeholder="默认网站">
        <el-option
          v-for="item in projectList"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
      
    </div>
    <div class="right">
      <el-dropdown >
        <span class="el-dropdown-link">
            {{ name }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <router-link to="/projectList?type=list">项目列表</router-link>
          </el-dropdown-item>
          <el-dropdown-item >
            <router-link to="/projectList?type=add">添加项目</router-link>
          </el-dropdown-item>
          <el-dropdown-item >
            <router-link to="/project">添加用户</router-link>
        </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/company"><span>公司设置</span></router-link>
          </el-dropdown-item>
          <el-dropdown-item ><span @click="exitBtn">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      name: localStorage.name
    }
  },
  created () {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    } else {
      this.user = {};
    }
    if (this.user._id) {
      this.getProjectList();
    }
    
  },
  computed: {
    projectId () {
      return this.$store.state.projectId;
    },
    projectList () {
      return this.$store.state.projectList;
    },
    gradeId () {
      return this.$store.state.user.gradeId
    }
  }
  , methods: {
    changeProject(projectId) {
      this.$store.commit('changeProject', {
          projectId: projectId
        })
    },
    exitBtn() {
      localStorage.clear();
      // this.$store.isLogin = false;
      EventBus.$emit('isLogin', false)
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
      this.$http.get('/api/project/getProjectList', {
        params: {
          userId: this.user._id
        }
      })
        .then(res => {
          if (res.data) {
            const projectList = res.data;

            if (projectList.length) {
                localStorage.setItem('projectId', this.projectId);
                this.projectId = projectList[0]._id;
                this.$store.commit('getProjectList', projectList);
            } else {
              if (localStorage.getItem('companyId')) {
                 localStorage.removeItem('projectId');
                this.$message('您还没有添加过项目，需要先添加一个项目');
                this.$router.push('/projectList?type=add')
              } else {
                // this.$router.push('/projectList?type=add')
              }
             
            }
          }
        })
    }
  },
  watch: {
    projectId(value) {
       this.$store.commit('changeProject', {
        projectId: this.projectId
      })
      if (value) localStorage.setItem('projectId', value);

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
li {
  span {
    display: block;
  }
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
