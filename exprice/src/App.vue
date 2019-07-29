<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
require('@/assets/css/reset.css')
require('@/assets/css/flex.css')
require('@/assets/css/font.css')
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
