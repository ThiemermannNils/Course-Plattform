<script>
import axios from "axios"

export default {
    mounted: function logout(){
        axios.get("http://localhost:3000/api/v1/auth/logout")
        .then(response=>{
            console.log(response)
            if(response.logedout){
                this.$router.push("/login");
            }
        })
    }
}

</script>