<script>
import axios from "axios"
import { mapActions, mapGetters } from "vuex";

export default {

    computed:{
        ...mapGetters(['getToken'])
    },

    mounted: function logout(){
        console.log(this.getToken)
        axios.get("http://localhost:3000/api/v1/auth/logout?secret_token="+this.getToken)
        .then(response=>{
            if(response.data.logedout){
                this.logoutSession();
                this.$router.push("/login");
            }else{
                console.log(response);
                this.$router.push("/dashboard");
            }
        })
    },
    methods:{
        ...mapActions(["getSession", "logoutSession"]),
    },
    created(){
        this.getSession();
    }
}

</script>