import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

export const Registration = () => {
  return (
    <div>
      <p>Study Cards</p>
      <h1>Registration</h1>
      <div>
        <InputText
          value={"saasasas"}
          onChangeText={() => {}}
          onEnter={() => {}}
        />
        <InputText
          value={"adadadadd"}
          onChangeText={() => {}}
          onEnter={() => {}}
          type={"password"}
        />
        <InputText
          value={""}
          onChangeText={() => {}}
          onEnter={() => {}}
        />
        <Button onClick={() => {}}>Cancel</Button>
        <Button onClick={() => {}}>Register</Button>
      </div>
    </div>
  );
};

