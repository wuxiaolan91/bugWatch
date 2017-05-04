<template>
<el-card class="box-card">
  <ul>
    <li>项目名{{ name }}</li>
    <li>项目id:{{ projectId }}</li>
    </ul>
</el-card>
</template>
<script>
export default {
  data () {
    return {}
  },props: ['name', 'projectId']
}
</script>