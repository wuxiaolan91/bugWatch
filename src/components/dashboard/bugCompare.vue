<template>
    <div id="bug-compare" class="echarts">
        <h2>今天和昨天 bug 对比图</h2>
        <div id="compare-bug" style="width: 100%;height:400px;"></div>
    </div>
  </div>
</template >
<script>
export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['昨天', '今天']
                },
                xAxis: [
                    {
                    type: 'category',
                        boundaryGap: false,
                        data: ['1am','2am','3am','4am','5am','6am','7am','8am', '9am', '10am', '11am', '12am', 
                            '1pm', '2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm','12pm']
                    },
                ],
                yAxis: [
                    {
                    type: 'value',
                        axisLabel: {
                    formatter: '{value} bug'
                        }
                    }
                ],
                series: [
                    {
                        name: '昨天',
                            type: 'line',
                            data: [1, 2, 2, 5, 3, 2, 0,1, 2, 2, 5, 3, 2, 0,1, 2, 2, 5, 3, 2, 0,5,3,1],
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
                    }, {
                    name: '今天',
                        type: 'line',
                        data: [11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13, 10,3,5,4],
                        markPoint: {
                            data: [
                                {name: '周最低', value: 11, xAxis:11, yAxis: 11 }
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
