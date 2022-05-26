import {AppThunkType} from "../../../sc1-main/m2-bll/store";

// Types
type InitStateType = typeof initState;
type SomeActionType = ReturnType<typeof someActionAC>;
export type PasswordRecoveryActionsType = SomeActionType;

// Initial state
const initState = {};

// Action creators
export const someActionAC = () => ({type: "passwordRecovery/SOME-ACTION"} as const);

// Thunk creators
export const someThunkTC = (): AppThunkType => (dispatch) => {
  dispatch(someActionAC);
};

export const passwordRecoveryReducer = (state: InitStateType = initState, action: PasswordRecoveryActionsType): InitStateType => {
  switch (action.type) {
    case "passwordRecovery/SOME-ACTION":
      return {...state};
    default:
      return state;
  }
};
