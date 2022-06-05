import s from "../../../sc1-main/m1-ui/App.module.css";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "./newPasswordReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";

export const NewPassword = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState("");
    const success = useAppSelector<boolean>(state => state.newPassword.success)
    const params = useParams<'token'>();
    const token = params.token;

    const buttonHandler = () => {
        if (token && password) {
            dispatch(setNewPasswordTC(password, token))
        }
    }

    if (success) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.smallContainer}>
            <h1>It-incubator</h1>
            <h2>Create new password</h2>
            <InputText type={"password"} value={password} onChangeText={setPassword} placeholder={'Password'}/>
            <p>Create new password and we will send you further instructions to email</p>
            <Button onClick={buttonHandler}>Create new password</Button>
        </div>
    );
};
