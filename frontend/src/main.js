import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from './routes'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);
const router = new createRouter({
    history: createWebHistory(),
    routes: Routes
});

app.use(router);
app.use(BootstrapVue3);

app.mount('#app');