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
                            data.val()[item].creator,
                            data.val()[item].tasks
                        )
                    )
                }
                commit('addProjects', projects)

                commit('setLoading')
            } catch (e) {
                console.log(e)
                commit('setLoading')
                throw e
            }
        },
        async createTask ({ commit }, { creator, projectName, taskName }) {
            commit('setLoading')
            try {
                await firebase.database().ref(`projects/${creator}/${projectName}/tasks`).push({
                    taskName: taskName
                })

                this.dispatch('loadProjects', { creator: creator })

                commit('setLoading')
            } catch (e) {
                console.log(e)
                commit('setLoading')
                throw e
            }
        },
        async deleteTask ({ commit }, { creator, projectName, taskName }) { // удаление тасков нужно доделать
            commit('setLoading')

            const tasks = await firebase.database().ref(`projects/${creator}/${projectName}/tasks`).once('value')

            for (let item in tasks.val()) {
                if (tasks.val()[item].taskName === taskName) {
                    await firebase.database().ref(`projects/${creator}/${projectName}/tasks`).child(item).remove()
                }
            }

            this.dispatch('loadProjects', { creator: creator })

            try {

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
        },
        getProjectByName: function (state) {
            return projectName => state.projects.filter(item => {
                return item.name === projectName
            })
        }
    }
}
