import React from 'react';
import s from './DeleteModal.module.css'
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";

type EditModalType = {
  cardsPack_id: string
  card_id: string
    active: boolean
    setActive: (state: boolean) => void
    deletePack: () => void
}

export const DeleteModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        deletePack,
      cardsPack_id,
      card_id
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    }
    const deleteHandler = () => {
        deletePack();
    }

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Delete Pack</h1>
                <span
                    className={s.description}>{`Do you really want to remove? All cards will be excluded from this course.`}</span>
                <div >
                    <Button onClick={cancelHandler}>Cancel</Button>
                    <Button onClick={deleteHandler} red={true}>Delete</Button>
                </div>
            </div>
        </div>
    );
};
