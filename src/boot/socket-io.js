import VueSocketio from "vue-socket.io";

export default ({ Vue, store }) => {
  Vue.use(new VueSocketio({
    debug: process.env.DEV,

    connection: `${process.env.REMOTE_URL}`,

    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },

    options: { } //Optional options
  }))
}
