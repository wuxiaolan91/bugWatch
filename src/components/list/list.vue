<template>
  <div>
    我是日志列表
    <ul>
      <li v-for="bug in list">
        时间: {{ bug.time}}<br>
        ip: {{ bug.ip }}
        错误: {{ bug.error }}
        错误类型: {{ bug.errorType }}
        错误页面: {{ bug.pageUrl }}

      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [
          {
            id: 1
          }, {
            id: 2
          }
        ]
      }
    }, mounted () {
      console.log('获取bug列表')
      this.$http.get('/api/getBugList')
        .then((res) => {
            // debugger;
            if (res.status = 200) {
              this.list = res.data;
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
</script>
