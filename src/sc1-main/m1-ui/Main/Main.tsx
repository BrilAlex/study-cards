import {Header} from "./Header/Header";
import {Pages} from "./Pages";
import {useAppDispatch, useAppSelector} from "../../m2-bll/store";
import {ProgressBar} from "../common/components/ProgressBar/ProgressBar";
import {Snackbar} from "../common/components/Snackbar/Snackbar";
import {useEffect} from "react";
import {initializeAppTC} from "../../m2-bll/appReducer";

export const Main = () => {
  const appIsInitialized = useAppSelector<boolean>(state => state.app.appIsInitialized);
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!appIsInitialized) {
    return <h1 style={{textAlign: "center"}}>App is initializing</h1>
  }

  return (
    <>
      <Header/>
      {isLoading && <ProgressBar/>}
      <Pages/>
      <Snackbar/>
    </>
  );
};
