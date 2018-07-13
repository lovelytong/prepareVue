<template>
  <div id="app">
    <!--<img src="./assets/logo.png" class="logo">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
}
@keyframes slidein {
  from {
    margin-left: 100%;

  }

  to {
    margin-left: 0%;

  }
}

</style>
