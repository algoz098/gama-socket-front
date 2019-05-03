import VueSocketio from "vue-socket.io";
// import socketIo from "socket.io-client";

export default ({ Vue, store }) => {
  Vue.use(new VueSocketio({
    debug: true,

    connection: `${process.env.REMOTE_URL}`,

    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },

    options: { } //Optional options
  }))
    
    // VueSocketio, "http://localhost:3001/"
    // Vue.use(VueSocketio, socketIo(`${process.env.REMOTE_URL}`, {
    // autoConnect: true,

    // transportOptions: {
    //   polling: {
    //     extraHeaders: {
    //       authorization: null
    //     }
    //   }
    // }
  // }), store)
  // , store)
}
