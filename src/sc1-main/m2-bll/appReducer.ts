// Types
type InitStateType = typeof initState;

// Initial state
const initState = {
  appInitialized: false,
  appIsLoading: false,
  appError: null as null | string,
};
type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;
type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoadingAC>;
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type AppActionsType =
  | SetAppInitializedActionType
  | SetAppIsLoadingActionType
  | SetAppErrorActionType;

// Action creators
export const setAppInitializedAC = (value: boolean) =>
  ({type: "app/SET-INITIALIZED", payload: {appInitialized: value}} as const);
export const setAppIsLoadingAC = (value: boolean) =>
  ({type: "app/SET-IS-LOADING", payload: {appIsLoading: value}} as const);
export const setAppErrorAC = (value: null | string) =>
  ({type: "app/SET-ERROR", payload: {appError: value}} as const);

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case "app/SET-INITIALIZED":
    case "app/SET-IS-LOADING":
    case "app/SET-ERROR":
      return {...state, ...action.payload};
    default:
      return state;
  }
};