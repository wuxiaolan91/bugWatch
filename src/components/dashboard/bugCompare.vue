<template>
    <div id="bug-compare" class="echarts">
        <h2>bug对比图</h2>
        <div id="compare-bug" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template >
    <script>

        // import ECharts modules manually to reduce bundle size
        export default {
            data() {
        return {
            msg: 'Welcome to Your Vue.js App',
       option: {
            title: {
            text: 'bug对比图',
            subtext: '今天和昨天'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['昨天', '今天']
        },
        toolbox: {
            show: true,
            feature: {
            mark: {show: true },
                dataView: {show: true, readOnly: false },
                magicType: {show: true, type: ['line', 'bar'] },
                restore: {show: true },
                saveAsImage: {show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
            type: 'category',
                boundaryGap: false,
                data: ['8am', '9am', '10am', '11am', '12am', '1pm', '2pm']
            },
],
        yAxis: [
            {
            type: 'value',
                axisLabel: {
            formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
            name: '昨天',
                type: 'line',
                data: [1, 2, 2, 5, 3, 2, 0],
                markPoint: {
            data: [
                        {type: 'max', name: '最大值' },
                        {type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
            data: [
                        {type: 'average', name: '平均值' }
                    ]
                }
            },
            {
            name: '今天',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
            data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                    ]
                },
                markLine: {
            data: [
                        {type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
        }

    }
  },
  created () {
    this.$http.get('/api/getBugList')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}, mounted () {
    var myChart = echarts.init(document.getElementById('compare-bug'));
    myChart.setOption(this.option);
  }
}
</script>

    <style scoped>

        #bug-compare {
            width: 100%;
}
 .echarts {
            width: 400px;
    height: 400px;
  }
</style>
