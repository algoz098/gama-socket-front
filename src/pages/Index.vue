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

  meta () {
    return {
      title: this.metaTitle,
      
      meta: {
        description: this.metaDescription,
        keywords: this.metaKeywords,
        robots: {name: 'robots', content: "index, follow"},
        "og:locale": this.metaLocale,
        "og:url": {name: 'og:url', content: this.env.urls},
        "og:title": {name: 'og:title', content: this.metaTitle.content},
        "og:site_name": {name: 'og:site_name', content: this.env.name},
        "og:og:description": {name: 'og:og:description', content: this.metaDescription.content},
      }
    }
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

    metaTitle(){
      if(this.page && this.page.metadata && this.page.metadata.titleTemplate) return this.page.metadata.titleTemplate

      return this.env.metadata.titleTemplate
    },

    metaDescription(){
      if(this.page && this.page.metadata && this.page.metadata.meta.description) return this.page.metadata.meta.description

      return this.env.metadata.meta.description
    },

    metaKeywords(){
      if(this.page && this.page.metadata && this.page.metadata.meta.keywords) return this.page.metadata.meta.keywords

      return this.env.metadata.meta.keywords
    },

    metaLocale(){
      if(this.page && this.page.metadata && this.page.metadata.meta['og:locale']) return this.page.metadata.meta['og:locale']

      return this.env.metadata.meta['og:locale']
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
