<template>
<div class=" bg-grey-3">
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-capitalize">
          {{$store.state.environment.data.name}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-separator spaced inset />

        <q-item to="/" exact>
          <q-item-section>
            <q-item-label>Return to home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/admin/configuration" exact>
          <q-item-section>
            <q-item-label>Configuration</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container >
      <router-view />

      <dev-debug />
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
import devDebug from '../components/dev/debug.vue'
import { extend } from 'quasar'

export default {
  name: 'adminLayout',

  components:{
    devDebug,
  },

  
  data () {
    return {
      left: true
    }
  },

  preFetch (ctx) {
    if(!ctx.store.getters.showAdmin) ctx.redirect('/')

    return
  },

  methods:{
  }
}
</script>

<style>
</style>
