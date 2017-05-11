<template>
  <div>
    <project-card :name="name" :project-id="projectId"></project-card>
    通过邮箱/姓名添加成员
    <el-select v-model="selUser" placeholder="请选择">
      <el-option
        v-for="item in canAddUserList"
        :key="item._id"
        :label="item.name"
        :value="item._id">
      </el-option>
    </el-select>
    <el-button id="add-project-btn" type="text" @click="addUserToProject">添加到项目</el-button>

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
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template scope="scope">
            <el-button
              v-if="scope.row.roleId!=3"
              @click.native.prevent="delUserFromProject(scope.$index, scope)"
              type="text"
              size="small">删除</el-button>

          </template>
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
      canAddUserList: [], //公司里还没有进这个项目的用户列表
    }
  }, computed: {
    projectId () {
      return this.$route.state.projectId
    }

  }, created() {
    this.projectId = this.$route.query.id;
    this.getProjectById();
    this.getCompanyById();
  },
  watch: {
    projectId () {
      debugger;
      this.getProjectById();
    }
  },
  methods: {

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
        console.log(this.projectUserList)
      })
    },
    getCompanyById () {
      this.$http.get('/api/company/getCompanyById').then(res => {
        this.loading = false;
        if (res.data) {
          let company = res.data;
          let companyUserList = company.userList; // 公司的用户列表
          let canAddUserList = []; //该项目里没有的本公司人员列表
          if (companyUserList && companyUserList.length >= 1) { // 用户可以添加的列表里需要删除已经在本项目里的用户
            companyUserList.forEach((companyUser, index) => {
              let isRepeat = true;
              this.projectUserList.every(projectUser=> {
                
                if (companyUser._id == projectUser._id) {
                isRepeat = false;
                }
              })
              if (isRepeat) canAddUserList.push(companyUser);
            })
          } else {
            canAddUserList = [];
          }
          
          this.canAddUserList = canAddUserList;
          this.$store.commit('getCompany',{
            companyId: company._id,
            companyName: company.companyName,
            ownerId: company.ownerId,
            ownerName: company.ownerName
          });
        }
        
      })
    },
    addUserToProject () {
      if (!this.selUser) {
        this.$message.error('请先选择一位用户');
        return;
      }
      this.$http.get('/api/project/updateProject', {
        params: {
          projectId: this.projectId,
          userId: this.selUser,
          roleId: 1
        }
      }).then(res => {
        if (res.data) {
          let newUser = res.data;
          this.projectUser.push(newUser);
        }
      })
    },
    delUserFromProject (index,item) {
      console.log(item)
      this.$msgbox({
        title: '删除用户',
        message: `是否删除用户：${item.row.name}`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose:(action, instance, done)=>{
          if (action == 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.$http.get('api/project/delUserFromProject',{
              params: {
                projectId: this.projectId,
                userId: item.row._id,
                roleId: item.row.roleId
              }
            }).then(res =>{
              instance.confirmButtonLoading = false;
              console.log(res)
              if(res.data.ok) {
                this.projectUserList.splice(index,1)
                this.$message.success('删除用户成功');
              } else {
                this.$message.error('删除用户失败');
              }

              done()
            }).catch(res =>{
              this.$message.error('删除用户失败');
              done();
            })
          } else {
            done()
          }
        }
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
  }, components: {
    projectCard
  }
}
</script>
<style lang="less">
.el-card {
  margin-bottom: 20px;
}
ul.project-describe {
  list-style: none;
  display:flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
  height:100%;


  li {
   i {
     margin-right:3px
   }
    span {
       margin-right:10px
    }
  }
}


</style>
