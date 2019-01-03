import firebase from 'firebase/app'
import Project from './project_helper'

export default {
    state: {
        projects: []
    },
    mutations: {
        addProjects: (state, payload) => {
            state.projects = payload
        }
    },
    actions: {
        async createProject ({ commit }, { creator, name, budget }) {
            commit('setLoading')
            try {
                await firebase.database().ref(`projects/${creator}/${name}`).set({
                    name: name,
                    budget: budget,
                    creator: creator
                })
                commit('setLoading')
            } catch (e) {
                console.log(e)
                commit('setLoading')
                throw e
            }
        },
        async loadProjects ({ commit }, { creator }) {
            commit('setLoading')
            try {
                const data = await firebase.database().ref(`projects/${creator}`).once('value')
                let projects = []

                for (let item in data.val()) {
                    projects.push(
                        new Project(
                            data.val()[item].name,
                            data.val()[item].budget,
                            data.val()[item].creator
                        )
                    )
                }

                commit('addProjects', projects)

                console.log(this.getters.getProjects)

                commit('setLoading')
            } catch (e) {
                console.log(e)
                commit('setLoading')
                throw e
            }
        }
    },
    getters: {
        getProjects: state => {
            return state.projects
        }
    }
}
