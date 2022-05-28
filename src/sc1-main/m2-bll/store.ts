import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {LoginActionsType, loginReducer} from "../../sc2-features/f1-auth/Login/loginReducer";
import {
  RegistrationActionsType,
  registrationReducer
} from "../../sc2-features/f1-auth/Registration/registrationReducer";
import {ProfileActionsType, profileReducer} from "../../sc2-features/f2-profile/bll/profileReducer";
import {
  NewPasswordActionsType,
  newPasswordReducer
} from "../../sc2-features/f1-auth/NewPassword/newPasswordReducer";
import {
  PasswordRecoveryActionsType,
  passwordRecoveryReducer
} from "../../sc2-features/f1-auth/PasswordRecovery/passwordRecoveryReducer";
import thunk, {ThunkAction} from "redux-thunk";

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType =
  | LoginActionsType
  | RegistrationActionsType
  | ProfileActionsType
  | NewPasswordActionsType
  | PasswordRecoveryActionsType;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
