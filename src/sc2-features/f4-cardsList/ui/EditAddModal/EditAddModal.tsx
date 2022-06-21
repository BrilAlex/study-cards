import React from 'react';
import s from './EditAddModal.module.css';
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Textarea} from "../../../../sc1-main/m1-ui/common/components/c8-Textarea/Textarea";

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
    <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock}
         onClick={() => setActive(false)}>

      <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
           onClick={e => e.stopPropagation()}>
        <h1>Card info</h1>
        <div className={s.inputBlock}>
          <label>Question:
            <Textarea
              value={inputQuestion}
              onChangeValue={setInputQuestion}
            />
          </label>
          <label>Answer:
            <Textarea
              value={inputAnswer}
              onChangeValue={setInputAnswer}
            />
          </label>
        </div>
        <div>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button onClick={saveHandler}>Save</Button>
        </div>
      </div>
    </div>
  );
};
