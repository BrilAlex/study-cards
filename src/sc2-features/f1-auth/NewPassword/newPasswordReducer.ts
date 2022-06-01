import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {passwordAPI} from "../PasswordRecovery/dal/api";
import {setErrorAC} from "../PasswordRecovery/passwordRecoveryReducer";

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
export const setNewPasswordAC = () => ({type: "newPassword/SET-NEW-PASSWORD"} as const);

// Thunk creators
export const setNewPasswordTC = (password: string, token: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    passwordAPI.setNewPassword(password, token)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const newPasswordReducer = (state: InitStateType = initState, action: NewPasswordActionsType): InitStateType => {
    switch (action.type) {
        case "newPassword/SET-NEW-PASSWORD":
            return {...state};
        default:
            return state;
    }
};
