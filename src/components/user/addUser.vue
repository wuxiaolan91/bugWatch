<template>
<div>
  <el-form ref="form" :model="form" label-width="80px" v-loading.body="loading">
    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="密码">
       <el-select v-model="roleList[0].value" placeholder="角色">
      <el-option
        v-for="item in roleList"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
        password: '',
        role: 1
      },
      roleList: [
        {
          label: '用户',
          value: 1
        }, {
          label: '管理员',
          value: 2
        }
      ]
    }
  }, methods: {
    onSubmit () {
      this.$http.post('/api/user/addUser', this.form).then(res => {
        if (res._id) {
          this.$message('添加用户成功');
          this.form.name = '';
          this.form.password = '';
          this.form.role = '1';
          
        } else {
          this.$message.error('添加用户不成功' + res);
        }
      })
    }
  }
}
</script>