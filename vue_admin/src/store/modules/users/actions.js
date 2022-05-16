import * as types from './mutation-types'
// import { Login, User } from '@/utils/api'

// 获取用户信息
export const getUserInfo = ({ commit }) => {
  return new Promise((resolve, reject) => {
    let userparam = {'_type': 'LOAD'}
    User(userparam).then(res => {
      if (res.code != 0) {
        reject(res.message)
      }
      commit(types.SET_USERINFO, res.data.user)
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// export const getUserInfo = ({ commit },getUserInfo) => {
// 	commit(types.SET_SERVICEID,getUserInfo)
// }
