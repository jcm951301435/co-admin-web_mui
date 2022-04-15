import request from '@/utils/request'
import { LoginData, LoginReponse } from '@/model/auth'

export function login(data: LoginData) {
  return request.request<LoginReponse>({
    url: '/auth/token',
    method: 'post',
    data: data,
  })
}

export function logout() {
  return request.request({
    url: '/auth/token',
    method: 'delete',
  })
}

export function info() {
  return request.request({
    url: '/auth/info',
    method: 'get',
  })
}
