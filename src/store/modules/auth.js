import firebase from 'firebase/app'
import User from './user'

export default {
    state: {
        user: null
    },
    mutations: {
        loadUserData: (state, payload) => {
            state.user = payload
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
        }
    },
    getters: {
        getUser: state => {
            return state.user
        }
    }
}
