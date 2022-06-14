import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../sc2-features/f1-auth/Login/ui/Login";
import {Registration} from "../../../sc2-features/f1-auth/Registration/ui/Registration";
import {Profile} from "../../../sc2-features/f2-profile/ui/Profile";
import {PasswordRecovery} from "../../../sc2-features/f1-auth/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "../../../sc2-features/f1-auth/NewPassword/NewPassword";
import {Test} from "../../../sc2-features/f0-test/Test";
import {Error404} from "./pages/Error404/Error404";
import {CheckEmailSuccess} from "../../../sc2-features/f1-auth/PasswordRecovery/CheckEmailSuccess/CheckEmailSuccess";
import {PacksList} from "../../../sc2-features/f3-packsList/ui/PacksList";
import {CardsList} from "../../../sc2-features/f4-cardsList/ui/CardsList";
import {LearPageContainer} from "../../../sc2-features/f5-learn/ui/LearnPageContainer";

export const PATH = {
  LOGIN: "/login",
  REGISTRATION: "/registration",
  PROFILE: "/profile",
  PASSWORD_RECOVERY: "/password-recovery",
  CREATE_NEW_PASSWORD: "/create-new-password/:token",
  CHECK_EMAIL_SUCCESS: "/check-email-success",
  PACKS_LIST: "/packs-list",
  CARDS_LIST: "/cards-list/",
  LEARN: "/learn/",
  TEST: "/test",
  ERROR404: "/error404",
};

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Navigate to={PATH.LOGIN}/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>
        <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
        <Route path={PATH.CREATE_NEW_PASSWORD} element={<NewPassword/>}/>
        <Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
        <Route path={PATH.CARDS_LIST + ":cardPackID"} element={<CardsList/>}/>
        <Route path={PATH.LEARN + ":cardPackID"} element={<LearPageContainer/>}/>
        <Route path={PATH.CHECK_EMAIL_SUCCESS} element={<CheckEmailSuccess/>}/>
        <Route path={PATH.TEST} element={<Test/>}/>
        <Route path={PATH.ERROR404} element={<Error404/>}/>
        <Route path={"*"} element={<Navigate to={PATH.ERROR404}/>}/>
      </Routes>
    </div>
  );
};
