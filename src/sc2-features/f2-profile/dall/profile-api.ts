import {instance} from "../../../sc1-main/m3-dal/instance";

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
}


export const ProfileApi = {

  me() {
    return instance.post<UserType>(`/auth/me`, {})
      .then(res => res.data)
  },
  updateUserData(name: string, avatar: string) {
    return instance.put<any>(`/auth/me`, {name, avatar})

      .then(res => res.data)
  },
  logOut() {
    return instance.delete<any>(`/auth/me`, {})
      .then(res => res.data)
  },
  logIn() {
    return instance.post<any>(`/auth/login`, {email: 'ipavka@ukr.net', password: 'ignat2022', rememberMe: true})
      .then(res => res.data)
  }

}
