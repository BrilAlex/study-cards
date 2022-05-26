import {AppThunkType} from "../../sc1-main/m2-bll/store";

// Types
type InitStateType = typeof initState;
type SomeActionType = ReturnType<typeof someActionAC>;
export type ProfileActionsType = SomeActionType;

// Initial state
const initState = {};

// Action creators
export const someActionAC = () => ({type: "profile/SOME-ACTION"} as const);

// Thunk creators
export const someThunkTC = (): AppThunkType => (dispatch) => {
  dispatch(someActionAC);
};

export const profileReducer = (state: InitStateType = initState, action: ProfileActionsType): InitStateType => {
  switch (action.type) {
    case "profile/SOME-ACTION":
      return {...state};
    default:
      return state;
  }
};
