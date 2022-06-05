import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {registerTC, setErrorAC, setSuccessAC} from "../bll/registrationReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import s from "../../../../sc1-main/m1-ui/App.module.css";
import {InputPassword} from "../../../../sc1-main/m1-ui/common/components/c4-InputPassword/InputPassword";

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
      <p>Study Cards</p>
      <h1>Registration</h1>
      <div>
        <InputText value={email} onChangeText={setEmail} placeholder={"Email"}/>
        <InputPassword
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
        />
        <InputPassword
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder={"Confirm password"}
        />
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={registerHandler} disabled={isLoading}>Register</Button>
      </div>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
};

