import React, {useState} from 'react';
import s from './Profile.module.css'
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

export const Profile = () => {

  const [name, setName] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);

  const saveHandler = () => {
    console.log(name);
    setEdit(false);
    dispatch(updateNameThunk(name, ''));
  }
  const editHandler = () => {
    setEdit(true);
    name ? setName(name) : setName(userNameStore);
  }
  const onFocusHandler = () => {
    name ? setName(name) : setName(userNameStore)
  }
  // console.log(name)
  return (
    <div className={s.mainBlock}>

      <div className={s.editBlock}>
        <div className={s.edit}>
          <div className={s.profileAva}>
            <img src='https://clck.ru/WQq57' alt="user-ava"/>
          </div>
          <div className={s.profileInfo}>
            <h3>{userNameStore}</h3>
            {/*{edit && <InputText value={name}*/}
            {/*                    onChangeText={setName}*/}
            {/*                    onBlur={() => setEdit(false)}*/}
            {/*/>}*/}
            <InputText value={name}
                       onChangeText={setName}
                       onFocus={onFocusHandler}
            />
            <Button onClick={editHandler}>Edit</Button>
            <Button onClick={saveHandler}>Save</Button>
          </div>

        </div>

        <div className={s.numberCards}>
          <h3>Number of cards</h3>
        </div>
      </div>

      <div className={s.packs}>
        <h1>My packs list</h1>
      </div>

      {/*<ProfileDev/>*/}
    </div>
  );
};
