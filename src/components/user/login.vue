<template>
  <div class="bgcontainer">
    <div class="background loaded" :style="'background:url('+bg+') center center no-repeat;background-size: cover;'"></div>
    <div class="topbanner">
      <div class="poswrap">
        <h1>bugWatch</h1>
      </div>
    </div>
    <div class="loginbox">
      <el-form ref="form" :model="form" label-width="" v-loading.body="loading">
        <el-form-item label="">
          <el-input v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" @click="onSubmit" size="large">登录</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
    <router-link id="add-company-btn" to="/addUser?gradeId=3">我没有账号，我想要注册一家公司</router-link>
  </div>
</template>
<script>
  import bgUrl from './../../assets/bg.jpeg'
  
  export default {
    data () {
      return {
        bg: bgUrl,
        loading: false,
        form: {
          name: '',
          password: ''
        }
      }
    },
    created () {
      EventBus.$emit('isLogin', false)
    },
    methods: {
      onSubmit () {
        if (!this.form.name || !this.form.password) {
          this.$message.error('请先完善你的登录信息')
          return;
        }
        this.loading = true;
        localStorage.removeItem('projectId');
        this.$http.post('/api/user/login', this.form).then(res => {
          this.loading = false;
        if (res.status == 200) {
          if (res.data.errorCode != 1) {
            const user = res.data;
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$store.commit('getCompany', {
              companyId: user.companyId,
              gradeId: user.gradeId
            });
            localStorage.setItem('userInfo', JSON.stringify(user));
            localStorage.setItem('name', user.name);
            localStorage.setItem('userId', user._id);

            EventBus.$emit('isLogin', true)
            if (user.companyId) {
              localStorage.setItem('companyId', user.companyId);
            } else {
              this.$router.push('/addCompany');
            }
            
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
  #add-company-btn {
    display: inline-block;
    padding-top: 30px;
    /*color: #20a0ff;*/
    color: #ddd;
    text-decoration: none;
    /*padding-right: 30px;*/
  }
  
  div.background {
    opacity: 0;
    display: block;
    /*background: url(/assets/bg.jpeg) center center no-repeat;*/
    /*background: url(https://mdapi.zjwist.com/mediainfo3/get/87?CompressionScale=60) center center no-repeat;*/
    background-size: cover;
    position: absolute;
    z-index: -1;
    left: -50px;
    top: -50px;
    right: -50px;
    bottom: -50px;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -mz-filter: blur(25px);
    -o-filter: blur(25px);
    /*filter: url(https://r.zjwist.com/images/blur.svg#blur);*/
    filter: blur(25px);
    -webkit-transition: opacity .5s ease;
    transition: opacity .5s ease;
  }
  .bgcontainer .el-button:hover {
    color: #fff;
    border-color: #ff7b00;
  }
  
  div.background.loaded {
    opacity: 1;
  }
  .topbanner {
    width: 100%;
    height: 220px;
    color: #dedede;
    background-position: center bottom;
    background-size: cover;
    position: relative;
  }
  
  .topbanner .poswrap {
    position: absolute;
    width: 100%;
    bottom: 25px;
    text-align: center;
  }
  .bgcontainer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  
  .loginbox {
    width: 380px;
    padding: 40px 40px 0px;
    background-color: rgba(255, 255, 255, .2);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .loginbtn {
    width: 100%;
    margin-bottom: 0;
    padding: 12px;
    line-height: 20px;
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border-radius: 3px;
    position: relative;
    border: 1px solid #ff7b00; /*ffaa00, c91b2b*/
    background-color: #ff7b00;
    color: #FFF;
    font-weight: 700;
    -webkit-transition: padding-right 218ms ease;
    -o-transition: padding-right 218ms ease;
    transition: padding-right 218ms ease;
  }
</style>
