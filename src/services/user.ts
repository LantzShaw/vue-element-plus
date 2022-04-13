import http from '@/utils/http'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

export type LoginParams = {
  username: string
  password: string
}

export type LoginModel = {
  username: string
  email: string
}

export const getUsers = (params: LoginParams) => http.get<LoginModel>({ url: Api.Login, params })
export const addUser = (params: any) => http.post<void>({ url: Api.Login, params })
export const getNotifications = (params: any) => http.get({ url: '/notifications', params })
