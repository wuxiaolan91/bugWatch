<template>
  <div class="content">
    <p class="title">邮件通知</p>
    <div class="search">
      <el-button @click="editable = true">写邮件</el-button>
    </div>
    <div class="email" v-show="editable">
      <div class="inputcontainer">
      收件人<div class="input" contenteditable="true" @keydown="del($event)">
        <span v-for="item in selectitem">{{item.name}}({{item.email}});</span>
        </div>
      <i class="el-icon-plus email-plus" @click="selectable = true"> </i>
      </div>
      <div class="users"  v-show="selectable">
        <i class=" el-icon-close email-close" @click="selectable = false"></i>
        <p v-for="item in items" @click="select(item)">
          {{item.name}}({{item.email}})
        </p>
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
          email: ''
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
        this.$http.post('/api/user/email',{email: this.emails, content: this.content}).then((res) => {
          this.items = res.data
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .content {
  .title {
    text-align: left;
    margin-bottom: 20px;
  }
  .search {
    border-bottom: 1px solid #848484;
    padding-bottom: 20px;
    overflow: hidden;
  }
  .email {
    .inputcontainer {
      position: relative;
      .input {
        width: 100%;
        height: 48px;
        text-align: left;
        padding-left: 20px;
        line-height: 48px;
        border: 1px solid #e6e6e6;
      }
      .email-plus {
        position: absolute;
        right: 20px;
        top: 50%;
        cursor: pointer;
      }
    }
  }
  .users{
    width: 100%;
    box-sizing: border-box;
    padding: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #e6e6e6;
    text-align: left;
    position: relative;
    p {
      padding: 10px;
    }
    p:hover {
      background-color: #3c8dbc;
    }
  }
  .email-close {
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
  textarea {
    width: 100%;
    height: auto;
    resize: none;
    min-height: 200px;
    font-size: 24px;
  }
  }
</style>
