<template>
<div class="row justify-center">
    <div class="col-md-6">
        <q-no-ssr>
            <q-list bordered>
                <q-expansion-item
                    class="dev-debug"
                    v-model="expanded"
                    icon="expand"
                    label="Debug:"
                    caption="Helps for debug"
                >
                    <q-card flat square v-if="$store.state.dev" >
                        <q-card-section>
                                <p>Api: {{$store.state.api}} </p>

                                <p>Token: {{$store.state.token}}</p>

                                <div class="row  full-width justify-center">
                                    <div class="col-6">
                                        <p>User: </p>

                                        <pre>
                                        {{$store.state.user.data}}
                                        </pre>
                                    </div>

                                    <div class="col-6" @keydown="$clearErrors($event)">
                                        <div class="row justify-center">
                                            <div class="col-3">
                                                <q-input 
                                                v-model="form.email" 
                                                label="E-mail"
                                                hint=" "
                                                :error-message="$getErrors('email')" 
                                                :error="$hasErrors('email')"
                                                />
                                            </div>
                                        </div>

                                        <div class="row justify-center q-mb-md">
                                            <div class="col-3">
                                                <q-input 
                                                v-model="form.password" 
                                                label="Password" 
                                                name="password"
                                                hint=" "
                                                :error-message="$getErrors('password')" 
                                                :error="$hasErrors('password')"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-2 offset-4">
                                        <q-btn label="Login (api)" color="primary" @click="submitApi" />
                                    </div>
                                    
                                    <div class="col-2">
                                        <q-btn label="Login (socket)" color="primary" @click="submitSocket" />
                                    </div>

                                    <div class="col-2">
                                        <q-btn label="Get User (socket)" color="primary" @click="getUserBySocket" />
                                    </div>
                                </div>  
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </q-no-ssr>
    </div>
</div>
</template>

<script>
export default {
    name: 'dev-debug',

     data(){
        return{
            expanded: false,
            
            form: {
                email: 'algoz098@gmail.com',
                password: '123456'
            },

            errors: null
        }
    },

    sockets:{
        "validation.error"(e){
            this.errors = e
        }
    },

    methods:{
        async submitApi(){
            await this.$store.dispatch('userLogin', this.form)

            this.$forceUpdate()
        },
        
        async submitSocket(){
            await this.$socket.emit('login', this.form)
        },
        
        async getUserBySocket(){
            await this.$socket.emit('me')
        }
    }
}
</script>
<style scoped>
</style>
