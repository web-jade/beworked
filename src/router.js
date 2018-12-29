import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Account from './views/Account'
import Login from './views/Login'
import Register from './views/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/account',
            name: 'Account',
            component: Account
        }
    ]
})
