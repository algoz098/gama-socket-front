<template>
    <q-icon name="edit" class="cursor-pointer" v-if="editing">
        <q-tooltip v-if="!!tooltip">
          {{tooltip}}
        </q-tooltip>

        <q-popup-edit 
            title="Edit field: Title"
            v-model="data"
            buttons
        >
            <div :is="type" v-model="data" dense autofocus counter />
        </q-popup-edit>
    </q-icon>
</template>

<script>
import { QEditor } from 'quasar'
export default {
    name: 'edit-popup',

    components:{
        QEditor
    },

    props:['value', 'editing', 'type', 'tooltip'],

    computed:{
        data:{
            get(){
                return this.value
            },

            set(e){
                this.$emit('input', e)
            }
        }
    }
}
</script>

