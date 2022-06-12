import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../Pages";
import s from "./Header.module.css";
import {LogoutThunkTC} from "../../../../sc2-features/f1-auth/Login/bll/loginReducer";
import {useAppDispatch, useAppSelector} from "../../../m2-bll/store";
import {Button} from "../../common/components/c2-Button/Button";
import packListIcon from '../../../../assets/Web_app/Group 608.svg'
import profileIcon from '../../../../assets/Web_app/Group 607.svg'
import logoutIcon from '../../../../assets/Web_app/logout-svgrepo-com.svg'

export const HeaderBigScreen = () => {

  const user_ID = useAppSelector<string>(state => state.profile.user._id);
  const getNavLinkStyle = (NavData: { isActive: boolean }) => {
    return NavData.isActive ? `${s.item} ${s.active}` : s.item;
  };
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(LogoutThunkTC());
  };

  return (
    <header>
      <div className={s.navbar}>
        <h1 className={s.logo}>NINJAS</h1>
        {!user_ID
          ? <>
            <NavLink to={PATH.LOGIN} className={(NavData) => getNavLinkStyle(NavData)}>
              Login
            </NavLink>
            <NavLink to={PATH.REGISTRATION} className={(NavData) => getNavLinkStyle(NavData)}>
              Registration
            </NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY} className={(NavData) => getNavLinkStyle(NavData)}>
              Password recovery
            </NavLink></>
          : <><NavLink to={PATH.PROFILE} className={(NavData) => getNavLinkStyle(NavData)}>
            <img src={profileIcon} alt=""/>Profile
          </NavLink>
            <NavLink to={PATH.PACKS_LIST} className={(NavData) => getNavLinkStyle(NavData)}>
              <img src={packListIcon} alt=""/>Packs List
            </NavLink>
          </>}
        {user_ID && <Button onClick={logoutHandler} className={s.logOutButton}>
			<img src={logoutIcon} className={s.headerIcon} alt=""/>Logout
		</Button>}
      </div>
    </header>
  );
};
