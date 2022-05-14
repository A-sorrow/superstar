import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users
  },
  getters
})
