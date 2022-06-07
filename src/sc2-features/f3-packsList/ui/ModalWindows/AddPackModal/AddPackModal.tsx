import React, {ChangeEvent} from 'react';
import {Button} from '../../../../../sc1-main/m1-ui/common/components/c2-Button/Button';
import s from './AddPackModal.module.css';
import {InputText} from "../../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

type EditModalType = {
    name: string
    inputValue: string
    setInputValue: (value: string) => void
    active: boolean
    setActive: (state: boolean) => void
    inputFocus: () => void
    addPack: () => void
    makePrivate: (isPrivate: boolean) => void
}

export const AddPackModal: React.FC<EditModalType> = (
    {
        active,
        setActive,
        inputValue,
        setInputValue,
        inputFocus,
        name,
        addPack,
        makePrivate,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    }
    const saveHandler = () => {
        addPack();
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        makePrivate(e.currentTarget.checked)
    }

    return (
        <div className={active ? `${s.mainBlock} ${s.active}` : s.mainBlock} onClick={() => setActive(false)}>

            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                <h1>Add new pack</h1>
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
                    <Button onClick={saveHandler}>Add</Button>
                </div>
            </div>

        </div>
    );
};
