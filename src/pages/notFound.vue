<template>
  <div class="h-100 d-flex justify-content-center flex-column">
    <h1 class="center-text text-white align-self-center pb-3 text-center">Oops! Movie not found</h1>
    <div class="back-to-home center-text text-white align-self-center" v-on:click="back">
      <p class="mb-0 p-2 m-2">BACK TO HOME</p>
    </div>
  </div>
</template>
<script>
  import router from '../router'

  export default {
    name: 'notFound',
    methods: {
      back(){
        router.push('./')
      }
    }
  }
</script>
