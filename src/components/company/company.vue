<template>
<div>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="公司信息" name="first">
      
      <el-card class="box-card"
        v-loading.body="loading">
        <div  class="text item">
          <span>公司名称：</span> {{ companyName }}
        </div>
        <div  class="text item">
          <span>公司id:</span> {{ id }}
        </div>
        <div  class="text item">
          <span>公司拥有者:</span> {{ ownerName }}
        </div>
    </el-card>
    </el-tab-pane>
    <el-tab-pane label="公司成员" name="second">
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
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
      ownerId: '',
      ownerName: '', // 公司的拥有者
      companyName: '',
      userList: [],
      projectList: [],
      companyId: '3355',
      loading: false
    }
  },created () {
    
    this.getCompanyById();
  }, methods: {
    getCompanyById () {
      this.loading =  true;
      this.$http.get('/api/company/getCompanyById').then(res => {
        this.loading = false;
        if (res.data) {
          let company = res.data;
          this.id = company._id;
          this.companyName = company.companyName;
          this.ownerId = company.ownerId;
          this.userList = company.userList;
          this.userList.every(item => {
            if (item._id = this.ownerId) {
              this.ownerName = item.name;
            }
          })
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