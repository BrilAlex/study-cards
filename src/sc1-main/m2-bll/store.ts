import {combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  test: testReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
