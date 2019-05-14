<template>
    <q-no-ssr>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="showAdmin">
            <q-fab color="primary" icon="build" direction="up">
                <q-fab-action color="secondary"  icon="settings_ethernet" @click="openModal()" />

                <q-fab-action color="secondary"  icon="input" :to="{path: '/admin'}" />
            </q-fab>
        </q-page-sticky>

        <q-dialog v-model="modal" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Edit details of the page: {{page ? page.name : '' }}</div>
                </q-card-section>

                <q-card-section v-if="showFormRoute">
                    <q-input
                        filled
                        label="Title" 
                        class="q-mb-md"
                        :readonly="loading"
                        v-model="form.title" 
                        v-if="form.title"
                    />

                    <q-input
                        filled
                        label="Route" 
                        :readonly="loading"
                        v-model="form.route" 
                        v-if="showFormRoute"
                    />
                </q-card-section>

                <q-card-section class="text-center" v-else>
                    There's no editable configurations on this route
                </q-card-section>

                <q-card-actions align="right" >
                    <q-btn flat label="Update"  @click="submit" v-if="showFormRoute" :loading="loading" />

                    <q-btn outline color="negative" label="Cancel"  @click="modal = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-no-ssr>
</template>

<script>
export default {
    name: "page-administration",

    data(){
        return {
            modal: false,
            loading: false,

            form:{
                _id: null,
                route: null,
                title: null,
            }
        }
    },

    sockets:{
        'environments_route_update'() {this.returnSubmit() }
    },

    methods:{
        returnSubmit(){
            this.loading = false
            this.modal = false
        },

        submit(){
            this.loading = true

            this.$socket.emit('environments.route.update', this.form)
        },

        openModal(){
            this.loading = false
            
            this.form._id = this.page._id
            this.form.route = this.page.route
            this.form.title = this.page.title

            this.modal = true
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

        user(){
            return this.$store.state.user.data
        },

        showAdmin(){
            return this.$store.getters.showAdmin
        },

        showFormRoute(){
            return (this.form.route != '/')
        }
    }
}
</script>
