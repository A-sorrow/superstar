import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO] (state, userinfo) {
    state.userinfo = userinfo
  }
}
export default mutations
