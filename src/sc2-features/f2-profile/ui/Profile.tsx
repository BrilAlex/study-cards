import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../../sc1-main/m2-bll/store";
import {ProfileContainer} from "./ProfileContainer";
import {getAuthThunk} from "../bll/profileReducer";


export const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuthThunk())
    // setName(name)
  }, [])

  // const name = useSelector<AppStateType, string>(store => store.profile.user.name);
  return (
    <div>
      <ProfileContainer />
    </div>
  );
};
