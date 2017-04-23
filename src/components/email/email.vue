<style lang="less" src="./email.less" scoped></style>
<template>
  <div class="content">
    <p class="title">邮件通知</p>
    <div class="search">
      <el-button @click="editable = true">写邮件</el-button>
    </div>
    <div class="email" v-show="editable">
      <div class="inputcontainer">
      <span>收件人</span><div class="input" contenteditable="true" @keydown="del($event)">
        <span v-for="item in selectitem" class="user">{{item.name}}({{item.email}});</span>
        </div>
      <i class="el-icon-plus email-plus" @click="selectable = true"> </i>
      </div>
      <div class="users"  v-show="selectable">
        <i class=" el-icon-close email-close" @click="selectable = false"></i>
        <p v-for="item in items" @click="select(item)">
          {{item.name}}({{item.email}})
        </p>
      </div>
      <div class="inputcontainer">
        <input type="text" v-model="title" class="title">
      </div>
      <textarea v-model="content"></textarea>
      <el-button @click="send()">发送</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: [],
        user: {
          email: '27272722@163.com' // 实际上这个值是用户登陆时候，获得的，这里只是虚拟数字
        },
        editable: false,
        selectable: false,
        selectitem: [],
        emails: [],
        content: ''
      }
    },
    mounted () {
      this.getuser()
    },
    methods: {
      getuser (name = '') {
        this.$http.get('/api/user', {params: { name: name}}).then((res) => {
          this.items = res.data
        })
      },
      select (item) {
        if (this.emails.indexOf(item) == -1) {
          this.selectitem.push(item)
          this.emails.push(item.email)
        }
      },
      del (e) {
        e.preventDefault()
        if (e.keyCode == 8) {
          this.selectitem.splice(this.selectitem.length - 1, 1)
        }
      },
      send () {
        console.log('lalal')
        this.$http.post('/api/user/email',{email: this.emails, content: this.content, title: this.title, from: this.user.email}).then((res) => {
          this.items = res.data
        })
      }
    }
  }
</script>
