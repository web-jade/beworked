import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import AccountEntryPoint from './views/Account/AccountEntryPoint'
import Account from './views/Account/Account'
import AccountCreate from './views/Account/AccountCreate'
import AccountProjects from './views/Account/AccountProjects'
import AccountProfile from './views/Account/AccountProfile'
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
                },
                {
                    path: 'projects',
                    name: 'AccountProjects',
                    component: AccountProjects,
                },
                {
                    path: 'profile',
                    name: 'AccountProfile',
                    component: AccountProfile,
                }
            ]
        }
    ]
})
