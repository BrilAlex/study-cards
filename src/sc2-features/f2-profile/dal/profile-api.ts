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
export type UpdatedUser = {
  token: string
  tokenDeathTime: Date
  updatedUser: UserType
}


export const ProfileApi = {

  me() {
    return instance.post<UserType>(`/auth/me`, {})
      .then(res => res.data)
  },
  updateUserData(name: string, avatar: string) {
    return instance.put<UpdatedUser>(`/auth/me`, {name, avatar})
      .then(res => res.data)
  },
  logOut() { // где он должен быть?
    return instance.delete<any>(`/auth/me`, {})
      .then(res => res.data)
  },
}
