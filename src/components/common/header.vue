
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
          <el-dropdown-item v-if="user.gradeId > 1">
            <router-link to="/projectList?type=list">项目列表</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="user.gradeId > 1">
            <router-link to="/projectList?type=add">添加项目</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="user.gradeId==3">
            <router-link to="/addUser">添加用户</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="user.gradeId==3">
            <router-link to="/company">公司设置</router-link>
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
      name: localStorage.name,
      projectId: '',
      user: {
        gradeId: 0
      },
      projectList: []
    }
  },
  created () {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      console.log('user', this.user);
      this.user = JSON.parse(userInfo);
    } else {
      this.user = {};
    }
    if (this.user._id) {
      this.getProjectList();
    }
    
  }, methods: {
    changeProject() {
      console.log('改变项目啦，来自改变项目的change事件');
      EventBus.$emit('projectChange', this.projectId)
    },
    exitBtn() {
      console.log('退出')
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
      console.log('headeer组件 - 拿项目列表')
      this.$http.get('/api/project/getProjectList', {
        params: {
          userId: this.user._id
        }
      })
        .then(res => {
          if (res.data) {
            this.projectList = res.data;
            console.dir(this.projectList);
            if (this.projectList.length) {
              if (!this.projectId) {
                this.projectId = this.projectList[0]._id;
                localStorage.setItem('projectId', this.projectId);
              }

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
      console.log('value:' + value);
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
