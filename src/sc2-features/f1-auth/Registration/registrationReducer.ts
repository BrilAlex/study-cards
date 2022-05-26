import {AppThunkType} from "../../../sc1-main/m2-bll/store";

// Types
type InitStateType = typeof initState;
type SomeActionType = ReturnType<typeof someActionAC>;
export type RegistrationActionsType = SomeActionType;

// Initial state
const initState = {};

// Action creators
export const someActionAC = () => ({type: "registration/SOME-ACTION"} as const);

// Thunk creators
export const someThunkTC = (): AppThunkType => (dispatch) => {
  dispatch(someActionAC);
};

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionsType): InitStateType => {
  switch (action.type) {
    case "registration/SOME-ACTION":
      return {...state};
    default:
      return state;
  }
};
