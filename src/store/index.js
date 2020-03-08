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
    user: {},
    status: '',
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
  },
  actions: {
    setPage({commit}, payload) {
      commit('setPage', payload)
    },
    setTitle({commit}, payload) {
      commit('setTitle', payload)
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
              commit('auth_success', token, username)
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
            resolve()
          }
      )
    },
  },
  getters: {
    myPage: state => state.myPage,
    title: state => state.title,
    authError: state => state.authError,
    authStatus: state => state.status,
    isLoggedIn: state => !!state.token,
  },
  modules: {
  }
})
