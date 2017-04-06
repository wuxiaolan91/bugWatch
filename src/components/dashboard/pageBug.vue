<template>
  <div class="echarts">
    <div id="page-bug" style="width:1500px;height:400px;"></div>
  </div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data () {
    return {
       option: {
        title: {
            text: 'bug页面排行榜'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['页面']
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
                data: [],
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
  }, mounted () {
      var myChart = echarts.init(document.getElementById('page-bug'));

      this.$http.get('/api/bug/bugTopList1?type=page')
        .then( res => {
            if (res.status == 200) {
                let bugListObj = res.data;
                this.option.xAxis[0].data = bugListObj.chartPageList;
                this.option.series[0].data = bugListObj.chartCountList;
                myChart.setOption(this.option);
            }
            
        })
        
        
  }
}
</script>

<style>

</style>
