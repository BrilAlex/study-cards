import React, {useState} from 'react';
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {ProfileApi, UserType} from "../dal/profile-api";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";

export const ProfileDev = () => {

  const [name, setName] = useState<string>('');
  const [authData, setAuthData] = useState<any>(null);

  const dispatch = useAppDispatch();
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const userData = useAppSelector<UserType>(store => store.profile.user);

  const onFocusHandler = () => {
    name ? setName(name) : setName(userNameStore)
  }
  const getTasksHandler = () => {
    ProfileApi.getAllCards().then(res => {
      setAuthData(res);
    })
  }
  const putHandler = () => {
    dispatch(updateNameThunk(name, ''));
  }

  return (
    <div>
      <InputText value={name}
                 onChangeText={setName}
                 placeholder={userNameStore}
                 onFocus={onFocusHandler}/>
      <Button onClick={getTasksHandler}>Me Data</Button>
      <Button onClick={putHandler}>Save</Button>
      <Button onClick={() => {
      }}>Cancel</Button>
      <pre>Get me Data: {JSON.stringify(authData?.cardPacks[1], null, 2)}</pre>
      {/*<pre>Data: {JSON.stringify(userData, null, 2)}</pre>*/}
    </div>
  );
};
