import Login from './components/unauth/Login.vue'
import Register from './components/unauth/Register.vue'
import Dashboard from './components/auth/Dashboard.vue'
import Logout from './components/auth/Logout.vue'

export default [
    { path:'/login', component: Login},
    { path:'/register', component: Register},
    { path:'/dashboard', component: Dashboard},
    { path:'/logout', component: Logout}
]