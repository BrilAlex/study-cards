import s from "../../../sc1-main/m1-ui/App.module.css";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useEffect, useState} from "react";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {recoveryPasswordTC, setPasswordErrorAC} from "./passwordRecoveryReducer";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import slog from './../Login/ui/login.module.css';

export const PasswordRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch()
  const enteredEmail = useAppSelector<string>(state => state.passwordRecovery.enteredEmail)
  const error = useAppSelector<null | string>(state => state.passwordRecovery.error);
  const message = `<div style="background-color: lime; padding: 15px">
              password recovery link:
               <a href='https://brilalex.github.io/study-cards/#/create-new-password/$token$'>
               link
               </a>
               </div>`;

  useEffect(() => {
    return () => {
      dispatch(setPasswordErrorAC(null));
    };
  }, [dispatch]);

  if (enteredEmail) {
    return <Navigate to={PATH.CHECK_EMAIL_SUCCESS}/>;
  }

  const onClickHandler = () => {
    dispatch(recoveryPasswordTC(email, message))
  }

  return (
    <div className={s.smallContainer}>
      <h1>Study Cards</h1>
      <h2>Forgot your password?</h2>
      <InputText className={slog.input} value={email} onChangeText={setEmail} placeholder={'Email'} type={'email'}/>
      <div className={slog.greyText}>Enter your email address and we will send you further instructions</div>
      <Button onClick={onClickHandler}>Send Instructions</Button>
      {error && <p style={{color: "red"}}>{error}</p>}
      <div className={slog.greyUnderText}>Did you remember your password?</div>
      <NavLink to={'/login'} className={slog.signUpIn}>Try logging in</NavLink>
    </div>
  );
};
