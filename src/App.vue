<template>
  <div id="app">
    <b-navbar variant="faded" type="light" fixed="top" class="mx-lg-5">
      <b-navbar-brand href="/">
        <img src="./assets/main_logo.png" class="logo-style">
      </b-navbar-brand>
    </b-navbar>
    <router-view class="content-boddy"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  .main-wrapper{
    padding-right: 100px;
    padding-left: 100px;
  }
</style>
