import axios from 'axios'
import config from '@/config'
import { getToken } from '@/utils/auth'
import { notistack } from '@/components/Notistack'
import process from '@/config/process'

const baseUrl = process.BASE_API_URL?.toString()

const httpMessage = {
  40000: '发生未知错误，请联系管理员解决',
  40001: '网络异常，无法连接',
  40002: '请求超时',

  401: '用户未登录，请重新登陆',
  403: '用户无权访问当前资源',
  404: '请求的资源（网页等）不存在',
  500: '内部服务器错误',
}

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: config.TIME_OUT, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    const headers = config.headers || {}
    if (getToken()) {
      headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    headers['Content-Type'] = 'application/json'
    config.headers = headers
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// response 拦截器
service.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    console.log(error)
    console.log(error.toString())
    // debugger

    if (error.toString().indexOf('Error: Network Error') !== -1) {
      notistack.error(httpMessage[40001])
      return Promise.reject(error)
    }

    if (error.toString().indexOf('Error: timeout') !== -1) {
      notistack.error(httpMessage[40001])
      return Promise.reject(error)
    }

    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          notistack.error(httpMessage[401])
          break
        case 403:
          notistack.error(httpMessage[403])
          break
        case 404:
          notistack.error(httpMessage[404])
          break
        case 500:
          notistack.error(httpMessage[500])
          break
        default:
          notistack.error(httpMessage[40000])
      }
      return Promise.reject(error)
    }

    // 兼容blob下载出错json提示
    if (
      error.response?.data &&
      error.response.data instanceof Blob &&
      error.response.data.type.toLowerCase().indexOf('json') !== -1
    ) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function (e) {
        const result = reader.result
        let errorMsg
        if (result === null) {
          errorMsg = ''
        } else if (result instanceof ArrayBuffer) {
          errorMsg = JSON.parse(JSON.stringify(result)).message
        } else {
          errorMsg = JSON.parse(result).message
        }
        console.log(errorMsg)
        notistack.error(errorMsg)
      }
    }
  },
)

export default service
