export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$getErrors = function(name){
    try {
      return this.errors.filter(o => o.path.includes(name)).map(o => o.message).join('<br>')
    } catch (error) {
      return null      
    }
  }
}
