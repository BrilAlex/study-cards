import {instance} from "../../../../sc1-main/m3-dal/instance";


export const authApi = {
  me() {
    return instance.post('/auth/me').then(res => res.data)
  },
  login(email: string, password: string, rememberMe?: boolean) {
    return instance.post('auth/login', {email, password, rememberMe}).then(res => res.data)
    //     .catch (e=> {
    //     const error = e.response
    //       ? e.response.data.error
    //       : (e.message + ', more details in the console');
    // })
  },
  logout() {
    return instance.delete('auth/me').then(res => res.data)
    // .catch(e=> {
    //   const error = e.response
    //     ? e.response.data.error
    //     : (e.message + ', more details in the console');
    // })
  }
}
