<template>
<q-header 
    :elevated="edited ? form.elevated : elevated "
    :class="edited ? form.headerClass : headerClass"
>

    <edit-popup 
        v-model="form.headerClass" 
        type="q-input" 
        :editing="editing" 
        tooltip="Edit header class" 
    />

    <q-toolbar >
        <router-link :to="{path: '/'}">
            <img 
                :src="edited ? form.logoSrc : logoSrc " 
                v-if="logoSrc"
            >

            <edit-popup 
                v-model="form.logoSrc" 
                type="q-input" 
                :editing="editing" 
                tooltip="Edit logo src" 
            />
        </router-link>

        <q-toolbar-title>
            <router-link
                tag="span" 
                class="text-capitalize cursor-pointer"
                :to="{path: '/'}"
            >
                {{$store.state.environment.data.name}}
            </router-link>
        </q-toolbar-title>
        
        <q-btn 
            v-for="(page, index) in pages"
            :key="index"
            v-if="page.title"
            :label="page.title" 
            :to="{path: page.route}"
            :outline="$route.path == page.route"
            :flat="$route.path != page.route"
            dense 
        />

        <edit-popup 
            v-model="form.elevated" 
            type="q-checkbox" 
            :editing="editing" 
            tooltip="Edit elevated" 
        />
    </q-toolbar>
</q-header>
</template>

<script>
import editPopup from '../structural/editPopup.vue'

export default {
    props:[
        'form',
        'edited',
        'editing',
        'logoSrc',
        'elevated',
        'headerClass'
    ],

    components:{
        editPopup
    },

    beforeMount(){
        this.$emit('update:form', {
            logoSrc: this.logoSrc,
            elevated: this.elevated,
            headerClass: this.headerClass, 
        })
    },

    computed:{
        env(){
            return this.$store.state.environment.data
        },

        pages(){
            return this.env.pages
        },
    }
}
</script>

