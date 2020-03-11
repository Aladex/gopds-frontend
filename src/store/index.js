import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myPage: 1,
        title: '',
        token: localStorage.getItem('token') || '',
        authError: false,
        username: '',
        status: '',
        searchItem: "",
        selectedSearch: {name: "book", title: "Поиск книги по названию"},
        searchVariants: [
            {name: "book", title: "Поиск книги по названию"},
            {name: "author", title: "Поиск автора"},
        ]
    },
    mutations: {
        setPage(state, payload) {
            state.myPage = payload
        },
        setTitle(state, payload) {
            state.title = payload
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        changeErrorAuth(state, payload) {
            state.authError = payload
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error(state) {
            state.status = 'error'
        },
        searchSet(state, searchType) {
            state.selectedSearch = searchType
        },
        searchItem(state, item) {
            state.searchItem = item
        },
        setUser(state, user) {
            state.status = 'success'
            state.username = user
        }
    },
    actions: {
        setPage({commit}, payload) {
            commit('setPage', payload)
        },
        setTitle({commit}, payload) {
            commit('setTitle', payload)
        },
        getMe({commit}) {
            return new Promise((resolve, reject) => {
                axios(
                    {
                        url: process.env.VUE_APP_BACKEND_API_URL + 'api/books/self-user',
                        method: 'GET'
                    }
                ).then(resp => {
                        const username = resp.data.username
                        commit('setUser', username)
                        resolve(resp)
                    }
                ).catch(err => {
                        commit("logout")
                        reject(err)
                    }
                )
            })
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios(
                    {
                        url: process.env.VUE_APP_BACKEND_API_URL + 'api/login',
                        data: user,
                        method: 'POST'
                    })
                    .then(resp => {
                        const username = resp.data.username
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
                        commit('setUser', username)
                        resolve(resp)

                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })

            })
        },
        authChangeError({commit}, payload) {
            commit('changeErrorAuth', payload)
        },

        logout({commit}) {
            return new Promise((resolve) => {
                    commit('logout')
                    localStorage.removeItem('token')
                    axios(
                        {
                            url: process.env.VUE_APP_BACKEND_API_URL + 'api/logout',
                            method: "GET"
                        },
                    )
                    resolve()
                }
            )
        },
        searchSet({commit}, payload) {
            commit('searchSet', payload)
        },
        searchItem({commit}, payload) {
            commit('searchItem', payload)
        },
    },
    getters: {
        myPage: state => state.myPage,
        title: state => state.title,
        user: state => state.username,
        authError: state => state.authError,
        authStatus: state => state.status,
        searchVariants: state => state.searchVariants,
        selectedSearch: state => state.selectedSearch,
        searchItem: state => state.searchItem,
        isLoggedIn: state => !!state.token,
    },
    modules: {}
})
