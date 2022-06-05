import {AppThunkType} from "../../../../sc1-main/m2-bll/store";
import {authApi} from "../dal/login-api";
import {setAuthDataAC} from "../../../f2-profile/bll/profileReducer";
import {setAppErrorAC, setAppIsLoadingAC} from "../../../../sc1-main/m2-bll/appReducer";

// Types
type InitStateType = typeof initState;
export type LoginActionsType =
  ReturnType<typeof loginAC>
  | ReturnType<typeof logoutAC>
  | ReturnType<typeof authMeAC>

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

// Thunk creators

export const LoginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true))
  authApi.login(email, password, remember)
    .then(res => {
      dispatch(setAuthDataAC(res));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');

      dispatch(setAppErrorAC(error));
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false))
    })
};
export const LogoutThunkTC = (): AppThunkType => (dispatch) => {
  authApi.logout()
    .then((res) => {
      dispatch(setAppErrorAC(res.info))
      dispatch(setAuthDataAC(res));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');

      dispatch(setAppErrorAC(error));
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

    default:
      return state;
  }
};
