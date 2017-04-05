<template>
  <div>
    Ajax 日志
  </div>
</template>
<sciprt>
export default {
  data () {
    return {

    }
  }, mounted () {
    this.getList();
  } methods: {
    getList () {
      this.$http.get('/api//bug/getAjaxList', {
          params: searchParam
        })
          .then((res) => {
              if (res.status = 200) {
                let bugList = res.data.bugList;
                debugger;
              }
          });
    }
  }
}
</sciprt>