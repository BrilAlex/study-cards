import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useState} from "react";

export const Registration = () => {
  const [email, setEmail] = useState("mail@mail.com");
  const [password, setPassword] = useState("123qwrty");
  const [confirmPassword, setConfirmPassword] = useState("123qwrty");

  return (
    <div>
      <p>Study Cards</p>
      <h1>Registration</h1>
      <div>
        <InputText
          value={email}
          onChangeText={setEmail}
        />
        <InputText
          value={password}
          onChangeText={setPassword}
          type={"password"}
        />
        <InputText
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type={"password"}
        />
        <Button onClick={() => {}}>Cancel</Button>
        <Button onClick={() => {}}>Register</Button>
      </div>
    </div>
  );
};

