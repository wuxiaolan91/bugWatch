<template>
<div>
  <project-card v-if="projectId"></project-card>
  <el-form ref="form" :model="user" label-width="80px" v-loading.body="loading">
    <el-form-item label="用户名">
      <el-input v-model="user.name"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="user.realName"></el-input>
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
    <el-button type="primary" size="large" @click="onSubmit"> {{ btnText }}</el-button>
  </el-form-item>
  </el-form>
</div>
</template>
<script>
import projectCard from '../project/children/projectCard';
export default {
  data () {
    return {
      loading: false,
      btnText: '添加用户',
      projectId: localStorage.getItem('projectId'),
      user: {
        name: '',
        realName: '',
        email: '',
        gradeId: Number(this.$route.query.gradeId || 1)
      },
      roleList: [
        {
          label: '用户',
          value: 1
        }
      ]
    }
  },
  computed: {
    type () {
      debugger;
      if (this.$route.query.type == 'addMenberToCompany') {
        return 2;
      }
      return 1;
    },
    gradeId () { // 当前操作用户的等级
      return this.$store.state.user.gradeId;
    }
  },
  created () {
      if (this.gradeId == 3) {
      this.roleList.push({
          label: '管理员',
          value: 2
        })
    }
    if (this.gradeId == '') {
      this.roleList.push({
          label: '公司拥有者',
          value: 3
        })
    }
   if (this.user.gradeId ==3) {
     EventBus.$emit('isLogin', false)
     this.btnText = '注册';
   }
  }, methods: {
    onSubmit () {
      if (!this.user.name || !this.user.email || !this.user.password) {
        this.$message.warning('请先填完信息再点击提交');
        
        return;
      }
      this.$http.post('/api/user/addUser', this.user).then(res => {
        if (res.data._id) {
          const user = res.data;
          this.$message('添加用户成功');
          this.user.name = '';
          this.user.email = '';
          this.user.password = '';
          this.user.gradeId = 1; // 1是普通用户
          if (user.gradeId < 3) {
             this.$router.push('/projectList?type=list')
          } else { // 如果用户是owner身份，那么就要跳到添加项目的页面去。
             localStorage.setItem('userInfo', JSON.stringify(user));
             localStorage.setItem('name', user.name);
             localStorage.setItem('userId', user._id);
            //  EventBus.$emit('isLogin', true);
             this.$router.push('/addCompany');
          }
          
        } else {
          this.$message.error('添加用户不成功：' + res.data);
        }
      })
    }
  }, components: {
    projectCard
  }
}
</script>