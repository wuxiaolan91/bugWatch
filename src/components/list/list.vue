<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-pagination
      layout="prev, pager, next"
      :size = "10"
      :total="50"
      @current-change="handleCurrentChange"
      >
     </el-pagination>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value: '1',
        size: 10,
        page: 1,
         options: [{
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
    }, methods: {
      handleCurrentChange (page, page1) {
        if (this.page == page) {
          return;
        } else {
          this.page = page;
          this.getList();
        }
        
      }, getList () {
        console.log('获取bug列表')
        this.$http.get(`/api/bug/list?size=${this.size}&currentPage=${this.page}`)
          .then((res) => {
              if (res.status = 200) {
                this.tableData = res.data;
                this.total = res.data.length;

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
  position: absolute;
  left: 0;
}
.el-pagination {
  margin: 30px;
}
</style>