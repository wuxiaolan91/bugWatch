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
  },
  created () {
    EventBus.$emit('isLogin', false)
  }, methods: {
    onSubmit () {
      if (!this.form.name || !this.form.password) {
        this.$message.error('请先完善你的登录信息')
        return;
      }
      this.loading = true;
      localStorage.removeItem('projectId');
      this.$http.post('/api/user/login',this.form).then(res => {
        this.loading = false;
        if (res.status == 200) {
          if (res.data) {
            const user = res.data;
             this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem('userInfo', JSON.stringify(user));
             localStorage.setItem('name', user.name);
             localStorage.setItem('userId', user._id);
             
             
          } else {
             this.$message.error('登录失败，请确认你的账号和密码是否正确');
          }

        }
      }).then(res => {
        EventBus.$emit('isLogin', true)
        this.$router.push('/');
      })
    }
  }
}
</script>
<style>
</style>
