<template>
  <div>
    <el-button id="add-project-btn" type="text" @click="OpenAddProject">添加项目</el-button>
    <el-table v-loading.body="loading" :data="projectList" stripe style="width: 100%">
      <el-table-column prop="name" label="项目名(比如百度)"></el-table-column>
      
      <el-table-column prop="_id" label="项目id"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="delProject(scope.$index, scope)">

            删除
          </el-button>
          <el-button type="text"
                     @click.native.prevent="editProject(scope.$index, scope)"
                     size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      user: {}
    }
  },
  created() {
    const type = this.$route.query.type;
    if (type == 'add') {
      this.OpenAddProject();
    }
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }

  },
  computed: {
    projectList() {
      return this.$store.state.projectList;
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      const type = this.$route.query.type;
      if (type == 'add') {
        console.log('是公司')
        this.OpenAddProject();
      }
    },
    /**
     * 打开增加项目的弹窗
     */
    OpenAddProject() {
      this.$prompt('请输入项目的名字', '添加新项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'

      }).then(value => {
        const newProjectName = value.value;
        this.addProject(newProjectName);

      }).
        catch(value => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      addProject(projectName) {
        const newProject = {
          name: projectName,
          
          userList: [{
            userId: localStorage.getItem('userId'),
            roleId: 3
          }]
        };
        this.$http.post('/api/project/addProject', newProject).then((res) => {
          if (res.status = 200) {
            let project = res.data;
            this.$message({
              type: 'success',
              message: '你的项目是: ' + projectName
            });
            if (this.projectList.length < 1) {
              let projectId = project._id;
              localStorage.setItem('projectId', projectId);
              this.$router.push(`/project?id=${projectId}`);
            }
            newProject._id = project._id;
            this.$store.commit('addProject', newProject);
          }
        })
      },
      editProject(index, scope) {
        // 当前激活项目变成这个项目
        this.$store.commit('changeProject', {
          projectId: scope.row._id,
          projectName: scope.row.name
        })
        this.$router.push(`/project?id=${scope.row._id}`)
      },
      /**
       * 删除一个项目
       * @param {Number} 项目在项目列表里的索引
       * @project {Object} 当前项目的数据
       */
      delProject(index, project) {
        this.$msgbox({
          title: '删除项目',
          message: `是否删除项目：${project.row.name}`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              let projectId = this.projectList[index]._id;
              if (!projectId) {
                this.$message.warning('没有找到你要删除的项目的id');
              }
              this.$http.get('/api/project/removeProjectById', {
                params: {
                  projectId: projectId,
                  companyId: localStorage.getItem('companyId')
                }
              }).then(res => {
                instance.confirmButtonLoading = false;
                done();
                if (res.data.ok) {
                  
                  this.$message({
                    message: '删除项目成功',
                    type: 'success'
                    
                  });
                  // this.projectList.splice(index, 1);
                  this.$store.commit('deleteProject', project.row);
                  if (this.projectList.length == 0) {
                    localStorage.removeItem('projectId');
                    this.$router.push('/projectList?type=list');
                  }
                } else {
                  this.$message.error('删除项目失败');
                }
              }).
              catch(rej => {
                instance.confirmButtonLoading = false;
                done();
                this.$message.error('删除项目失败');
              })
            } else {
              done();
            }
          }
        })
      },
      /**
       * 生成一个项目id
       */
      addProjectId() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
      /**
       *
       */
       getProjectList() {
        this.loading = true;
        this.$http.get('/api/project/getProjectList', {
          params: {
            userId: this.user._id
          }
        }).then((res) => {
          this.loading = false;
          if (res.data) {
            this.projectList = res.data;
          }
        })
    },
    /**
     * 生成一个项目id
     */
    addProjectId() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    /**
     *
     */
    getProjectList() {
      this.loading = true;
      this.$http.get('/api/project/getProjectList', {
        params: {
          userId: this.user._id
        }
      }).then((res) => {
        this.loading = false;vfff
        if(res.data) {
          this.projectList = res.data;
        }
      })
    }
  }
}
</script>
<style lang="less">
#add-project-btn {
  float: right;
}
</style>
