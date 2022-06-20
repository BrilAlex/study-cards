import React from 'react';
import {useFormik} from 'formik';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Checkbox} from "../../../../sc1-main/m1-ui/common/components/c3-Checkbox/Checkbox";
import {loginThunkTC} from "../bll/loginReducer";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";
import {InputPassword} from "../../../../sc1-main/m1-ui/common/components/c4-InputPassword/InputPassword";
import s from './login.module.css';

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const LoginForm = () => {

  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.trim().length < 3) {
        errors.password = "Min 3 symbols"
      }
      return errors;
    },

    onSubmit: values => {
      dispatch<any>(loginThunkTC(values.email, values.password, values.rememberMe));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <span className={s.inputLabel} style={{marginTop: '0px'}}>Email</span>
        <InputText
          className={s.input}
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.errors.email && formik.touched.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
        <span className={s.inputLabel} style={{marginTop: '10px'}}>Password</span>
        <InputPassword className={s.input}
                       {...formik.getFieldProps('password')}
        />
        {formik.errors.password && formik.touched.password &&
					<div style={{color: "red"}}>{formik.errors.password}</div>}

        <label className={s.rememberMe}>
          <Checkbox
            {...formik.getFieldProps('rememberMe')}
          >{' '}</Checkbox>Remember me
        </label>
        <NavLink
          to={PATH.PASSWORD_RECOVERY}
          className={s.forgotPass}>
          Forget password?
        </NavLink>
        <Button type={'submit'} className={s.submit}>
          Login
        </Button>
      </form>
      <span
        className={s.signUpLabel}>Don’t have an account?</span>
      <NavLink
        to={PATH.REGISTRATION}
        className={s.signUpIn}
      >Sign Up</NavLink>
    </>
  )
}

