import {LoginForm} from "./LoginForm";
import s from "../../../sc1-main/m1-ui/App.module.css";
import {ProgressBar} from "../../../sc1-main/m1-ui/common/components/ProgressBar/ProgressBar";
import {useAppSelector} from "../../../sc1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";

export const Login = () => {

  const appIsLoading = useAppSelector(state => state.app.appIsLoading)
  const user_ID = useAppSelector(state => state.profile.user._id);

  if (user_ID) {
    return <Navigate to={PATH.PROFILE}/>
  }

  return (
    <div className={s.smallContainer}>
      <h1>Card samurai</h1>
      <h2>Sign in</h2>
      <LoginForm/>
      {appIsLoading && <ProgressBar/>}
    </div>
  );
};
