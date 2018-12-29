<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    background: #edeef0;
    color: #000;
    margin: 0;
    padding: 0;
    direction: ltr;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    line-height: 1.154;
    font-weight: 400;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
  }
</style>


