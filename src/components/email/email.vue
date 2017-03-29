<template>
  <div class="content">
    <p class="title">邮件通知</p>
    <div class="search">
      <div class="item"><span>收件人</span><input type="text" placeholder="收件人邮件地址"></div>
      <div class="item"><span>错误页面关键词</span><input type="text" placeholder="收件人邮件地址"></div>
    </div>
    <button @click="state = !state" class="btn">{{state ? '编辑' : '取消'}}</button>
    <button @click="del()" class="btn" v-show="!state">删除</button>
    <div class="list">
      <div v-for="(item, index) in items" class="wraper">
          <input type="checkbox" v-model="ids" :value="item._id">
        <div class="details" :class="state ? 'active' : ''">
            <span>{{item.name}}</span><span>{{item.email}}</span>
        </div>
      </div>
    </div>

  </div>

</template>
<style lang="less" src="./less/email.less" scoped></style>
<script>
  export default {
    data () {
      return {
        items: [],
        ids: [],
        state: true,
      }
    },
    mounted () {
      this.get()
    },
    methods: {
      get () {
        this.$http.post('/api/user').then((res) => {
          this.items = res.data
        })
      },
      del () {
        if (!this.ids.length) {
          alert('请选择删除项目')
          return
        }
        this.$http.post('/api/user/delete', {id: this.ids}).then((res) => {
          this.get()
        })
      }
    }
  }
</script>
