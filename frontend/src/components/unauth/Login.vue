<script>
import axios from "axios"
import { mapActions, mapGetters } from "vuex";
export default {
    data: () => ({
        username: "",
        password: ""
    }),
    computed: {
        ...mapGetters(["getToken", "getUserId"])
    },
    methods: {
        ...mapActions(["loginSession", "logoutSession", "getSession"]),
        async checkLogin(){
            try {
                const { data } = await axios.post("http://localhost:3000/api/v1/auth/signin", {
                username: this.username,
                password: this.password
                });
                this.loginSession(data);
                this.$router.push("/dashboard");
            } catch (error) {
                console.log(error);
                alert("problems?");
            }
        }, 
        handleLogout() {
            this.logoutSession();
        }
    },
    created(){
        this.getSession();
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
