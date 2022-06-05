import s from "../../../sc1-main/m1-ui/App.module.css";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useState} from "react";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {recoveryPasswordTC} from "./passwordRecoveryReducer";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";

export const PasswordRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch()
  const enteredEmail = useAppSelector<string>(state => state.passwordRecovery.enteredEmail)
  const error = useAppSelector<null | string>(state => state.passwordRecovery.error);

  if (enteredEmail) {
    return <Navigate to={PATH.CHECK_EMAIL_SUCCESS}/>;
  }

  const onClickHandler = () => {
    const message = `<div style="background-color: lime; padding: 15px">
              password recovery link:
               <a href='https://brilalex.github.io/study-cards/#/create-new-password/$token$'>
               link
               </a>
               </div>`;
    dispatch(recoveryPasswordTC(email, message))
  }
  return (
    <div className={s.smallContainer}>
      <h1>It-incubator</h1>
      <h2>Forgot your password?</h2>
      <InputText value={email} onChangeText={setEmail} placeholder={'Email'}/>
      {error && <p>{error}</p>}
      <p>Enter your email address and we will send you further instructions</p>
      <Button onClick={onClickHandler}>Send Instructions</Button>
      <p>Did you remember your password?</p>
      <NavLink to={'/login'}>Try logging in</NavLink>
    </div>
  );
};
