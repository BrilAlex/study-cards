import s from "../../../sc1-main/m1-ui/App.module.css";
import {ProgressBar} from "../../../sc1-main/m1-ui/common/components/ProgressBar/ProgressBar";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useState} from "react";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {NavLink} from "react-router-dom";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState("");

  return (
      <div className={s.smallContainer}>
        <h1>It-incubator</h1>
        <h2>Forgot your password?</h2>
          <InputText value={email} onChangeText={setEmail} placeholder={'Email'}/>
          <p>Enter your email address and we will send you further instructions</p>
          <Button>Send Instructions</Button>
          <p>Did you remember your password?</p>
          <NavLink to={'/login'}>Try logging in</NavLink>
        {/*<ProgressBar/>*/}
      </div>
  );
};
