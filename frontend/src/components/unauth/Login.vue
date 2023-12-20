<script>
import axios from "axios"

export default {
    data(){
        return{
            username: "",
            password: "",
        }
    },

    methods: {
        checkLogin(){


            const creds = {username: this.username, password: this.password};

            axios.post("http://localhost:3000/api/v1/auth/signin", creds)
            .then(response =>{
                console.log(response);
                if(response.data.success){
                    console.log(response.data.data);
                    //redirect to dashboard
                    this.$router.push("/dashboard");
                }else{
                }
            }).catch(error =>{
                console.log(error);
            })
        }
    }
}
</script>

<template>
    <form @submit.prevent="checkLogin">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="text" v-model="username" class="form-control" />
            <label class="form-label" for="form2Example1">Username </label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input type="password" v-model="password" class="form-control" />
            <label class="form-label" for="form2Example2">Password</label>
        </div>
<!--
        <div class="row mb-4">
            <div class="col d-flex justify-content-center">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
            </div>

            <div class="col">
            <a href="#!">Forgot password?</a>
            </div>
        </div>
-->

        <!-- Submit button -->
        <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

        <!-- Register buttons -->
        <div class="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
        </div>
    </form>
</template>

<style scoped>
</style>
