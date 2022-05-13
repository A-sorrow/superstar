import axios from 'axios'

//创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
})

//设置request请求拦截器
service.interceptors.request.use(
  (config) => {
    // config.url请求地址
    // config.code请求状态
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 设置response返回拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service