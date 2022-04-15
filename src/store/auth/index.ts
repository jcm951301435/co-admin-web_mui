import { makeAutoObservable } from 'mobx'
import { getToken, setToken, removeToken } from '@/utils/auth'
import RootStore from '@/store'
import { UserInfoType } from '@/model/auth'

const defaultUserInfo = {
  username: '',
  password: '',
  nickName: '',
  gender: '',
  permission: [''],
}

class AuthStore {
  public token = getToken()
  public userInfo = { ...defaultUserInfo }
  public rootStore

  public constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  public get isLogin(): boolean {
    return !!this.token
  }

  public get userPermission(): string[] {
    const userInfo = this.userInfo
    let permission: Array<string> = []
    if (userInfo) {
      for (let item in userInfo) {
        if (item === 'permission') {
          permission = userInfo[item]
          continue
        }
      }
    }
    return permission
  }

  public updateToken = (token: string) => {
    this.token = token
    setToken(token, false)
  }

  public cleanToken() {
    this.token = ''
    this.userInfo = { ...defaultUserInfo }
    removeToken()
  }

  public setUserInfo = (value: UserInfoType) => {
    this.userInfo = value
  }

  public cleanUserInfo = () => {
    this.userInfo = { ...defaultUserInfo }
  }
}

export default AuthStore
