import React, {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import s from './Profile.module.css';
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {UserType} from "../../../sc1-main/m3-dal/profile-api";
import {ButtonLoad} from "../../../sc1-main/m1-ui/common/components/SpButton/ButtonLoad";
import {ReactComponent as UploadAva} from '../../../assets/Web_app/add_photo.svg';
import {ReactComponent as DefaultAva} from '../../../assets/Web_app/robot_ava.svg';
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {ChangesInputs} from "./ChangesInputs/ChangesInputs";

export const Profile = () => {

  const dispatch = useAppDispatch();
  const {name, avatar, email} = useAppSelector<UserType>(store => store.profile.user);
  const isLoading = useAppSelector<boolean>(state => state.profile.loading);

  const [value, setValue] = useState<string>(name);
  const [error, setError] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const changeName = () => {
    if (newPhoto === avatar) return setError('the same photo');
    if (name === value && !newPhoto) return setError('nothing has changed');
    dispatch(updateNameThunk(value, newPhoto));
  }
  const cancelHandler = () => {
    setError('');
    setNewPhoto('');
    setValue(name);
  }

  if (!name) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div className={s.mainBlock}>
      <ChangesInputs error={error}
                     setError={setError}
                     setNewPhoto={setNewPhoto}
                     inputRef={inputRef}/>
      <div className={s.edit}>
        <h1>Personal Information</h1>
        <div className={s.profileAva}>
          {!avatar && !newPhoto
            ? <DefaultAva className={s.defaultAva}/>
            : <img className={s.defaultAva} src={newPhoto ? newPhoto : avatar} alt="user-ava"/>}
          <UploadAva className={s.editPhoto}
                     onClick={() => inputRef && inputRef.current && inputRef.current.click()}/>
        </div>
        <div className={s.profileInfo}>
          <InputText className={s.profileInput}
                     value={value}
                     onChangeText={setValue}
          />
          <span className={s.infoSpan}>Nickname</span>
          <InputText value={email} className={s.profileInput} disabled/>
          <span className={s.infoSpan}>Email</span>
          <div className={s.profileError}>
            {error}
          </div>
        </div>
        <div className={s.buttonBlock}>
          <ButtonLoad isSpinner={isLoading} onClick={changeName}>Save</ButtonLoad>
          <ButtonLoad isSpinner={isLoading} onClick={cancelHandler}>Cancel</ButtonLoad>
        </div>
      </div>
    </div>
  );
};
