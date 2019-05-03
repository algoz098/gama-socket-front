export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$clearErrors = function(name){
    name = name.target.name || null
    
    if(!name) return 

    if(!this.$hasErrors(name)) return
    
    try {
      let index = this.errors.findIndex(o => o.path.includes(name))

      this.errors.splice(index, 1)
    } catch (error) {
    }
  }
}
