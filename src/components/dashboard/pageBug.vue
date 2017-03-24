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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#bug-compare {
    width: 100%;
}
 .echarts {
    width: 400px;
    height: 400px;
  }
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
