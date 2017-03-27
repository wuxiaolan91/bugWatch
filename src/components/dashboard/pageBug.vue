<template>
  <div class="echarts">
    <div id="page-bug" style="width:48%;height:400px;"></div>
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
                data: ['index', 'login', 'repayment', 'register', 'auth']
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
                data: [450, 320, 300, 200, 100],
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
        myChart.setOption(this.option);
  }
}
</script>

<style>

#page-bug {
    position: relative;
    left: 0;
    top: 0;
}
</style>
