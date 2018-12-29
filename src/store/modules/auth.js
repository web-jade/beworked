import firebase from 'firebase/app'
import User from './user'

export default {
    state: {
        user: null,
        auth: false,
        loading: false
    },
    mutations: {
        loadUserData: (state, payload) => {
            state.user = payload
            state.auth = true
        },
        logoutUser: state => {
            state.user = null
            state.auth = null
        },
        setLoading: state => {
            state.loading = !state.loading
        },
        addUserData (state, data) {
            state.user.payload.push(data)
        }
    },
    actions: { // нужно загрузить дополнительные поля
        async loadingUser ({ commit }, { email, password }) {
            commit('setLoading')
            try {
                // Loading user
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)

                // Loading user confirm registration
                let confirmRegistration = null

                const confirm = await firebase.database().ref('users/' + response.user.uid).once('value')
                Object.keys(confirm.val()).forEach(key => {
                    confirmRegistration = confirm.val()[key].confirmRegistration
                })

                commit('loadUserData', new User({
                    id: response.user.uid,
                    email: response.user.email,
                    displayName: response.user.displayName,
                    emailVerified: response.user.emailVerified,
                    confirmRegistration: confirmRegistration
                }))

                commit('setLoading')
            } catch (e) {
                commit('setLoading')
                throw e
            }
        },
        async registerUser ({ commit }, { email, password }) {
            commit('setLoading')
            try {
                const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
                await firebase.database().ref('users/' + response.user.uid).push({
                    confirmRegistration: false,
                    firstName: null,
                    lastName: null
                })
                this.dispatch('sendUserEmailVerification', email)
                commit('setLoading')
            } catch (e) {
                commit('setLoading')
                throw e
            }
        },
        async sendUserEmailVerification ({ commit }, { email }) {
            const actionCodeSettings = {
                url: 'https://beworked-275d8.firebaseapp.com/?email=' + email
            }
            try {
                firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
                    .catch(error => {
                        console.log(error)
                    })
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async confirmUserRegistration ({ commit }, { firstName, lastName }) {
            commit('setLoading')
            try {
                await firebase.database().ref('users/' + this.getters.getUser.id).set({
                    confirmRegistration: true,
                    firstName: firstName,
                    lastName: lastName
                })
                commit('addUserData', {
                    confirmRegistration: true
                })
                commit('setLoading')
            } catch (e) {
                commit('setLoading')
            }
        }
    },
    getters: {
        getUser: state => {
            return state.user.payload
        },
        getAuth: state => {
            return state.auth
        },
        getLoading: state => {
            return state.loading
        }
    }
}
