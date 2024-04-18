<script>
import axios from "axios"
import { mapActions, mapGetters } from "vuex";

export default {

    computed:{
        ...mapGetters(['getToken'])
    },

    methods:{
        ...mapActions(["getSession"]),
    },
    created(){
        if(!this.getSession()){
            this.$router.push('/login');
        };
    }
}

</script>

<template>
    
    <h1 class="p-3">Categories</h1>
        
    <div class="d-inline-flex p-3">I'm an inline flexbox container!</div>
    
</template>