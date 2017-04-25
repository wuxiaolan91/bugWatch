<template>
  <div id="ajax_list">
    <el-select v-model="timeValue"
               placeholder="请选择"
               @change="getAjaxList">
      <el-option v-for="item in timeList"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <el-form :inline="true"
             label-width="80px">
      <el-form-item label="错误页面">
        <el-input placeholder="请输入具体页面"
                  v-model="errorPage"></el-input>
      </el-form-item>
      <el-form-item label="错误接口">
        <el-input placeholder="请输入接口关键字"
                  v-model="url"></el-input>
      </el-form-item>
      <el-form-item label="错误信息">
        <el-input placeholder="请输入接口关键字"
                  v-model="errorKeyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="ajaxBugList"
              v-loading.body="loading"
              style="width: 100%">
      <el-table-column prop="errorPage"
                       label="错误页面">
      </el-table-column>
      <el-table-column prop="url"
                       label="错误接口">
      </el-table-column>
      <el-table-column prop="message"
                       label="错误">
      </el-table-column>
      <el-table-column prop="time"
                       label="时间">
      </el-table-column>
      <el-table-column prop="error"
                       label="错误堆栈">
      </el-table-column>

      <el-table-column prop="ua"
                       label="useragent"
                       style="width:150px">
      </el-table-column>
    </el-table>
    <el-pagination v-if="pageTotal > 1"
                   layout="prev, pager, next"
                   :size="10"
                   :total="pageTotal"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>

export default {
  data() {
    let startTime = new Date(),
      endTime = new Date();
    return {
      loading: false,
      timeValue: '1',
      startTime: startTime,
      endTime: endTime,
      size: 10,
      currentPage: 1,
      pageTotal: 0,
      errorPage: '', // 页面关键字
      url: '', // 接口关键字
      errorKeyword: '',
      timeList: [{ // 按照时间筛选
        value: '1',
        label: '今天'
      }, {
        value: '7',
        label: '一周'
      }, {
        value: '30',
        label: '一个月'
      }],
      value: '',
      ajaxBugList: []
    }
  },
  methods: {
    onSearch() {
     this.getAjaxList();
    },
    handleCurrentChange(currentPage) {
      if (this.pagcurrentPage == currentPage) {
        return;
      } else {
        this.currentPage = currentPage;
        this.getAjaxList();
      }
    },
    getAjaxList() {
      let self = this;
      var searchParam = {
        size: self.size,
        currentPage: self.currentPage,
        timeType: self.timeValue
      };
      if (this.errorPage) {
        searchParam.errorPage = this.errorPage;
      }
      if (this.errorKeyword) {
        searchParam.errorKeyword = this.errorKeyword;
      }
      if (this.url) {
        searchParam.url = this.url;
      }
      this.loading = true;
      this.$http.get('/api/bug/getAjaxList', {
        params: searchParam
      })
        .then(res => {
          this.loading = false;
          if (res.status = 200) {
            let bugList = res.data.bugList;
            if (bugList.length) {
              bugList.map(item => {
                let time = new Date(item.time);
                let hour = `${time.getHours()}` < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
                let minutes = `${time.getMinutes()}` < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
                let seconds = `${time.getSeconds()}` < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;

                item.time = `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${hour}:${minutes}:${seconds}`;
                return item;
              })
            }
            this.ajaxBugList = bugList;
            this.pageTotal = res.data.bugList.length / this.size;
            console.log('ajaxBugList');
            console.log(this.ajaxBugList);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {
   this.getAjaxList();
   console.log('156');
    EventBus.$on('projectChange', projectId => {
     console.log('158');
     this.getAjaxList();
    })
  }
}
</script>
