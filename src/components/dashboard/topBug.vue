<template>
    <div id="top-bug"
      v-loading.body="loading"
         style="height:400px;"></div>
  </div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data() {
    return {
      loading: false,
      option: {
        title: {
          text: 'bugTop排行榜'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['bug类型']
        },

        xAxis: [
          {
            type: 'category',
            data: ['global Core', 'undefined变量', 'xx', '引用错误', 'Unexpected token', 'TypeError', 'SyntaxError']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '次数',
            type: 'bar',
            data: [500, 135.6, 76.7, 32.6, 20.0]
          }
        ]
      }
    }
  }, 
  computed: {
    projectId () {
      return this.$store.state.projectId
    }
  },
  watch: {
    projectId () {
      this.getTopList();
    }
  },mounted() {
    this.getTopList();

  }, methods: {
    /**
     * 得到本周排名前5的bug列表
     */
    getTopList() {
      let topBug = document.getElementById('top-bug');
      if (!topBug) return;
      var chatWidth = topBug.parentNode.offsetWidth;
      topBug.style.width= chatWidth + 'px';
      var myChart = echarts.init(topBug);
      this.loading = true;
      this.$http.get('/api/bug/bugTopList?type=bug')
        .then(res => {
          this.loading = false;
          if (res.status == 200) {
            let bugListObj = res.data;
            this.option.xAxis[0].data = bugListObj.chartPageList;
            this.option.series[0].data = bugListObj.chartCountList;
            myChart.setOption(this.option);
          }

        })
    }
  }
}
</script>

<style scoped>

</style>
