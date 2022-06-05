import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {passwordAPI} from "../../../sc1-main/m3-dal/passwordApi";

// Types
type InitStateType = typeof initState;
type redirectActionType = ReturnType<typeof redirectAC>;
type setErrorActionType = ReturnType<typeof setErrorAC>;
export type PasswordRecoveryActionsType = redirectActionType | setErrorActionType;

// Initial state
const initState = {
    info: '',
    error: null as null | string,
    success: false,
};

// Action creators
export const setErrorAC = (value: null | string) => ({type: "passwordRecovery/SET-ERROR", value} as const);
export const redirectAC = (success: boolean) => ({
    type: "passwordRecovery/REDIRECT-TO-CREATE-NEW-PASSWORD-PAGE",
    success
} as const);

// Thunk creators
export const recoveryPasswordTC = (email: string, message: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));

    passwordAPI.forgot(email, message)
        .then((res) => {
            console.log(res)
            dispatch(redirectAC(res.data.success))
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

export const passwordRecoveryReducer = (state: InitStateType = initState, action: PasswordRecoveryActionsType): InitStateType => {
    switch (action.type) {
        case "passwordRecovery/REDIRECT-TO-CREATE-NEW-PASSWORD-PAGE":
            return {...state, success: action.success};
        case "passwordRecovery/SET-ERROR":
            return {...state, error: action.value};
        default:
            return state;
    }
};
