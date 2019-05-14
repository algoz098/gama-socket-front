<template>
  <mount-component :data="layout" >
    <mount-component :data="navbar"/>

    <mount-component 
      v-for="(component, index) in components"
      :key="index"
      :data="component"
      :position="index"
    />

    <mount-component :data="footer"/>

    <page-administration />
  </mount-component>
</template>

<script>
import mountComponent from '../components/structural/mountComponent.vue' 
import pageAdministration from '../components/structural/pageAdministration.vue' 

export default {
  name: 'PageIndex',

  components:{
    mountComponent,
    pageAdministration
  },

  methods:{
    addComponentBefore(index){
      if(index > 0) index -= 1

      this.localComponents.splice( index, 0, {data: {component: 'common-simple-text', type: 'component', props: {}}, index: index});
    }
  },

  computed:{
    env(){
      return this.$store.state.environment.data
    },
    
    page(){
      try {
        return this.env.pages.filter(o => o.route == this.$route.path)[0]
      } catch (error) {
        return null        
      }
    },

    navbar(){
      if(!this.env) return null
      return this.env.navbar
    },

    footer(){
      if(!this.env) return null
      return this.env.footer
    },

    layout(){
      if(!this.env) return null
      return this.env.layout
    },

    components(){
      if(!this.page || !this.page.components) return []
      
      return this.page.components
    },

  }
}
</script>
