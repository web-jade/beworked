export default {
    state: {
        loading: false
    },
    mutations: {
        setLoading: state => {
            state.loading = !state.loading
        }
    },
    actions: {},
    getters: {
        getLoading: state => {
            return state.loading
        }
    }
}
