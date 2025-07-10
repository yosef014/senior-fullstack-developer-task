import {createStore} from "vuex"
import axios from "axios";

export default createStore({
    state: {

        user: null,
        error: null,
    },
    getters: {
        roles: state => state.user?.roles || [],
        username: state => state.user?.username || '',
        isAdmin: state => state.user?.roles.includes('Admin'),
        isEditor: state => state.user?.roles.includes('Editor'),
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        async login({commit}, username) {
            try {
                commit('setError', null)
                const res = await axios.post(`/api/users/login/${username}`)
                commit('setUser', res.data)
            } catch (err) {
                commit('setUser', null)
                commit('setError', err.response?.data?.message || 'Login failed')
            }
        },
    },
    modules: {
        // Define your modules here
    },
})
