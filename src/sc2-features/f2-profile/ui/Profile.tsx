import React, {ChangeEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import s from './Profile.module.css'
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {UserType} from "../../../sc1-main/m3-dal/profile-api";
import {ButtonLoad} from "../../../sc1-main/m1-ui/common/components/SpButton/ButtonLoad";
import {ReactComponent as UploadAva} from '../../../assets/Web_app/add_photo.svg'
import {ReactComponent as DefaultAva} from '../../../assets/Web_app/robot_ava.svg'
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

export const Profile = () => {

  const dispatch = useAppDispatch();
  const {name, avatar, email} = useAppSelector<UserType>(store => store.profile.user);
  const isLoading = useAppSelector<boolean>(state => state.profile.loading);

  const [value, setValue] = useState<string>(name);
  const [error, setError] = useState<string>('');
  const [newPhoto, setNewPhoto] = useState<any>(undefined); // fix any!?

  const inputRef = useRef<HTMLInputElement>(null);

  const changeName = () => {
    if (newPhoto === avatar) return setError('the same photo');
    if (name === value && !newPhoto) return setError('nothing has changed');
    dispatch(updateNameThunk(value, newPhoto));
  }

  const cancelHandler = () => {
    setError('')
    setNewPhoto('');
  }

  const uploadHandler = () => {
    inputRef && inputRef.current && inputRef.current.click()
  }

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    const newFile = e.target.files && e.target.files[0];
    if (newFile && newFile.size > 1048576) {
      return setError('The size of the photo is not more than 1MB');
    }

    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => setNewPhoto(reader.result);
      reader.readAsDataURL(newFile);
    }
  }

  if (!name) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div className={s.mainBlock}>
      <div className={s.editBlock}>
        <input
          ref={inputRef}
          type='file'
          style={{display: 'none'}}
          onChange={upload}
        />
      </div>
      <div className={s.edit}>
        <h1>Personal Information</h1>
        <div className={s.profileAva}>
          {!avatar && !newPhoto
            ? <DefaultAva className={s.defaultAva}/>
            : <img className={s.defaultAva} src={newPhoto ? newPhoto : avatar} alt="user-ava"/>}
          <UploadAva className={s.editPhoto} onClick={uploadHandler}/>
        </div>        <div className={s.profileInfo}>
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
