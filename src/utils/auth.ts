import Cookies from 'js-cookie'
import config from '@/config'

const TokenKey = config.TOKEN_KEY
const tokenCookieExpires = config.TOKEN_COOKIE_EXPIRES

export function getToken() {
  const token = Cookies.get(TokenKey)
  if (!token) {
    return ''
  }
  return token
}

export function setToken(token: string, rememberMe: boolean) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
