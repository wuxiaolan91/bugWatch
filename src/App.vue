<style lang="less">
  html,body {
    min-height: 100%;
    height: 100%;
  }
  *{
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    list-style: none;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100%;
    position: relative;
  }
  div {
    box-sizing: border-box;
  }
  .content {
    margin-left: 230px;
    background-color: #ecf0f5;
    min-height: 602px;
    padding-top: 20px;
    padding-left: 30px;
    overflow: hidden;
  }
  footer {
    margin-left: 230px;
    padding: 14px;
    color: #444444;
  }
</style>
<template>
  <div id="app">
    <sliderbar></sliderbar>
    <myheader></myheader>
    <router-view class="content"></router-view>
    <footer>
      版权所有：bugwatch项目组
    </footer>
  </div>
</template>

<script>
  import sliderbar from './components/common/slidebar.vue'
  import myheader from './components/common/header.vue'
export default {
  name: 'app',
  mounted () {
  },
  components: {sliderbar, myheader}
}
</script>

<style>

</style>
