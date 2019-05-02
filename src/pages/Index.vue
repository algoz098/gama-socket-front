<template>
  <q-page class="flex flex-center">
    <div>
      <p>Api: {{$store.state.api}} </p>

      <p>Token: {{$store.state.token}}</p>

      <div>
        <input type="text" v-model="form.email" placeholder="email">
      </div>

      <div>
        <input type="text" v-model="form.password" placeholder="password">
      </div>

      <q-btn label="Login (api)" color="primary" @click="submitApi" />
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
    submitApi(){
      this.$store.dispatch('user/login', this.form)
    }
  }
}
</script>
