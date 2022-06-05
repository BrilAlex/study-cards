import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {setErrorAC} from "../PasswordRecovery/passwordRecoveryReducer";
import {passwordAPI} from "../../../sc1-main/m3-dal/passwordApi";

// Types
type InitStateType = typeof initState;
type setNewPasswordActionType = ReturnType<typeof setNewPasswordAC>;
export type NewPasswordActionsType = setNewPasswordActionType;

// Initial state
const initState = {
    info: '',
    error: null as null | string,
    success: false,
};

// Action creators
export const setNewPasswordAC = (success: boolean) => ({type: "newPassword/SET-NEW-PASSWORD", success} as const);

// Thunk creators
export const setNewPasswordTC = (password: string, token: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    passwordAPI.setNewPassword(password, token)
        .then(() => {
            dispatch(setNewPasswordAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const newPasswordReducer = (state: InitStateType = initState, action: NewPasswordActionsType): InitStateType => {
    switch (action.type) {
        case "newPassword/SET-NEW-PASSWORD":
            return {...state, success: action.success};
        default:
            return state;
    }
};
