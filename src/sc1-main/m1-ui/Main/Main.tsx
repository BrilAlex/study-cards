import {Header} from "./Header/Header";
import {Pages} from "./Pages";
import {useAppDispatch, useAppSelector} from "../../m2-bll/store";
import {ProgressBar} from "../common/components/ProgressBar/ProgressBar";
import {Snackbar} from "../common/components/Snackbar/Snackbar";
import {useEffect} from "react";
import {initializeAppTC} from "../../m2-bll/appReducer";
import {Spinner} from "../common/components/Spinner/Spinner";

export const Main = () => {
  const appIsInitialized = useAppSelector<boolean>(state => state.app.appIsInitialized);
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!appIsInitialized) {
    return <Spinner/>
  }

  return (
    <>
      <Header/>
      <div style={{height: '5px'}}>
        {isLoading && <ProgressBar/>}
      </div>
      <Pages/>
      <Snackbar/>
    </>
  );
};
