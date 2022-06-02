import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {LoginActionsType, loginReducer} from "../../sc2-features/f1-auth/Login/bll/loginReducer";
import {
  RegistrationActionsType,
  registrationReducer
} from "../../sc2-features/f1-auth/Registration/bll/registrationReducer";
import {ProfileActionsType, profileReducer} from "../../sc2-features/f2-profile/bll/profileReducer";
import {
  NewPasswordActionsType,
  newPasswordReducer
} from "../../sc2-features/f1-auth/NewPassword/newPasswordReducer";
import {
  PasswordRecoveryActionsType,
  passwordRecoveryReducer
} from "../../sc2-features/f1-auth/PasswordRecovery/passwordRecoveryReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "./appReducer";

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootActionsType =
  | AppActionsType
  | LoginActionsType
  | RegistrationActionsType
  | ProfileActionsType
  | NewPasswordActionsType
  | PasswordRecoveryActionsType;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
});

// Custom `useDispatch` and `useSelector: Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
