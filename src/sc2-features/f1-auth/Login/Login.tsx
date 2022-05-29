import {LoginForm} from "./LoginForm";
import s from "../../../sc1-main/m1-ui/App.module.css";
import {ProgressBar} from "../../../sc1-main/m1-ui/common/components/ProgressBar/ProgressBar";

export const Login = () => {

  return (
    <div className={s.smallContainer}>
      <h1>Card samurai</h1>
      <h2>Sign in</h2>
      <LoginForm/>
      <ProgressBar/>
    </div>
  );
};
