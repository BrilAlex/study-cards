import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {authApi} from "./dal/api";
import {getAuthThunk} from "../../f2-profile/bll/profileReducer";

// Types
type InitStateType = typeof initState;
export type LoginActionsType =
  ReturnType<typeof loginAC>
  | ReturnType<typeof logoutAC>
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof setErrorMessagesAC>;

// Initial state
const initState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  created: 0,
  updated: 0,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',  //ошибки от сервера
};

// Action creators
export const loginAC = (payload: InitStateType) => ({type: "login/LOGIN", payload} as const);
export const logoutAC = () => ({type: "login/LOGOUT"} as const);
export const authMeAC = (payload: InitStateType) => ({type: "login/AUTH_ME", payload} as const);
export const setErrorMessagesAC = (payload: string) => ({type: "login/SET_ERROR_MESSAGE", payload} as const);

// Thunk creators
export const AuthMeThunkTC = (): AppThunkType => (dispatch) => {
  authApi.me()
    .then(res => dispatch(authMeAC({...res})))
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');

      //чтобы посмотреть объект ошибки:
      console.log('Error: ', error);
      dispatch(setErrorMessagesAC("some Error. More info in console"))
      ;
    })
}
export const LoginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch) => {
  authApi.login(email, password, remember)
    .then(res => {
      dispatch(loginAC({...res}))
      dispatch(getAuthThunk())
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');

      console.log('Error: ', error);
      dispatch(setErrorMessagesAC("some Error. More info in console"))
      ;
    });
};
export const LogoutThunkTC = (): AppThunkType => (dispatch) => {
  authApi.logout()
    .then(() => dispatch(getAuthThunk())) //тут получаем те же данные что и в аусМи, можно не делать вторую санку а сразу экшен вызывать и пинать респонс в стор
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');

      console.log('Error: ', error);
      dispatch(setErrorMessagesAC("some Error. More info in console"))
      ;
    });
};

//reducer
export const loginReducer = (state: InitStateType = initState, action: LoginActionsType): InitStateType => {
  switch (action.type) {
    case "login/AUTH_ME":
      return {...action.payload}
    case "login/LOGIN": {
      return {...action.payload}
    }
    case "login/LOGOUT": {
      return {...initState}
    }
    case "login/SET_ERROR_MESSAGE": {
      return {...state, error: action.payload}
    }
    default:
      return state;
  }
};
