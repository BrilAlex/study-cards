import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {registerTC, setErrorAC, setSuccessAC} from "../bll/registrationReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import s from "../../../../sc1-main/m1-ui/App.module.css";
import {InputPassword} from "../../../../sc1-main/m1-ui/common/components/c4-InputPassword/InputPassword";
import slog from '../../Login/ui/auth.module.css'

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
  const success = useAppSelector<boolean>(state => state.registration.success);
  const error = useAppSelector<null | string>(state => state.registration.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cancelHandler = useCallback(() => {
    navigate(PATH.LOGIN);
  }, [navigate]);

  const registerHandler = useCallback(() => {
    dispatch(registerTC({email, password, passwordConfirm}));
  }, [dispatch, email, password, passwordConfirm]);

  useEffect(() => {
    return () => {
      dispatch(setErrorAC(null));
      dispatch(setSuccessAC(false));
    };
  }, [dispatch]);

  if (success) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div className={s.smallContainer}>
      <h1>Study Cards</h1>
      <h2>Sign Up</h2>
      <div>
        <form className={slog.form}>
          <span className={slog.inputLabel}>Email</span>
          <InputText
            className={slog.input}
            value={email}
            onChangeText={setEmail}
          />
          <span className={slog.inputLabel}>Password</span>
          <InputPassword
            className={slog.input}
            value={password}
            onChangeText={setPassword}
          />
          <span className={slog.inputLabel}>Confirm password</span>
          <InputPassword
            className={slog.input}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          /></form>
        <div style={{marginTop: '84px'}}>
          <Button onClick={cancelHandler} style={{backgroundColor: '#D7D8EF', color: '#21268F'}}>Cancel</Button>
          <Button onClick={registerHandler} disabled={isLoading}>Sign Up</Button>
        </div>
      </div>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
};

