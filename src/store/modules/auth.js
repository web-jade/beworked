import firebase from 'firebase/app'
import User from './user'

export default {
    state: {
        user: null,
        auth: false
    },
    mutations: {
        loadUserData: (state, payload) => {
            state.user = payload
            state.auth = true
        },
        logoutUser: state => {
            state.user = null
            state.auth = null
        }
    },
    actions: {
        async loadingUser ({ commit }, { email, password }) {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            try {
                commit('loadUserData', new User(response.user.uid))
            } catch (e) {
                throw e
            }
        },
        async registerUser ({ commit }, { email, password }) {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            try {
                commit('loadUserData', new User(response.user.uid))
            } catch (e) {
                throw e
            }
        }
    },
    getters: {
        getUser: state => {
            return state.user
        },
        getAuth: state => {
            return state.auth
        }
    }
}
