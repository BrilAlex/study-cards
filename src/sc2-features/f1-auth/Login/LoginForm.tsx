import React from 'react';
import {useFormik} from 'formik';
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {Checkbox} from "../../../sc1-main/m1-ui/common/components/c3-Checkbox/Checkbox";
import {LoginThunkTC} from "./loginReducer";
import {useDispatch} from "react-redux";

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const LoginForm = () => {

  const dispatch = useDispatch()
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
      // alert(JSON.stringify(values))
      console.log(values)
      dispatch<any>(LoginThunkTC(values.email, values.password, values.rememberMe));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputText
        type="email"
        {...formik.getFieldProps('email')}
      />
      {formik.errors.email && formik.touched.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
      <InputText
        type="password"
        {...formik.getFieldProps('password')}
      />
      {formik.errors.password && formik.touched.password && <div style={{color: "red"}}>{formik.errors.password}</div>}

      <label style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
        <Checkbox
          {...formik.getFieldProps('rememberMe')}
        />Remember me
      </label>
      <Button type={'submit'}>
        Login
      </Button>
    </form>)
}

