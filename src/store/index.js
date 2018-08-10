import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    homeTab: 'list'
  },
  mutations: {
    changeHomeTab (state, str) {
      state.homeTab = str
    }
  }
})

export default store
