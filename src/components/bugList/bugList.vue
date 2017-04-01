<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in timeList"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-form :inline="true" label-width="80px">
      <el-form-item label="错误页面">
        <el-input placeholder="请输入想要查看错误的具体页面"  v-model="errorPage"></el-input>
      </el-form-item>
      <el-form-item label="错误信息">
        <el-input placeholder="请输入页请输入想要查看错误的具体关键字"  v-model="errorKeyword"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
        prop="errorPage"
        label="错误页面">
      </el-table-column>
      <el-table-column
        prop="message"
        label="错误"
        >
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="error"
        label="错误堆栈"
       >
      </el-table-column>
     
      <el-table-column
        prop="ua"
        label="useragent" style="width:150px">
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :size = "10"
      :total="pageTotal"
      @current-change="handleCurrentChange"
      >
     </el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value: '1',
        size: 10,
        page: 1,
        errorPage: '', //页面关键字
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
        tableData:[]
      }
    },computed: {
    }, methods: {
      onSearch () {
        this.getList();
      },
      handleCurrentChange (page, page1) {
        if (this.page == page) {
          return;
        } else {
          this.page = page;
          this.getList();
        }
        
      }, getList () {
        console.log('获取bug列表')
        var searchParam = `size=${this.size}&currentPage=${this.page}`;
        if (this.errorPage) {
          searchParam = searchParam + `&errorPage=${this.errorPage}`;
        }
        if (this.errorKeyword) {
          searchParam = searchParam + `&errorKeyword=${this.errorKeyword}`;
        }
        this.$http.get(`/api/bug/list?${searchParam}`)
          .then((res) => {
              if (res.status = 200) {
                this.tableData = res.data.bugList;
                this.pageTotal = res.data.totalLength / this.size;

              }
          })
          .catch(function (error) {
              console.log(error);
          });
      }
    }, mounted () {
      this.getList();
    }
  }
</script>
<style>
.el-select {
  float: left;
  margin-bottom: 20px;
  clear: none;
}
.el-pagination {
  margin: 30px;
}
</style>