import {AppThunkType} from "../../../sc1-main/m2-bll/store";

// Types
type InitStateType = typeof initState;
type SomeActionType = ReturnType<typeof someActionAC>;
export type NewPasswordActionsType = SomeActionType;

// Initial state
const initState = {};

// Action creators
export const someActionAC = () => ({type: "newPassword/SOME-ACTION"} as const);

// Thunk creators
export const someThunkTC = (): AppThunkType => (dispatch) => {
  dispatch(someActionAC);
};

export const newPasswordReducer = (state: InitStateType = initState, action: NewPasswordActionsType): InitStateType => {
  switch (action.type) {
    case "newPassword/SOME-ACTION":
      return {...state};
    default:
      return state;
  }
};
