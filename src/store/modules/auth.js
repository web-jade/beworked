import firebase from 'firebase/app'
import User from './user'

export default {
    state: {
        user: null,
        auth: false
    },
    mutations: {
        logoutUser: state => {
            state.user = null
            state.auth = null
        },
        setUser: (state, payload) => {
            state.user = payload
            state.auth = true
        }
    },
    actions: {
        async loadingUser ({ commit }, { email, password }) {
            commit('setLoading')
            try {
                const authentication = await firebase.auth().signInWithEmailAndPassword(email, password)
                const database = await firebase.database().ref(`users/${authentication.user.uid}`).once('value')

                commit('setUser', {
                    id: authentication.user.uid,
                    email: authentication.user.email,
                    emailVerified: authentication.user.emailVerified,
                    displayName: authentication.user.displayName,
                    confirmRegistration: database.val().confirmRegistration,
                    firstName: database.val().firstName,
                    lastName: database.val().lastName
                })

                commit('setLoading')
            } catch (e) {
                commit('setLoading')
                console.log(e)
                throw e
            }
        },
        async registerUser ({ commit }, { email, password }) {
            commit('setLoading')
            try {
                const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
                await firebase.database().ref('users/' + response.user.uid).set({
                    confirmRegistration: false,
                    firstName: false,
                    lastName: false
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
        async confirmUserRegistration ({ commit }, { displayName, firstName, lastName }) {
            commit('setLoading')
            try {
                await firebase.database().ref('users/' + this.getters.getUser.id).set({
                    confirmRegistration: true,
                    firstName: firstName,
                    lastName: lastName
                })
                commit('setLoading')
            } catch (e) {
                commit('setLoading')
            }
        },
        async resendEmailConfirm ({ commit }) {
            commit('setLoading')
            try {
                console.log(this.getters.getUser)
                await firebase.auth().sendPasswordResetEmail(email)
                commit('setLoading')
            } catch (e) {
                commit('setLoading')
                console.log(e)
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
        },
        isUserConfirmAccount: state => {
            return state.user.confirmRegistration
        }
    }
}
