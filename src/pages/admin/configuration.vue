<template>
  <div class="row justify-center">
    <div class="col-12 sticky">
      <q-card flat square class="bg-primary text-white ">
        <q-card-section>
          <q-btn
            color="positive"
            label="Save"
            icon="save"
            :loading="loading" 
            @click="submit"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-4  q-ma-xs">
      <q-card >
        <q-card-section>
          <div class="text-h6">Configuration</div>

          <div class="text-subtitle2">For the environment</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-md-12">
              <q-input 
                v-model="form.name" 
                label="Name"
                hint=" "
                :error-message="$getErrors('name')" 
                :error="$hasErrors('name')"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-4 q-ma-xs">
      <q-card >
        <q-card-section>
          <div class="text-h6">Colors</div>

          <div class="text-subtitle2">For the environment</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-md-12">
              <q-input
                v-for="(item, index) in form.colors"
                :key="index"
                v-model="form.colors[index].value" 
                :label="`Color: ${item.type}`"
                hint=" "
                :error-message="$getErrors('name')" 
                :error="$hasErrors('name')"
                filled
              :input-style="`border-bottom: 5px solid ${item.value}`"
              >
                <template  v-slot:append>
                  <q-no-ssr>
                    <q-icon name="colorize" :ref="`icon_${index}`" class="cursor-pointer">
                      <q-popup-proxy class="popup">
                        <q-color v-model="form.colors[index].value" />
                      </q-popup-proxy>
                    </q-icon>
                  </q-no-ssr>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.sticky{
  position: sticky;
  top: 51px;
  z-index: 1
}
</style>

<script>
export default {
  name: 'admin-configuration',

  data(){
    return {
      loading: false,

      form: null,

      errors: null
    }
  },

  sockets:{
      'environmentSet'() { 
        this.loading = false 
        location.reload()
      },

      "validation.error"(e){
          this.errors = e
      }
  },

  created(){
    this.form = JSON.parse(JSON.stringify(this.$store.state.environment.data))
  },

  methods:{
    submit(){
      this.loading = true
      
      let data = JSON.parse(JSON.stringify(this.$store.state.environment.data))

      data.name = this.form.name
      data.colors = this.form.colors

      this.$socket.emit('environments.save', data)
    },
  }
}
</script>
