import Vue from 'vue'
import Vuex from 'vuex'

import environment from './environment'
import user from './user'
import axios from 'axios';
import { Cookies } from 'quasar';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      environment,
      user
    },

    state:{
      api: null,
      token: null,
    },

    mutations:{
      api(state, data){
        state.api = data
      },

      token(state, data){
        if(process.env.SERVER) global.cookies.set('token', data)
        else Cookies.set('token', data)
        
        if(process.env.SERVER) global.axios.defaults.headers.common['Authorization'] = data;
        else axios.defaults.headers.common['Authorization'] = data;
        
        state.token = data
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
