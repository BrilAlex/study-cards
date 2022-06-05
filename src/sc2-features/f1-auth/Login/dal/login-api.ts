import {instance} from "../../../../sc1-main/m3-dal/instance";


export const authApi = {

  login(email: string, password: string, rememberMe?: boolean) {
    return instance.post('auth/login', {email, password, rememberMe}).then(res => res.data)
  },
  logout() {
    return instance.delete('auth/me').then(res => res.data)
  }
}
