import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import {EditModal} from "./EditModal/EditModal";
import s from './Profile.module.css'
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {UserType} from "../../../sc1-main/m3-dal/profile-api";
import {ButtonLoad} from "../../../sc1-main/m1-ui/common/components/SpButton/ButtonLoad";

export const Profile = () => {

  const [name, setName] = useState<string>('');
  const [activeModal, setActiveModal] = useState(false);

  const dispatch = useAppDispatch();
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const userData = useAppSelector<UserType>(store => store.profile.user);
  const userAva = useAppSelector<string | undefined>(store => store.profile.user.avatar);
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

  if (!userNameStore) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div className={s.mainBlock}>

      <div className={s.editBlock}>
        <div className={s.edit}>
          <div className={s.profileAva}>
            <img src={userAva ? userAva : 'https://clck.ru/WQq57'} alt="user-ava"/>
          </div>
          <div className={s.profileInfo}>
            <h3>{userNameStore}</h3>
            <h3>{userData.email}</h3>
            <h3>ID: {userData._id}</h3>
            <h3>Card Packs: {userData.publicCardPacksCount}</h3>
            <ButtonLoad isSpinner={isLoading} disabled={isLoading} onClick={editHandler}>Edit</ButtonLoad>
          </div>
        </div>
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
