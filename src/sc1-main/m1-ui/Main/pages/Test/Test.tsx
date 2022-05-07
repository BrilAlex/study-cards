import {InputText} from "../../../common/components/c1-InputText/InputText";
import {Button} from "../../../common/components/c2-Button/Button";
import {Checkbox} from "../../../common/components/c3-Checkbox/Checkbox";
import {useState} from "react";
import s from "./Test.module.css";

export const Test = () => {
  const [text, setText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const showAlert = () => {
    alert(text);
  };

  return (
    <div>
      <h1>Test</h1>
      <div className={s.column}>
        <InputText
          value={text}
          onChangeText={setText}
          onEnter={showAlert}
        />
        <Button onClick={showAlert}>
          Some button
        </Button>
        <Checkbox checked={checked} onChangeChecked={setChecked}>Some text</Checkbox>
      </div>
    </div>
  );
};
