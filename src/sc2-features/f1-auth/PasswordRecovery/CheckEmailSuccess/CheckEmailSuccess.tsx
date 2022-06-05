import React from 'react';
import s from "../../../../sc1-main/m1-ui/App.module.css";
import img from "./email.png"
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";

export const CheckEmailSuccess = () => {

    const enteredEmail = useAppSelector<string>(state => state.passwordRecovery.enteredEmail)

    return (
        <div className={s.smallContainer}>
            <h1>it-incubator</h1>
            <img src={img} alt="email"/>
            <h2>Check Email</h2>
            <p>{`We've sent an Email with instructions to ${enteredEmail}`}</p>
        </div>
    );
};