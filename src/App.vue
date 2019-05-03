<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  async preFetch (ctx) {
    ctx.store.commit('api', process.env.REMOTE_URL)
      if(global.cookies.get('token') != 'undefined') ctx.store.commit('token', global.cookies.get('token'))

    await Promise.all([
      ctx.store.dispatch('environmentGet'),
      ctx.store.dispatch('userGet')
    ]) 

    return 
  },

  sockets:{
    connect(){
      // console.log("Rolou uma conexão ae em!")
      // this.$socket.emit('user')
      // this.$router.push({name: 'home'})
    },

    disconnect(e){
      // console.log("Já vai?")
    }
  },

}
</script>

<style>
</style>
