<template>
<div>
  <el-form ref="form" :model="user" label-width="80px" v-loading.body="loading">
    <el-form-item label="用户名">
      <el-input v-model="user.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input type="email" v-model="user.email"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        type="password"
        v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item label="角色">
       <el-select v-model="user.gradeId" placeholder="角色">
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
      user: {
        name: '',
        email: '',
        password: '',
        gradeId: 1
      },
      roleList: [
        {
          label: '用户',
          value: 1
        }, {
          label: '管理员',
          value: 3
        }
      ]
    }
  }, methods: {
    onSubmit () {
      if (!this.user.name || !this.user.email || !this.password) {
        this.$message.warning('请先填完信息再点击提交');
        
        return;
      }
      this.$http.post('/api/user/addUser', this.user).then(res => {
        if (res.data._id) {
          this.$message('添加用户成功');
          this.user.name = '';
          this.user.email = '';
          this.user.password = '';
          this.user.gradeId = '1'; // 1是普通用户
          this.$router.push('/projectList?type=list')
          
        } else {
          this.$message.error('添加用户不成功' + res.data);
        }
      })
    }
  }
}
</script>