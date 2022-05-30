import {Header} from "./Header/Header";
import {Pages} from "./Pages";
import {useAppSelector} from "../../m2-bll/store";
import {ProgressBar} from "../common/components/ProgressBar/ProgressBar";
import {Snackbar} from "../common/components/ErrorSnackbar/Snackbar";

export const Main = () => {
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);

  return (
    <>
      <Header/>
      {isLoading && <ProgressBar/>}
      <Pages/>
      <Snackbar/>
    </>
  );
};
