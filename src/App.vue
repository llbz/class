<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },



}
</script>

<style>
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  /*color: #2c3e50;*/
}
</style>
