import {AppThunkType} from "../../../../sc1-main/m2-bll/store";
import {registrationAPI} from "../../../../sc1-main/m3-dal/registrationApi";
import {setAppIsLoadingAC} from "../../../../sc1-main/m2-bll/appReducer";
import {handleAppRequestError} from "../../../../sc3-utils/errorUtils";

// Types
type InitStateType = typeof initState;
type SetSuccessActionType = ReturnType<typeof setSuccessAC>;
type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type RegistrationActionsType = SetSuccessActionType | SetErrorActionType;
export type SignUpFormDataType = {
  email: string
  password: string
  passwordConfirm: string
};

// Initial state
const initState = {
  success: false,
  error: null as null | string,
};

// Action creators
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

  dispatch(setAppIsLoadingAC(true));
  registrationAPI.register(email, password)
    .then(response => {
      console.log(response);
      dispatch(setErrorAC(null));
      dispatch(setSuccessAC(true));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionsType): InitStateType => {
  switch (action.type) {
    case "registration/SET-SUCCESS":
      return {...state, success: action.value};
    case "registration/SET-ERROR":
      return {...state, error: action.value};
    default:
      return state;
  }
};
