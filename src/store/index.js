import { createStore, createLogger } from 'vuex'

import auth from './modules/auth.module'

const state = {}
const getters = {}
const mutations = {}
const debug = process.env.VUE_APP_ENV !== 'production'

const store = createStore({
  modules: {
    auth
  },
  state,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
