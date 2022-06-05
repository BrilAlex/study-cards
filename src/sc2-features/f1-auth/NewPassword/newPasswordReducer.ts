import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {passwordAPI} from "../../../sc1-main/m3-dal/passwordApi";

// Types
type InitStateType = typeof initState;
type setNewPasswordSuccessActionType = ReturnType<typeof setNewPasswordSuccessAC>;
type setNewPasswordErrorActionType = ReturnType<typeof setNewPasswordErrorAC>;
export type NewPasswordActionsType = setNewPasswordSuccessActionType | setNewPasswordErrorActionType;

// Variables
const SET_NEW_PASSWORD_SUCCESS = "newPassword/SET-NEW-PASSWORD-SUCCESS";
const SET_NEW_PASSWORD_ERROR = "newPassword/SET-NEW-PASSWORD-ERROR";

// Initial state
const initState = {
    info: '',
    error: null as null | string,
    success: false,
};

// Action creators
export const setNewPasswordSuccessAC = (success: boolean) => ({type: SET_NEW_PASSWORD_SUCCESS, success} as const);
export const setNewPasswordErrorAC = (error: string | null) => ({type: SET_NEW_PASSWORD_ERROR, error} as const);

// Thunk creators
export const setNewPasswordTC = (password: string, token: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    passwordAPI.setNewPassword(password, token)
        .then(() => {
            dispatch(setNewPasswordSuccessAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setNewPasswordErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const newPasswordReducer = (state: InitStateType = initState, action: NewPasswordActionsType): InitStateType => {
    switch (action.type) {
        case SET_NEW_PASSWORD_SUCCESS:
            return {...state, success: action.success};
        case SET_NEW_PASSWORD_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};
