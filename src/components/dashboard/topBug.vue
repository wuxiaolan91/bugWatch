<template>
    <div id="top-bug"
      v-loading.body="loading"
         style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data() {
    return {
      loading: false,
      msg: 'Welcome to Your Vue.js App',
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
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
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
            data: [500, 135.6, 76.7, 32.6, 20.0],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
    }
  }, mounted() {
    this.getTopList();
    EventBus.$on('projectChange', num => {
      this.getTopList();
    })

  }, methods: {
    /**
     * 得到本周排名前5的bug列表
     */
    getTopList() {
      let topBug = document.getElementById('top-bug');
      if (!topBug) return;
      var myChart = echarts.init(topBug);
      this.loading = true;
      this.$http.get('/api/bug/bugTopList?type=bug')
        .then(res => {
          this.loading = false;
          if (res.status == 200) {
            let bugListObj = res.data;
            console.log('bugListObj - 来自接口bugTopList?type=bug---84');
            console.dir(bugListObj);
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
