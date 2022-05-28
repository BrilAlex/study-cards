import React from 'react';
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";


export const Profile = () => {

  const saveHandler = () => {

  }
  return (
    <div>
      <InputText/>
      <Button onClick={saveHandler}>Save</Button>
      <Button onClick={() => {
      }}>Cancel</Button>
    </div>

  );
};

