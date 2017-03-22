<template>
  <div id="app">
  {{ msg }}
    <bug-compare></bug-compare>
    <div id="top-wrap">
      <page-bug :IEcharts="IEcharts"></page-bug>
      <top-bug :IEcharts="IEcharts"></top-bug>
    </div>
    
  </div>
</template>

<script>
import BugCompare from './components/dashboard/bugCompare.vue';
import pageBug from './components/dashboard/pageBug.vue';
import topBug from './components/dashboard/topBug.vue';
// import ECharts modules manually to reduce bundle size
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }, components: {
    BugCompare,
    pageBug,
    topBug
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.top-wrap>div {
  display:inline-block;
  width: 50%;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
