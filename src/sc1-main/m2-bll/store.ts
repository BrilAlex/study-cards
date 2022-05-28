import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {LoginActionsType, loginReducer} from "../../sc2-features/f1-auth/Login/loginReducer";
import {
  RegistrationActionsType,
  registrationReducer
} from "../../sc2-features/f1-auth/Registration/registrationReducer";
import {ProfileActionsType, profileReducer} from "../../sc2-features/f2-profile/profileReducer";
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

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType =
  | LoginActionsType
  | RegistrationActionsType
  | ProfileActionsType
  | NewPasswordActionsType
  | PasswordRecoveryActionsType;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>;

const rootReducer = combineReducers({
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
