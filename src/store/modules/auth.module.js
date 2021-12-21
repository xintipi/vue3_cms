import { STORE_AUTH_PROFILE, CLEAR_AUTH_PROFILE } from '@/store/mutation.type'

export default {
  namespaced: true,

  state: () => ({
    authProfile: null
  }),

  getters: {
    authProfile: (state) => state.authProfile
  },

  mutations: {
    [STORE_AUTH_PROFILE](state, payload) {
      state.authProfile = payload
    },

    [CLEAR_AUTH_PROFILE](state) {
      state.authProfile = null
    }
  }
}
