<template>
    <div id="page-bug"
      v-loading.body="loading"
         style="width:100%;height:400px;"></div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data() {
    return {
      loading:false,
      option: {
        title: {
          text: 'bug页面排行榜'
        },
        tooltip: {
          trigger: 'axis',
          	axisPointer: {
						type: 'shadow'
					}
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
        legend: {
          data: ['页面']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: []
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
            data: [0,0,0,0,0],
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
   	this.getPageList();
		EventBus.$on('projectChange', num => {
			this.getPageList();
		})
  }, methods: {
    getPageList() {
      let pageBug = document.getElementById('page-bug');
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
