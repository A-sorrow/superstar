/*
 * @Author: chenghei
 * @Date: 2022-05-13 21:18:25
 * @LastEditors: chenghei
 * @LastEditTime: 2022-05-13 21:18:25
 * @Descripttion: 
 */
import { Loading } from 'element-ui'

let _ = require('lodash')
let loadingCount = 0
let loading

const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
    target: document.querySelector('home-content')
  })
}

const endLoading = () => {
  loading.close()
}
const tryCloseLoading = () => {
  if (loadingCount === 0) {
    endLoading()
  }
}
// 开启loading
export const showFullScreenLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount++
}
// 关闭loading
export const tryHideFullScreenLoading = () => {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    _.debounce(tryCloseLoading, 300)()// 合并一定间隔时间内请求的 loading
  }
}
