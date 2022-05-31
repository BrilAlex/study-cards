import s from "../../../sc1-main/m1-ui/App.module.css";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useState} from "react";

export const NewPassword = () => {
  const [password, setPassword] = useState("");
  return (
      <div className={s.smallContainer}>
        <h1>It-incubator</h1>
        <h2>Create new password</h2>
        <InputText type={"password"} value={password} onChangeText={setPassword} placeholder={'Password'}/>
        <p>Create new password and we will send you further instructions to email</p>
        <Button>Create new password</Button>
        {/*<ProgressBar/>*/}
      </div>
  );
};
