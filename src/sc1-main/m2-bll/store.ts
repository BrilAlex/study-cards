import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";
import thunk from "redux-thunk";

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  test: testReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
