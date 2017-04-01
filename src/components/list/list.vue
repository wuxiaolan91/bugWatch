<template>
  <div>
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
        label="usergent" style="width:150px">
      </el-table-column>
    </el-table>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData:[]
      }
    }, mounted () {
      console.log('获取bug列表')
      this.$http.get('/api/bug/list')
        .then((res) => {
            if (res.status = 200) {
              this.tableData = res.data;
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
</script>