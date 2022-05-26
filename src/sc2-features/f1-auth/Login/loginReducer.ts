import {AppThunkType} from "../../../sc1-main/m2-bll/store";

// Types
type InitStateType = typeof initState;
type SomeActionType = ReturnType<typeof someActionAC>;
export type LoginActionsType = SomeActionType;

// Initial state
const initState = {};

// Action creators
export const someActionAC = () => ({type: "login/SOME-ACTION"} as const);

// Thunk creators
export const someThunkTC = (): AppThunkType => (dispatch) => {
  dispatch(someActionAC);
};

export const loginReducer = (state: InitStateType = initState, action: LoginActionsType): InitStateType => {
  switch (action.type) {
    case "login/SOME-ACTION":
      return {...state};
    default:
      return state;
  }
};
