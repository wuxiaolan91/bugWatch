<template>
<div>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="公司信息" name="first">
      
      <el-card class="box-card">
        <div  class="text item">
          <span>公司名称：</span> {{ companyName }}
        </div>
        <div  class="text item">
          <span>公司id:</span> {{ id }}
        </div>
    </el-card>
    </el-tab-pane>
    <el-tab-pane label="公司成员" name="second">
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="用户id"
          >
        </el-table-column>
        <el-table-column
          prop="roleId"
          label="角色"
          >
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="公司项目" name="third">
      <router-link to="/projectList?type=add">添加项目</router-link><br>
       {{ projectList }}
    </el-tab-pane>
  </el-tabs>
 
    
     
   
</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      id: '',
      companyName: '',
      userList: [],
      projectList: [],
      companyId: '3355'
    }
  },created () {
    this.getCompanyById();
  }, methods: {
    getCompanyById () {
      this.$http.get('/api/company/getCompanyById', {
        params: {
          companyId: localStorage.getItem('companyId')
        }
      }).then(res => {
        if (res.data) {
          let company = res.data;
          this.id = company._id;
          this.companyName = company.companyName;
          this.userList = company.userList;
          this.projectList = company.projectList;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .item {
    padding: 18px 0;
    text-align: left;
    padding-left: 4rem;
  }
</style>