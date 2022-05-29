import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {ProfileApi, UserType} from "../dall/profile-api";

// Types
type InitStateType = typeof initState;
type SetAuthDataActionType = ReturnType<typeof setAuthDataAC>;
export type ProfileActionsType = SetAuthDataActionType;

// Initial state
const initState = {
  loading: false,
  user: {} as UserType,
};

// Action creators
export const setAuthDataAC = (user: UserType) => ({type: "profile/SET-AUTH-DATA", user} as const);

// Thunk creators
export const getAuthThunk = (): AppThunkType => (dispatch) => {
  ProfileApi.me().then(res => {
    dispatch(setAuthDataAC(res));
  })
};

export const profileReducer = (state: InitStateType = initState, action: ProfileActionsType): InitStateType => {
  switch (action.type) {
    case "profile/SET-AUTH-DATA":
      return {...state, user: action.user};
    default:
      return state;
  }
};
