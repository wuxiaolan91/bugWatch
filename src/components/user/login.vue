<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
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
      form: {
        name: '',
        password: ''
      }
    }
  }, methods: {
    onSubmit () {
      this.$http.post('/api/user/login',this.form).then(res => {
        if (res.status == 200) {
          debugger;
          if (res.data.length) {
            const user = res.data[0];
             alert('登录成功');
             localStorage.setItem('name', user.name);
             this.$router.push('/');
          } else {
            alert(res.data);
          }
         
        }
      });
    }
  }
}
</script>
<style>
</style>