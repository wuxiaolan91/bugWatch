<template>
  <div class="echarts">
    <div id="top-bug" style="width: 48%;height:400px;"></div>
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
                            data: ['global Core', 'undefined变量', 'xx', '引用错误', 'Unexpected token',  'TypeError',  'SyntaxError']
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
                            data: [500,  135.6, 76.7, 32.6, 20.0],
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
    var myChart = echarts.init(document.getElementById('top-bug'));
    myChart.setOption(this.option);
  }
}
</script>

<style scoped>
#top-bug {
    position: absolute;
    right: 0;
    top: 0;
}
</style>
