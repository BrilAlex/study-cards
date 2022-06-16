import React from 'react';
import s from './../../../f3-packsList/ui/ModalWindows/EditPackModal/EditPackModal.module.css';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";

type EditModalType = {
  inputAnswer: string
  setInputAnswer: (value: string) => void
  inputQuestion: string
  setInputQuestion: (value: string) => void
  active: boolean
  setActive: (state: boolean) => void
  setCard: () => void
}

export const EditAddModal: React.FC<EditModalType> = (
  {
    active,
    setActive,
    inputAnswer,
    setInputAnswer,
    inputQuestion,
    setInputQuestion,
    setCard,
  }
) => {

  const cancelHandler = () => {
    setActive(false);
  }
  const saveHandler = () => {
    setCard();
    setActive(false)
  }

  return (
    <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>

      <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
           onClick={e => e.stopPropagation()}>
        <h1>Card info</h1>
        <div className={s.inputBlock}>
          <label>Question:
            <InputText className={s.modalInput}
                       value={inputQuestion}
                       onChangeText={setInputQuestion}
            /> </label>
          <label>Answer:
            <InputText className={s.modalInput}
                       value={inputAnswer}
                       onChangeText={setInputAnswer}
            /></label>
        </div>
        <div>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </div>
    </div>
  );
};
