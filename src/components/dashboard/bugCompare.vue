<template>
    <div id="bug-compare" class="echarts">
        <div id="compare-bug" style="width: 100%;height:400px;"></div>
    </div>
  </div>
</template >
<script>
export default {
    data() {
        return {
            option: {
                title: {
                    text: '今天和昨天比较的 bug 图'
                },
                tooltip: {
                    trigger: 'axis',
                     axisPointer: {
                        type: 'shadow'
                     }
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                legend: {
                    data: ['昨天', '今天']
                },
                xAxis: {
                    data: ['1am','2am','3am','4am','5am','6am','7am','8am', '9am', '10am', '11am', '12am', 
                        '1pm', '2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm','12pm']
                },
                yAxis: {
                },
                series: [
                    {
                        name: '昨天',
                        type: 'line',
                        data: [5, 2, 6, 6, 6, 2, 5, 2, 6, 6, 6, 2, 5, 2, 6, 6, 6, 2,5, 3, 6, 6, 10, 3]
                    },
                    {
                        name: '今天',
                        type: 'line',
                        legendHoverLink: true,
                        data: [5, 3, 6, 6, 6, 3, 5, 3, 16, 10, 6, 3, 5, 3, 6, 6, 6, 3,5, 3, 6, 6, 10, 3]
                    }
                    
                ]
            }
        }
    },
  created () {
}, mounted () {
    this.$http.get('/api/bug/compareList')
        .then( (res) => {
            if (res.status = 200) {
                let bugList = res.data;
                let yesterdayList = [];
                let todayList = [];
                bugList.forEach( item => {
                    var todayStart = new Date('2017-03-26T00:00:00').getTime();
                    debugger;
                    if ( new Date(item.time).getTime() > todayStart) {
                        todayList.push(item);
                    } else {
                        yesterdayList.push(item);
                    }
                })
                console.log(todayList);
            }
        })
        
    var myChart = echarts.init(document.getElementById('compare-bug'));
    myChart.setOption(this.option);
  }, methods: {
      getListByEveryHour (timeList) {
        var time = [];
        for(let i= 0;i < 24; i++) {
            time.push {
                i: 0
            };
            timeList.forEach( item =>) {
                if (new Date(item.index).getHours() == )
            });
        }
      }
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
