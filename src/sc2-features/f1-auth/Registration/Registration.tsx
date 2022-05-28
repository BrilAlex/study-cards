import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {registerTC} from "./registrationReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";

export const Registration = () => {
  const [email, setEmail] = useState("mail@mail.com");
  const [password, setPassword] = useState("123456789");
  const [passwordConfirm, setPasswordConfirm] = useState("123456789");

  const isLoading = useAppSelector<boolean>(state => state.registration.isLoading);
  const success = useAppSelector<boolean>(state => state.registration.success);
  const error = useAppSelector<null | string>(state => state.registration.error);
  const dispatch = useAppDispatch();

  const registerHandler = useCallback(() => {
    dispatch(registerTC({email, password, passwordConfirm}));
  }, [dispatch, email, password, passwordConfirm]);

  if (success) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div>
      <p>Study Cards</p>
      <h1>Registration</h1>
      <div>
        <InputText value={email} onChangeText={setEmail}/>
        <InputText type={"password"} value={password} onChangeText={setPassword}/>
        <InputText type={"password"} value={passwordConfirm} onChangeText={setPasswordConfirm}/>
        <Button>Cancel</Button>
        <Button onClick={registerHandler} disabled={isLoading}>Register</Button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

