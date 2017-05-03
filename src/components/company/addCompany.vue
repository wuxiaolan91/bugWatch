<template>
<div>
  <h2>添加公司</h2>
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
  }, methods: {
    addCompany () {
      this.$http.post('/api/company/addCompany', {
        companyName: this.companyName
      }).then(res => {
        if (res.ok) {

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