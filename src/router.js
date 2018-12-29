import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import AccountEntryPoint from './views/Account/AccountEntryPoint'
import Account from './views/Account/Account'
import AccountCreate from './views/Account/AccountCreate'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'

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
            name: 'AccountEntryPoint',
            component: AccountEntryPoint,
            children: [
                {
                    path: '',
                    name: 'Account',
                    component: Account,
                },
                {
                    path: 'create',
                    name: 'AccountCreate',
                    component: AccountCreate,
                }
            ]
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
})
