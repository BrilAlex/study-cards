import React, {ChangeEvent} from 'react';
import s from './EditPackModal.module.css';
import {Button} from "../../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {InputText} from "../../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

type EditModalType = {
    name: string
    inputValue: string
    setInputValue: (value: string) => void
    active: boolean
    setActive: (state: boolean) => void
    inputFocus: () => void
    changeName: () => void
    makePrivate: (isPrivate: boolean) => void
}

export const EditPackModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        inputValue,
        setInputValue,
        inputFocus,
        name,
        changeName,
        makePrivate,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    }
    const saveHandler = () => {
        changeName();
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        makePrivate(e.currentTarget.checked)
    }

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>

            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Change your pack</h1>
                <div className={s.inputBlock}>
                    <InputText className={s.modalInput}
                               value={inputValue}
                               onChangeText={setInputValue}
                               onFocus={inputFocus}
                               placeholder={name}
                    />
                </div>
                <div className={s.private}>
                    <span>Make it private?</span>
                    <input onChange={inputHandler} type='checkbox'/>
                </div>
                <div>
                    <Button onClick={cancelHandler}>Cancel</Button>
                    <Button onClick={saveHandler}>Save</Button>
                </div>
            </div>
        </div>
    );
};
