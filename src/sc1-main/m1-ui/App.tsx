import React from "react";
import s from "./App.module.css";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../m2-bll/store";
import {Main} from "./Main/Main";

export const App = () => {
  return (
    <div className={s.App}>
      <Provider store={store}>
        <HashRouter>
          <Main/>
        </HashRouter>
      </Provider>
    </div>
  );
};
