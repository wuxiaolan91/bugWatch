<template>
  <div id="page-bug" class="echarts">
    <h2>页面Top排行榜</h2>
    <div id="page-bug" style="width: 45%;height:400px;"></div>
  </div>
  </div>
</template>

<script>
// import ECharts modules manually to reduce bundle size
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
       option: {
        title: {
            text: 'bug页面排行榜',
            subtext: '页面'
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
    display: inline-block;
    width: 45%;
    left: 0;
}
</style>
