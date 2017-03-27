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
                    text: '昨天，今天 24 小时bug比较图'
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
                    data: ['0am','1am','2am','3am','4am','5am','6am','7am','8am', '9am', '10am', '11am', '12am', 
                        '1pm', '2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm']
                },
                yAxis: {
                },
                series: [
                    {
                        name: '昨天',
                        type: 'line',
                        data: []
                        // data: [5, 2, 6, 6, 6, 2, 5, 2, 6, 6, 6, 2, 5, 2, 6, 6, 6, 2,5, 3, 6, 6, 10, 3]
                    },
                    {
                        name: '今天',
                        type: 'line',
                        legendHoverLink: true,
                        data: []
                        // data: [5, 3, 6, 6, 6, 3, 5, 3, 16, 10, 6, 3, 5, 3, 6, 6, 6, 3,5, 3, 6, 6, 10, 3]
                    }
                    
                ]
            }
        }
    },
  created () {
}, mounted () {
    var myChart = echarts.init(document.getElementById('compare-bug'));
    this.$http.get('/api/bug/compareList')
        .then( (res) => {
            if (res.status = 200) {
                let bugList = res.data;
                let yesterdayList = [], yesteryBugList = [];
                let todayList = [], todayBugList = [];
                bugList.forEach( item => {
                    let date = new Date();
                    date.setHours('00','00','01');
                    console.log('今天早上开始' + date);
                    var todayStart = date.getTime();
                    if ( new Date(item.time).getTime() > todayStart) {
                        todayList.push(item);
                    } else {
                        yesterdayList.push(item);
                    }
                })
                console.log('昨天');
                console.dir(yesterdayList);
                console.log('今天');
                console.log(todayList);
                yesteryBugList = this.getListByEveryHour(yesterdayList);
                todayBugList = this.getListByEveryHour(todayList);
                this.option.series[0].data =  yesteryBugList;
                this.option.series[1].data =  todayBugList;
                myChart.setOption(this.option);
            }
        })

  }, methods: {
      getListByEveryHour (bugList) {
          console.log('分割');
        var timeList = [];
        for(let i= 0;i < 24; i++) {
            timeList.push(0);
            
        }
        bugList.forEach(item => {
            const hour = new Date(item.time).getHours();
            console.log(hour + '点的bug');
            debugger;
            timeList[hour] = timeList[hour] + 1;
        });
        return timeList;
        console.log(timeList);
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
