<template>
  <div id="page-bug"
       v-loading.body="loading"
       style="height:400px;">
  </div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data() {
    return {
      loading: false,
      width: '100%',
      option: {
      
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'bug次数',
            type: 'bar',
            data: [0, 0, 0, 0, 0],
            barWidth: '60%'
          }
        ]
      }
    }
  },
  watch: {
    projectId() {
      this.getPageList();
    }
  }, computed: {
    projectId() {
      return this.$store.state.projectId
    }
  },
  mounted() {
    this.getPageList();
  }, methods: {
    getPageList() {
      let pageBug = document.getElementById('page-bug');
      var chatWidth = pageBug.parentNode.offsetWidth;
      pageBug.style.width= chatWidth + 'px';
      if (!pageBug) return;
      var myChart = echarts.init(pageBug);
      this.loading = true;
      this.$http.get('/api/bug/bugTopList?type=page')
        .then(res => {
          this.loading = false;
          if (res.status == 200) {
            let bugListObj = res.data;
            console.log('bugListObj - 来自接口bugTopList?type=page::');
            console.dir(bugListObj);
            // bugListObj.chartPageList.length = 5;
            // bugListObj.chartCountList.length = 5;
            this.option.xAxis[0].data = bugListObj.chartPageList;
            this.option.series[0].data = bugListObj.chartCountList;
            myChart.setOption(this.option);
          }

        })
    }
  }
}
</script>

<style>
#page-bug {
  width: 100%;
}
</style>
