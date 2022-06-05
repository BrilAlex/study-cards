import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {passwordAPI} from "../../../sc1-main/m3-dal/passwordApi";

// Types
type InitStateType = typeof initState;
type redirectActionType = ReturnType<typeof redirectAC>;
type setPasswordErrorActionType = ReturnType<typeof setPasswordErrorAC>;
export type PasswordRecoveryActionsType = redirectActionType | setPasswordErrorActionType;

// Variables
const REDIRECT_TO_CHECK_EMAIL_SUCCESS_PAGE = "passwordRecovery/REDIRECT-TO-CHECK-EMAIL-SUCCESS-PAGE"

// Initial state
const initState = {
    info: '',
    error: null as null | string,
    enteredEmail: '',
};

// Action creators
export const setPasswordErrorAC = (value: null | string) => ({type: "passwordRecovery/SET-ERROR", value} as const);
export const redirectAC = (enteredEmail: string) => ({
    type: REDIRECT_TO_CHECK_EMAIL_SUCCESS_PAGE,
    enteredEmail
} as const);

// Thunk creators
export const recoveryPasswordTC = (email: string, message: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    passwordAPI.forgot(email, message)
        .then(() => {
            dispatch(redirectAC(email))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setPasswordErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const passwordRecoveryReducer = (state: InitStateType = initState, action: PasswordRecoveryActionsType): InitStateType => {
    switch (action.type) {
        case REDIRECT_TO_CHECK_EMAIL_SUCCESS_PAGE:
            return {...state, enteredEmail: action.enteredEmail};
        case "passwordRecovery/SET-ERROR":
            return {...state, error: action.value};
        default:
            return state;
    }
};
