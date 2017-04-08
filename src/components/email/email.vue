<template>
  <div class="content">
    <p class="title">邮件通知</p>
    <div class="search">
      <div class="item"><span>收件人</span><input type="text" placeholder="收件人邮件地址"></div>
      <div class="item"><span>错误页面关键词</span><input type="text" placeholder="收件人邮件地址"></div>
    </div>
    <div class="list">
      <p v-for="(item, index) in items">
        <span>{{item.name}}</span><span>{{item.email}}</span><button @click="del(item, index)" class="btn">删除</button>
      </p>
    </div>

  </div>

</template>
<script>

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
      .item{
        float: left;
        input {
          line-height: 30px;
          border: none;
          margin-left: 20px;
          width: 180px;
          text-indent: 1rem;
        }
      }
      .item:nth-last-of-type(1) {
        margin-left: 30px;
      }
    }
  }
  .list {
    p {
      text-align: left;
      margin-top: 10px;
    }
    span {
      margin-right: 15px;
    }
    button {
      background-color: #e6e6e6;
      border: none;
      padding: 8px 12px;
      margin-left: 13px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    mounted () {
      this.$http.get('/api/user').then((res) => {
        this.items = res.data
      })
    },
    methods: {
      del (item, index) {
        this.$http.post('/api/user/delete', {id: item._id}).then((res) => {
          if (res == 1) {
            this.items.splice(index, 1)
          }
        })
      }
    }
  }
</script>
