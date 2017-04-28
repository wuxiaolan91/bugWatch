<template>
<div>
  <el-button id="add-project-btn" type="text" @click="OpenAddProject">添加项目</el-button>
  <el-table
    v-loading.body="loading"
    :data="projectList"
    stripe
    style="width: 100%"
    >
    <el-table-column
    prop="name"
    width="150"
    label="项目名(比如百度)">
  </el-table-column>
  <el-table-column
    prop="projectId"
    label="项目id">
  </el-table-column>
  <el-table-column
    fixed="right"
    label="操作"
    width="100">
        <template scope="scope">
          <el-button 
            @click.native.prevent="delProject(scope.$index, scope)"
            type="text"
            size="small">删除</el-button>
          <el-button
            type="text"
            size="small">编辑</el-button>
        </template>
      </el-table-column>
</el-table>

</div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        projectList: [] // 项目列表
      }
    },
    created  () {
      const type = this.$route.query.type;
      this.getProjectList();
      if (type == 'add') {
        this.OpenAddProject();
      }


    },
    methods: {
      /**
       * 打开增加项目的弹窗
       */
      OpenAddProject() {
        this.$prompt('请输入项目的名字', '添加新项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'

        }).then(({ value }) => {
          this.addProject(value);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      addProject (projectName) {
        const newProject = {
           name: projectName,
          projectId: this.addProjectId()
        };
        this.$http.post('/api/project/addProject', newProject)
          .then((res) => {
            if (res.status = 200) {
              this.$message({
                type: 'success',
                message: '你的项目是: ' + projectName
              });
              if (this.projectList.length <1) {
                localStorage.setItem('projectId', res.projectId);
                this.$router.push('/');
              }
              this.projectList.push(newProject);
            }
          })
      },
      /**
       * 删除一个项目
       * @param {Number} 项目在项目列表里的索引
       * @project {Object} 当前项目的数据
       */
      delProject (index, project) {
              debugger;

      let projectId = this.projectList[index]._id;
      this.$http.get('/api/project/removeProject', {
        params: {
          projectId
        }
      }).then(res => {
          if (res.data.ok) {
            this.$message({
              message: '删除项目成功',
              type: 'success'
            });
            this.projectList.splice(index, 1);
            if (this.projectList.length == 0) {
              localStorage.removeItem('projectId');
              this.$router.push('/project?type=add');
            }
          } else {
            this.$message.error('删除项目失败');
          }
        })
      },
      /**
       * 生成一个项目id
       */
      addProjectId () {
        function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      },
      /**
       *
       */
      getProjectList () {
        this.loading = true;
        this.$http.get('/api/project/getProjectList')
          .then((res) => {
            this.loading = false;
            if (res.data) {
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
