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
    ctx.store.commit('token', global.cookies.get('token'))

    await Promise.all([
      ctx.store.dispatch('environment/get'),
      ctx.store.dispatch('user/get')
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
