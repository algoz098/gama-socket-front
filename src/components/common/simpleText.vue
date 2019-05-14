<template>
<div class="row justify-center">
    <div class="col-md-6">

        <h6 :class="edited ? form.titleClass : titleClass">
            {{edited ? form.title : title}}

            <edit-popup 
                v-model="form.title" 
                type="q-input" 
                :editing="editing" 
                tooltip="Edit title" 
            /> 

            <edit-popup 
                v-model="form.titleClass" 
                type="q-input" 
                :editing="editing" 
                tooltip="Edit titleClass" 
            />
        </h6>

        <div :class="edited ? form.textClass : textClass">
            <edit-popup 
                v-model="form.text" 
                type="q-editor" 
                :editing="editing" 
                tooltip="Edit text" 
            /> 

            <edit-popup 
                v-model="form.textClass" 
                type="q-input" 
                :editing="editing" 
                tooltip="Edit textClass" 
            />
            
            <div v-html="edited ? form.text : text" />
        </div>
    </div>
</div>
</template>

<script>
import editPopup from '../structural/editPopup.vue'

export default {
    props:[
        "titleClass",
        "textClass",
        "title",
        "text",
        'form',
        'edited',
        'editing'
    ],

    components:{
        editPopup
    },

    beforeMount(){
        this.$emit('update:form', {
            titleClass: this.titleClass,
            textClass: this.textClass,
            title: this.title, 
            text:  this.text
        })
    }

}
</script>

