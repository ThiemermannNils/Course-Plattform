<script>
import axios from "axios";


export default {
    data(){
        return{
            username: "",
            password: "",
            email: "",
        }
    },

    methods: {

        async register(){
            const user = {email: this.email, username: this.username, password: this.password}

            console.log(user);

            axios.post("http://localhost:3000/api/v1/auth/signup", user)
            .then(response => {
                console.log("Registration successful", response);
            }).catch (error=>{
                console.log("error Registering User: ", error);
            });
        }

    }
}

</script>

<template>
    <form @submit.prevent="register">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="text" v-model="username" class="form-control" />
            <label class="form-label" for="form2Example1">Username</label>
        </div>

        <div class="form-outline mb-4">
            <input type="email" v-model="email" class="form-control" />
            <label class="form-label" for="form2Example1">Email</label>
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
        <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>

        <!-- Register buttons -->
        <div class="text-center">
            <p>Already member? <a href="/login">Login</a></p>
        </div>
    </form>
</template>

<style scoped>
</style>
