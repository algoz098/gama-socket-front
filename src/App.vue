<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  async preFetch (ctx) {
    delete global.axios.defaults.headers.common['Authorization'] 

    ctx.store.commit('dev', process.env.DEV)

    ctx.store.commit('api', process.env.REMOTE_URL)
    
    if(global.cookies.get('token') && global.cookies.get('token') != 'undefined') ctx.store.commit('token', global.cookies.get('token'))

    try {
      await Promise.all([
        ctx.store.dispatch('environmentGet'),
        ctx.store.dispatch('userGet')
      ]) 
    } catch (error) {
      console.log(error)      
    }

    return 
  },
  
  beforeMount(){
    this.$store.dispatch('environmentColors')
  },

  sockets:{
    connect(){
      // console.log("Rolou uma conexão ae em!")
      // this.$socket.emit('user')
      // this.$router.push({name: 'home'})
    },

    disconnect(e){
      // console.log("Já vai?")
    },

    notify_error(e){
      this.$q.notify({
        color: 'negative',
        textColor: 'white',
        message: e,
        icon: 'error'
      })
    },

    notify_success(e){
      this.$q.notify({
        color: 'positive',
        textColor: 'white',
        message: e,
        icon: 'check_circle'
      })
    }
  },

}
</script>

<style>
</style>
