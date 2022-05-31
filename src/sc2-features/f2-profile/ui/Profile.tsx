import React, {useState} from 'react';
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import {EditModal} from "./EditModal/EditModal";
import {Spinner} from "../../../sc1-main/m1-ui/common/components/Spinner/Spinner";
import s from './Profile.module.css'

export const Profile = () => {

  const [name, setName] = useState<string>('');
  const [activeModal, setActiveModal] = useState(false);
  const dispatch = useAppDispatch();
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const isLoading = useAppSelector<boolean>(state => state.profile.loading);


  const changeName = () => {
    dispatch(updateNameThunk(name, ''));
    setActiveModal(false);
  }
  const editHandler = () => {
    setActiveModal(true);
  }
  const onFocusHandler = () => {
    name ? setName(name) : setName(userNameStore)
  }

  return (
    <div className={s.mainBlock}>

      <div className={s.editBlock}>
        <div className={s.edit}>
          <div className={s.profileAva}>
            <img src='https://clck.ru/WQq57' alt="user-ava"/>
          </div>
          {isLoading
            ? <Spinner customMainStyle={s.spinnerBlock} customSizeStyle={s.spinnerSize}/>
            : <>
              <div className={s.profileInfo}>
                <h3>{userNameStore}</h3>
                <Button onClick={editHandler}>Edit</Button>
              </div>
            </>
          }
        </div>

        <div className={s.numberCards}>
          <h3>Number of cards</h3>
        </div>

      </div>

      <div className={s.packs}>
        <h1>My packs list</h1>
      </div>

      <EditModal active={activeModal}
                 setActive={setActiveModal}
                 name={userNameStore}
                 inputValue={name}
                 setInputValue={setName}
                 inputFocus={onFocusHandler}
                 changeName={changeName}
      />

    </div>
  );
};
