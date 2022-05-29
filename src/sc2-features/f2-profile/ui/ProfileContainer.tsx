import React, {useEffect, useState} from 'react';
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {ProfileApi} from "../dall/profile-api";
import {AppStateType, useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {getAuthThunk} from "../bll/profileReducer";



type ProfilePropsType = {
  name: string
}
export const ProfileContainer:React.FC<ProfilePropsType> = ({name}) => {
  const dispatch = useAppDispatch();
  // const name = useAppSelector<string>(store => store.profile.user.name);

  // useEffect(() => {
  //   // dispatch(getAuthThunk())
  //   setName(name)
  // }, [])


  const [state, setState] = useState<any>(null);
  const [state1, setState1] = useState<any>(null);
  const [state2, setState2] = useState<any>(null);
  const [nweName, setName] = useState<string>('');


  const getTasksHandler = () => {
    ProfileApi.me().then(res => {
      console.log(res)
      setState(res);
    })
  }
  const loginHandler = () => {
    ProfileApi.logIn().then(res => {
      console.log(res)
      setState1(res);
    })
  }
  const putHandler = () => {
    ProfileApi.updateUserData(nweName, '').then(res => {
      console.log(res)
      setState2(res);
    })
  }

  console.log(name)

  return (
    <div>
      <InputText value={nweName} onChangeText={setName} placeholder={name} onFocus={()=> setName(name)}/>
      <Button onClick={getTasksHandler}>Save</Button>
      <Button onClick={loginHandler}>Login</Button>
      <Button onClick={putHandler}>PUT</Button>
      <Button onClick={() => setName(name)}>name</Button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(state1, null, 2)}</pre>
      <pre>{JSON.stringify(state2, null, 2)}</pre>
    </div>

  );
};

