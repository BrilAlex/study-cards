import {NavLink} from "react-router-dom";
import {PATH} from "../Pages";
import s from "./Header.module.css";
import {LogoutThunkTC} from "../../../../sc2-features/f1-auth/Login/bll/loginReducer";
import {useAppDispatch, useAppSelector} from "../../../m2-bll/store";
import {Button} from "../../common/components/c2-Button/Button";
import {useState} from "react";

export const HeaderMobile = () => {

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
  const user_ID = useAppSelector<string>(state => state.profile.user._id);
  const dispatch = useAppDispatch();

  const getNavLinkStyle = (NavData: { isActive: boolean }) => {
    return NavData.isActive ? `${s.item} ${s.active}` : s.item;
  };

  const logoutHandler = () => {
    dispatch(LogoutThunkTC());
  };

  const onBurgerMenuButtonClickHandler = () => {
    setIsBurgerMenuOpened(!isBurgerMenuOpened)
  }
  return (
    <header>
      <div className={s.navbar}>
        <h1 className={s.logo}>NINJAS</h1>
        <div className={isBurgerMenuOpened ? s.mobileLinksOpen : s.mobileLinksClosed}>
          <NavLink to={PATH.LOGIN} className={(NavData) => getNavLinkStyle(NavData)}>
            Login
          </NavLink>
          <NavLink to={PATH.REGISTRATION} className={(NavData) => getNavLinkStyle(NavData)}>
            Registration
          </NavLink>
          <NavLink to={PATH.PROFILE} className={(NavData) => getNavLinkStyle(NavData)}>
            Profile
          </NavLink>
          <NavLink to={PATH.PACKS_LIST} className={(NavData) => getNavLinkStyle(NavData)}>
            Packs List
          </NavLink>
          <NavLink to={PATH.PASSWORD_RECOVERY} className={(NavData) => getNavLinkStyle(NavData)}>
            Password recovery
          </NavLink>
          <NavLink to={PATH.CREATE_NEW_PASSWORD} className={(NavData) => getNavLinkStyle(NavData)}>
            Create new password
          </NavLink>

        </div>
        {user_ID && <Button onClick={logoutHandler} style={{margin: "15px", marginLeft: 'auto', padding: "5px 10px"}}
		>Logout</Button>}
        <Button
          style={{position: 'relative', margin: "15px", padding: "5px 10px", zIndex: 100, backgroundColor: "black"}}
          onClick={onBurgerMenuButtonClickHandler}>☰</Button>
      </div>

    </header>
  )
}
