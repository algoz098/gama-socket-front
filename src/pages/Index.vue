<template>
  <q-page class="flex flex-center">
    <div>
      <p>Api: {{$store.state.api}} </p>

      <p>Token: {{$store.state.token}}</p>

      <p>User: </p>

      <pre>
        {{$store.state.user.data}}
      </pre>

      <div>
        <input type="text" v-model="form.email" placeholder="email">
      </div>

      <div>
        <input type="text" v-model="form.password" placeholder="password">
      </div>

      <q-btn label="Login (api)" color="primary" @click="submitApi" />
      <q-btn label="Login (socket)" color="primary" @click="submitSocket" />
      <q-btn label="Get User (socket)" color="primary" @click="getUserBySocket" />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data(){
    return{
      form: {
        email: 'algoz098@gmail.com',
        password: '123456'
      }
    }
  },

  methods:{
    async submitApi(){
      await this.$store.dispatch('userLogin', this.form)

      this.$forceUpdate()
    },
    
    async submitSocket(){
      await this.$socket.emit('login', this.form)
    },
    
    async getUserBySocket(){
      await this.$socket.emit('me')
    }
  }
}
</script>
