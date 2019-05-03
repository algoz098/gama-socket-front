export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$hasErrors = function(name){
    try {
       if(this.errors.filter(o => o.path.includes(name)).length) return true
    } catch (error) {}

    return false
  }
}