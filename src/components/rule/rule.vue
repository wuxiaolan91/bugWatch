<template>
  <div>
    <el-form :inline="true"
             label-width="80px">
      <el-form-item label="收件人">
        <el-input placeholder="请输入邮件地址"
                  autofocus="true"
                  v-model="email">
        </el-input>
      </el-form-item>
      <el-form-item label="错误页面关键词">
        <el-input placeholder="register.html,dashboard"
                  v-model="keyword">
        </el-input>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary"
                   @click="onAddRule">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ruleList"
              v-loading.body="loading"
              style="width: 100%">
      <el-table-column prop="email"
                       label="邮件地址">
      </el-table-column>
      <el-table-column prop="keyword"
                       label="邮件规则">
      </el-table-column>
  
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template scope="scope">
          <el-button @click.native.prevent="delRule(scope.$index, scope)"
                     type="text"
                     size="small">删除</el-button>
          <el-button type="text"
                     size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      email: '',
      keyword: '', // 添加新规则的关键词
      ruleList: []
    }
  }, created() {
    this.getRuleList();
		EventBus.$on('projectChange', num => {
			this.getRuleList();
		})
  }, methods: {
    onAddRule() {
      let newRule = {
        email: this.email,
        keyword: this.keyword
      };

      this.$http.post('/api/rule/addRule', newRule)
        .then(res => {

          if (res.data) {
            this.$message({
              message: '添加规则成功',
              type: 'success'
            });
            this.ruleList.unshift(newRule);
            this.email = '';
            this.keyword = '';
          } else {
            this.$message.error('添加规则失败');
          }

        })
    },
    /**
     * 删除一条rule
     */
    delRule(index, rule) {
      debugger;
      console.log('rule', rule.row);

      let ruleId = this.ruleList[index]._id;
      console.log('ruleId', ruleId);
      this.$http.get('/api/rule/removeRule', {
        params: {
          ruleId
        }
      }).then(res => {
          if (res.data.ok) {
            this.$message({
              message: '删除规则成功',
              type: 'success'
            });
            this.ruleList.splice(index, 1);
          } else {
            this.$message.error('删除规则失败');
          }
        })
    },
    /**
     * 获取规则列表
     */
    getRuleList() {
      this.loading = true;
      this.$http.get('/api/rule/getRuleList')
        .then(res => {
          this.loading = false;
          if (res.data) {

            this.ruleList = res.data;
          } else {

          }

        })
    }
  }
}
</script>
<style>

</style>