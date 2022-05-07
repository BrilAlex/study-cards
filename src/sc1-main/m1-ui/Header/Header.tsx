import {NavLink} from "react-router-dom";
import {PATH} from "../Main/Pages";
import s from "./Header.module.css";

export const Header = () => {
  const getNavLinkStyle = (NavData: { isActive: boolean }) => {
    return NavData.isActive ? `${s.item} ${s.active}` : s.item;
  };

  return (
    <header>
      <div className={s.navbar}>
        <NavLink to={PATH.LOGIN} className={(NavData) => getNavLinkStyle(NavData)}>
          Login
        </NavLink>
        <NavLink to={PATH.REGISTRATION} className={(NavData) => getNavLinkStyle(NavData)}>
          Registration
        </NavLink>
        <NavLink to={PATH.PROFILE} className={(NavData) => getNavLinkStyle(NavData)}>
          Profile
        </NavLink>
        <NavLink to={PATH.PASSWORD_RECOVERY} className={(NavData) => getNavLinkStyle(NavData)}>
          Password recovery
        </NavLink>
        <NavLink to={PATH.CREATE_NEW_PASSWORD} className={(NavData) => getNavLinkStyle(NavData)}>
          Create new password
        </NavLink>
        <NavLink to={PATH.TEST} className={(NavData) => getNavLinkStyle(NavData)}>
          Test
        </NavLink>
      </div>
    </header>
  );
};
