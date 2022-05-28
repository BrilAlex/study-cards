import axios from "axios";

let baseURL: string;
let dev = true;
//dev - в разработке. От этого зависит к какому серверу обращаемся

if (dev) {
  baseURL = 'http://localhost:7542/2.0/'
} else {
  baseURL = ' https://neko-back.herokuapp.com/2.0'
}

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

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

