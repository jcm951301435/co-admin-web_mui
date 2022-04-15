
export interface UserInfoType {
  username: string
  password: string
  nickName: string
  gender: string
  permission: Array<string>
}

export interface LoginReponse {
  token: string
}

export interface LoginData {
  username: string
  password: string
}
