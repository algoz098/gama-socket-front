<template>
<div>
  <router-view />
  
  <dev-debug />
</div>
</template>

<script>
import devDebug from '../components/dev/debug.vue'

export default {
  name: 'MyLayout',

  components:{
    devDebug
  }
}
</script>

<style>
</style>
