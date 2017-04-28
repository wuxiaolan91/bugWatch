<template>
<div>
  <el-form ref="form" :model="form" label-width="80px" v-loading.body="loading">
    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        password: ''
      }
    }
  }, methods: {
    onSubmit () {
      this.loading = true;
      localStorage.removeItem('projectId');
      this.$http.post('/api/user/login',this.form).then(res => {
        this.loading = false;
        if (res.status == 200) {
          // debugger;
          if (res.data.length) {
            const user = res.data[0];
             this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem('userInfo', JSON.stringify(user));
             localStorage.setItem('name', user.name);
             this.$router.push('/');
          } else {
             this.$message.error('登录失败，请确认你的账号和密码是否正确');
          }

        }
      });
    }
  }
}
</script>
<style>
</style>
