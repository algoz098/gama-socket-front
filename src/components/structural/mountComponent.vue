<template>
<div>
    <mount-component v-if="before" :data="before"  @delete="before = null" @save="submitChildren(0, $event, 'before')" />

     <div v-if="!loading">
        <q-menu
            touch-position
            context-menu
            v-if="showAdmin && (!data || data.type != 'layout')"
        >
            <q-list dense style="min-width: 100px">
                <q-item-label header>Menu for: {{data.component}}</q-item-label>

                <q-separator />

                <q-item 
                    clickable 
                    @click="edit()" 
                    v-close-popup
                    v-if="!editing && data._id"
                >
                    <q-item-section>Edit component</q-item-section>
                </q-item>
                
                <q-item 
                    clickable 
                    @click="submit()" 
                    v-close-popup
                    v-if="editing || !data._id"
                >
                    <q-item-section>Save</q-item-section>
                </q-item>
                
                <q-item 
                    clickable 
                    @click="cancelEdit()" 
                    v-close-popup
                    v-if="editing"
                >
                    <q-item-section>Cancel edit</q-item-section>
                </q-item>

                <q-separator />

                <q-item
                    @click="add('before')" 
                    clickable 
                    v-close-popup 
                    v-if="data.type == 'component' && data._id"
                >
                    <q-item-section>Add component before</q-item-section>
                </q-item>

                <q-item 
                    @click="add('after')" 
                    clickable 
                    v-close-popup 
                    v-if="data.type == 'component' && data._id"
                >
                    <q-item-section>Add component after</q-item-section>
                </q-item>

                <q-item 
                    @click="$emit('delete')" 
                    clickable 
                    v-close-popup 
                    v-if="data.type == 'component' && !data._id"
                >
                    <q-item-section>Delete</q-item-section>
                </q-item>

                <q-item 
                    @click="deleteThisComponent()" 
                    clickable 
                    v-close-popup 
                    v-if="data.type == 'component' && data._id"
                >
                    <q-item-section>Delete</q-item-section>
                </q-item>

                <q-separator  v-if="data.type == 'component'" />
                
                <q-item clickable v-close-popup>
                    <q-item-section>Cancel</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
        
        <q-badge color="blue" v-if="edited || !data._id">
            UNSAVED
        </q-badge>

        <div 
            v-if="data"
            :editing="editing || !data._id"
            :edited="edited || !data._id"
            :is="data.component" 
            v-bind="$propsData = data.props"
            :form.sync="form.props"
        >
            <slot></slot>
        </div>

    </div>

    <div class="row justify-center" v-else >
        <q-spinner
            color="primary"
            size="3em"
        />
    </div>

    <mount-component v-if="after" :data.sync="after" @delete="after = null" @save="submitChildren(+1, $event, 'after')" />
</div>
   
</template>

<script>
import components from './components.js' 

export default {
    name: "mount-component",

    props: ['data', 'position', 'position'],

    components: components,

    data(){
        return{
            after: null,
            before: null,

            modal: false,

            editing: false,
            edited: false,
            loading: false,
            loadingSubcomponent: null,

            form: {
                _id: null,
                position: this.position,
                component: null,
                type: null,

                props: {}
            }
        }
    },

    sockets:{
        'environmentSet'() { this.returnSubmit() },
        'environments_component_after'() { this.after = null },
        'validation.error'() { this.loading = false },
        'environments_component_before'() { this.before = null },
        'environments_component_deleted'() { this.loading = false }
    },

    created(){
        if(!this.data._id) this.edit()
    },

    methods:{
        deleteThisComponent(){
            this.loading = true

            let data = JSON.parse(JSON.stringify(this.$store.state.environment.data))

            let index = data.pages.findIndex(o => o.route == this.$route.path)

            data.pages[index].components.splice(this.position, 1)

            this.$socket.emit('environments.save', data)
        },

        submitChildren(plus, form, type){
            this.loadingSubcomponent = type

            let data = JSON.parse(JSON.stringify(this.$store.state.environment.data))

            let index = data.pages.findIndex(o => o.route == this.$route.path)

            data.pages[index].components.splice(this.position + plus, 0, form)

            this.$socket.emit('environments.save', data)
        },

        add(where){
            this[where] = {
                component: 'common-simple-text',
                type: 'component',

                props:{
                    title: 'aaaa'
                }
            }
        },

        returnSubmit(){
            if(this.loadingSubcomponent) {
                this[this.loadingSubcomponent] = null
                this.loadingSubcomponent = null
                return
            }

            if(!this.loading) return

            this.loading = false
            this.editing = false
            this.edited = false
        },

        submit(){
            this.loading = true
            
            if(!this.data._id){
                this.$emit('save', JSON.parse(JSON.stringify(this.form)))
                return
            }

            let data = JSON.parse(JSON.stringify(this.$store.state.environment.data))

            let index = data.pages.findIndex(o => o.route == this.$route.path)

            data.pages[index].components[this.position] = this.form

            this.$socket.emit('environments.save', data)
        },

        edit(){
            this.loading = false
            this.editing = true
            this.edited = true

            this.form._id = this.data._id
            this.form.type = this.data.type
            this.form.component = this.data.component
            this.form.props = this.data.props
        },

        cancelEdit(){
            this.loading = false
            this.editing = false
            this.edited = false
        }
    },

    computed:{
        showAdmin(){
            return this.$store.getters.showAdmin
        }
    }
}
</script>


