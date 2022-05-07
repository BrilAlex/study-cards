import React from "react";
import s from "./App.module.css";
import {Header} from "./Header/Header";
import {Pages} from "./Main/Pages";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../m2-bll/store";

const App = () => {
  return (
    <div className={s.App}>
      <Provider store={store}>
        <HashRouter>
          <Header/>
          <Pages/>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
