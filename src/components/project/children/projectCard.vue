<template>
<el-card class="box-card">
  <ul>
    <li>项目名：{{ projectName }}</li>
    <li>项目id：{{ projectId }}</li>
    </ul>
</el-card>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    projectName () {
      return this.$store.state.projectName;
    },
    projectId () {
      return this.$store.state.projectId;
    }
  }
}
</script>