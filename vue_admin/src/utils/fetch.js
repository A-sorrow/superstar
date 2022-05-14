/*
 * @Author: chenghei
 * @Date: 2022-05-13 21:16:15
 * @LastEditors: chenghei
 * @LastEditTime: 2022-05-13 21:21:06
 * @Descripttion: 
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
import store from '@/store'
import Router from '@/router'
// eslint-disable-next-line no-tabs
import qs from	'qs'
const NODE_ENV = process.env.NODE_ENV
console.log(NODE_ENV, '我当前是什么环境')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.withCredentials = true // 跨域请求，允许保存cookie
axios.defaults.timeout = 5000 // 最大等待超时时间
// request拦截器 请求之前
axios.interceptors.request.use(config => {
  if (config.showLoading) {
    showFullScreenLoading()
  }
  return config
}, error => {
  // 做一些请求错误
  // console.log(error)
  Promise.reject(error)
})
// 响应拦截 请求之后
axios.interceptors.response.use(response => {
  if (response.config.showLoading) {
    tryHideFullScreenLoading()
  }
  const res = response.data
  if (res.code && res.code == 9) { // 用户未登录
    // MessageBox.confirm('用户未登录，请登录后操作！', '登录提示', {
    //   confirmButtonText: '登录',
    //   showClose: false,
    //   closeOnClickModal: false,
    //   showCancelButton: false,
    //   type: 'warning'
    // }).then(() => {
    //   store.dispatch('forRetlogin').then(() => {
    //     Router.push({name: 'Createstore'}).catch(err => { console.log(err) })
    //   })
    // })
  } else if (res.code && res.code == 101) {
    Message({
      message: res.message,
      type: 'error'
    })
  } else if (res.code != 0) {
    Message({
      message: res.message,
      type: 'error'
    })
  }
  return response
}, _error => {
  tryHideFullScreenLoading()
  Message({
    message: '请求出错，稍后重试',
    type: 'error'
  })
  return Promise.reject(_error)
})
export default {
  fetchGet (url, param = {}, config = { showLoading: true }) { // get请求
    let params = Object.assign(param)
    return new Promise((resolve, reject) => {
      axios.get(url, {...config, params}).then(res => {
        resolve(res.data)
      }).catch(_error => {
        reject(new Error('我是get的错误'))
      })
    })
  },
  fecthPost (url, param = {}, config = { showLoading: true }) { // 发送post请求
    return new Promise((resolve, reject) => {
      axios.post(url, param, config).then(res => {
        resolve(res.data)
      }).catch(_error => {
        reject(new Error('我是post的错误'))
      })
    })
  },
  fecthStrWithoutCookiePost (url, param = {}) { // 发送post请求，字符串形式，不跨域写cookie
    let config = {
      // 添加请求头
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'CrossDomain': true,
      'withCredentials': false
    }
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(param), config).then(res => {
        resolve(res.data)
      }).catch(_error => {
        reject(new Error('我是post的错误'))
      })
    })
  },
  fileUpload (url, param = new FormData()) { // 发送文件post请求
    let params = param
    let config = {
      // 添加请求头
      'Content-Type': 'multipart/form-data',
      'CrossDomain': true
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then(res => {
        resolve(res.data)
      }).catch(_error => {
        reject(new Error('我是上传文件post错误'))
      })
    })
  }
}
