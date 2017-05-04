<template>
<div>
  <h2>添加公司/团队</h2>
  <el-input v-model="companyName" placeholder="请输入公司名字"></el-input>
  <el-button id="add-project-btn" type="primary" size="large" @click="addCompany">添加</el-button>
</div>
</template>
<script>
export default {
  data () {
    return {
      companyName: ''
    }
  }, created () {
  }, methods: {
    addCompany () {
      this.$http.post('/api/company/addCompanyByCompanyName', {
          companyName: this.companyName
      }).then(res => {
        debugger;
        if (res.data._id) {
          const companyId = res.data;
          localStorage.setItem('companyId', companyId._id);
          this.$message.success('添加公司成功，即将跳到公司页面');
          EventBus.$emit('isLogin', true);
          this.$router.push('/company');
        } else {
          this.$message.warning('添加项目失败');
        }
      })
    }
  }
}
</script>
<style scoped>
#add-project-btn {
  display: inline-block;
  margin-top: 50px;
}
</style>