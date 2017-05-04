<template>
  <div>
    <project-card :name="name" :project-id="projectId"></project-card>
    通过邮箱/姓名添加成员
    <el-select v-model="selUser" placeholder="请选择">
      <el-option
        v-for="item in userList"
        :key="item._id"
        :label="item.name"
        :value="item._id">
      </el-option>
    </el-select>
    <el-button id="add-project-btn" type="text" @click="addUserToProject">添加到项目</el-button>
    <el-option
    <section>
      成员列表
      <el-table v-loading.body="loading"
                :data="projectUserList"
                stripe
                style="width: 100%">
        <el-table-column prop="email"
                         width="150"
                         label="登录账号">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="应用角色"
                         width="100">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
import projectCard from './children/projectCard.vue';
export default {
  data() {

    return {
      loading: false,
      projectId: '',
      selUser: '',
      timeout: null,
      name: '',
      projectUserList: [],
      userList: []
    }
  }, created() {
    this.projectId = this.$route.query.id;
    this.getProjectById();
    this.getUserList();
  }, methods: {
   
    getProjectById() {
      this.$http.get('/api/project/getProjectById', {
        params: {
          projectId: this.projectId
        }
      }).then(res => {
        let project = res.data;
        this.name = project.name;
        let userList = project.userList;
        project.userList.forEach(item => {
          let roleName = this.showRole(item.roleId);
          item.roleName = roleName;
        })
        this.projectUserList = project.userList;
      })
    },
    /**
     * 获取所有的用户列表
     */
    getUserList() {
      this.$http.get('/api/user/getUserList')
        .then((res) => {
          this.loading = false;
          if (res.data) {
            this.userList = res.data;
          }
        })

    },
    addUserToProject () {
      if (!this.selUser) {
        this.$message.warning('请先选择一位用户');
        return;
      }
      this.$http.get('/api/project/updateProject', {
        params: {
          projectId: this.projectId,
          userId: this.selUser,
          roleId: 1
        }
      }).then(res => {
        debugger;
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    showRole (roleId) {
      roleId = Number(roleId);
      switch (roleId) {
        case 1:
          return 'user';
          break;
        case 2:
          return 'Administer';
          break;
        case 3:
          return 'Owner'
          break;
      }
    },
    handleSelect (item) {

    }
  }, computed: {

  }, components: {
    projectCard
  }
}
</script>
<style lang="less">
.el-card {
  margin-bottom: 20px;
}
ul {
  list-style: none;
  line-height: 2;
  li {
    
  }
}
</style>