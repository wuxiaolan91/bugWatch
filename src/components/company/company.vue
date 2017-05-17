<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="公司信息" name="first">
        
        <el-card class="box-card" v-loading.body="loading">
          <div class="text item">
            <span>公司名称：</span> {{ company.companyName }}
          </div>
          <div class="text item">
            <span>公司id：</span> {{ company.companyName }}
          </div>
          <div class="text item">
            <span>公司拥有者：</span> {{ company.ownerName }}
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="公司成员" name="second">
        <router-link v-if="gradeId > 1" to="/addUser?type=addMenberToCompany">添加成员到公司</router-link>
        <el-table :data="userList" stripe style="width: 100%">
          <el-table-column prop="name" label="用户"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="公司项目" name="third">
        <router-link v-if="gradeId > 1" to="/projectList?type=add">添加项目</router-link>
        <!--<br> {{ projectList }}-->
        <el-table v-loading.body="loading" :data="projectList" stripe style="width: 100%">
          <el-table-column prop="name"  label="项目名"></el-table-column>
          <el-table-column prop="_id" label="项目id"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName: 'first',
        ownerId: '',
        ownerName: '', // 公司的拥有者
        userList: [],
        projectList: [],
        companyId: '3355',
        loading: false
      }
    },
    computed: {
      company () {
        return this.$store.state.company;
      },
      gradeId () {
        return this.$store.state.user.gradeId;
      }
    },
    created () {
      
      this.getCompanyById();
    }, methods: {
      getCompanyById () {
        this.loading = true;
        this.$http.get('/api/company/getCompanyById').then(res => {
          this.loading = false;
          if (res.data) {
            let company = res.data;
            this.ownerId = company.ownerId;
            this.userList = company.userList;
            this.userList.every(item => {
              if (item._id = this.ownerId) {
                company.ownerName = item.name;
              }
            })
            this.projectList = company.projectList;
            this.$store.commit('getCompany',{
              companyId: company._id,
              companyName: company.companyName,
              ownerId: company.ownerId,
              ownerName: company.ownerName
            });
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
