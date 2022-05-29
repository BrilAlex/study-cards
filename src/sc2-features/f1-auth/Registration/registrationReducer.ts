import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {authRegistrationAPI} from "./registrationApi";

// Types
type InitStateType = typeof initState;
type setLoadingActionType = ReturnType<typeof setIsLoadingAC>;
type setSuccessActionType = ReturnType<typeof setSuccessAC>;
type setErrorActionType = ReturnType<typeof setErrorAC>;
export type RegistrationActionsType =
  | setLoadingActionType
  | setSuccessActionType
  | setErrorActionType;
export type SignUpFormDataType = {
  email: string
  password: string
  passwordConfirm: string
};

// Initial state
const initState = {
  isLoading: false,
  success: false,
  error: null as null | string,
};

// Action creators
export const setIsLoadingAC = (value: boolean) =>
  ({type: "registration/SET-LOADING", value} as const);
export const setSuccessAC = (value: boolean) =>
  ({type: "registration/SET-SUCCESS", value} as const);
export const setErrorAC = (value: null | string) =>
  ({type: "registration/SET-ERROR", value} as const);

// Thunk creators
export const registerTC = (formData: SignUpFormDataType): AppThunkType => (dispatch) => {
  const {email, password, passwordConfirm} = formData;

  if (password !== passwordConfirm) {
    dispatch(setErrorAC("Passwords don't match!"));
    return;
  }

  dispatch(setIsLoadingAC(true));
  authRegistrationAPI.register(email, password)
    .then(response => {
      console.log(response);
      dispatch(setSuccessAC(true));
    })
    .catch(error => {
      dispatch(setErrorAC(error.response.data.error));
    })
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionsType): InitStateType => {
  switch (action.type) {
    case "registration/SET-LOADING":
      return {...state, isLoading: action.value};
    case "registration/SET-SUCCESS":
      return {...state, success: action.value};
    case "registration/SET-ERROR":
      return {...state, error: action.value};
    default:
      return state;
  }
};
