import React from 'react';
import s from './EditModal.module.css'
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

type EditModalType = {
  name: string
  inputValue: string
  setInputValue: (value: string) => void
  active: boolean
  setActive: (state: boolean) => void
  inputFocus: () => void
  changeName: () => void
}

export const EditModal: React.FC<EditModalType> = (
  {
    active,
    setActive,
    inputValue,
    setInputValue,
    inputFocus,
    name,
    changeName,
  }
) => {

  const cancelHandler = () => {
    setActive(false);
  }
  const saveHandler = () => {
    changeName();
  }

  return (
    <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>

      <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent} onClick={e => e.stopPropagation()}>
        <h3>Personal information</h3>
        <div className={s.inputBlock}>
          <InputText className={s.modalInput}
                     value={inputValue}
                     onChangeText={setInputValue}
                     onFocus={inputFocus}
                     placeholder={name}
          />
          <span>email@name.com</span>
        </div>

        <div>
          <Button onClick={saveHandler}>Save</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </div>
      </div>

    </div>
  );
};
