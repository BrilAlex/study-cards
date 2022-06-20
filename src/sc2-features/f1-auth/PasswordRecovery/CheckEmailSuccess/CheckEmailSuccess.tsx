import React from 'react';
import s from "../../../../sc1-main/m1-ui/App.module.css";
import img from "./email.png"
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";
import slog from '../../Login/ui/auth.module.css'

export const CheckEmailSuccess = () => {

  const enteredEmail = useAppSelector<string>(state => state.passwordRecovery.enteredEmail)

  return (
    <div className={s.smallContainer}>
      <h1>Study Cards</h1>
      <img src={img} alt="email" style={{width: '108px', height: '108px', marginTop: '35px'}}/>
      <h2>Check Email</h2>
      <p className={slog.greyUnderText}
         style={{marginBottom: '138px'}}>{`We've sent an Email with instructions to ${enteredEmail}`}</p>
    </div>
  );
};
