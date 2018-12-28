import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Auth from './views/Auth'
import Account from './views/Account'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/auth',
            name: 'Auth',
            component: Auth
        },
        {
            path: '/account',
            name: 'Account',
            component: Account
        }
    ]
})
