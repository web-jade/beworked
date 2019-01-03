import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Message from './modules/message'
import Auth from './modules/auth'
import Project from './modules/project'
import ProjectHelper from './modules/project_helper'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        Message,
        Auth,
        Project,
        ProjectHelper
    },
    strict: debug,
    plugins: [createPersistedState()]
})
