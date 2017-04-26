<template>
<div>
  <el-button id="add-project-btn" type="text" @click="OpenAddProject">添加项目</el-button>
  <el-table
  v-body-loading="loading"
  :data="projectList"
  style="width: 500px;margin:0 auto;">
    <el-table-column
    prop="name"
    label="项目">
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
      // debugger;
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
        this.$prompt('请输入项目的名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'

        }).then(({ value }) => {
          // debugger;
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
        this.$http.post('/api/project/add', newProject)
          .then((res) => {
            if (res.status = 200) {
              this.$message({
                type: 'success',
                message: '你的项目是: ' + projectName
              });
              // debugger;
              this.projectList.push(newProject);
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
        this.$http.get('/api/project/list')
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
