<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="公司信息" name="first">公司信息</el-tab-pane>
    <el-tab-pane label="公司成员" name="second">公司成员</el-tab-pane>
    <el-tab-pane label="公司项目" name="third">公司项目</el-tab-pane>
  </el-tabs>
  <section v-show="activeName == 'first'">
    公司信息： {{ companyName }}公司模块还在开发种。刚想出来~觉得可能~应该要加
   </section>
   <section v-show="activeName == 'second'">
    公司成员： {{ companyName }}
   </section>
   <section v-show="activeName == 'third'">
    公司项目： {{ companyName }}
   </section>
</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      companyName: 'bugWatch开源',
      companyId: '3355'
    }
  }
}
</script>