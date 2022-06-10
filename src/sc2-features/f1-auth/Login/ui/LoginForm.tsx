import React from 'react';
import {useFormik} from 'formik';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Checkbox} from "../../../../sc1-main/m1-ui/common/components/c3-Checkbox/Checkbox";
import {LoginThunkTC} from "../bll/loginReducer";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";
import {InputPassword} from "../../../../sc1-main/m1-ui/common/components/c4-InputPassword/InputPassword";

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
      console.log(values)
      dispatch<any>(LoginThunkTC(values.email, values.password, values.rememberMe));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputText
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.errors.email && formik.touched.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
        <InputPassword
          {...formik.getFieldProps('password')}
        />
        {formik.errors.password && formik.touched.password &&
			<div style={{color: "red"}}>{formik.errors.password}</div>}

        <label style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <Checkbox
            {...formik.getFieldProps('rememberMe')}
          />Remember me
        </label>
        <NavLink
          to={PATH.PASSWORD_RECOVERY}
          className={""}
          style={{margin: "20px auto", display: "block", color: "#2D2E46"}}>
          Forget password?
        </NavLink>
        <Button type={'submit'} style={{margin: '40px auto 30px'}}>
          Login
        </Button>
      </form>
      <span
        style={{color: "#2D2E46", opacity: 0.5, display: "block", paddingBottom: "20px"}}>Don’t have an account?</span>
      <NavLink
        to={PATH.REGISTRATION}
        style={{color: "#21268F", fontSize: "16px", fontWeight: 600}}
      >Sign Up</NavLink>
    </>
  )
}

