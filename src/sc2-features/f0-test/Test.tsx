import {InputText} from "../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Checkbox} from "../../sc1-main/m1-ui/common/components/c3-Checkbox/Checkbox";
import {useState} from "react";
import s from "./Test.module.css";
import {useAppDispatch} from "../../sc1-main/m2-bll/store";
import {LogoutThunkTC} from "../f1-auth/Login/bll/loginReducer";
import {InputPassword} from "../../sc1-main/m1-ui/common/components/c4-InputPassword/InputPassword";

export const Test = () => {
  const [text, setText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const showAlert = () => {
    alert(text);
  };
  const logoutHandler = () => {
    dispatch(LogoutThunkTC())
  }
  return (
    <div>
      <h1>Test</h1>
      <div className={s.column}>
        <InputText
          value={text}
          onChangeText={setText}
          onEnter={showAlert}
        />
        <InputPassword
          value={text}
          onChangeText={setText}
          onEnter={showAlert}
        />
        <Button onClick={showAlert}>
          Some button
        </Button>
        <Button onClick={logoutHandler}>
          Logout
        </Button>
        <Checkbox checked={checked} onChangeChecked={setChecked}>Some text</Checkbox>
      </div>
    </div>
  );
};
