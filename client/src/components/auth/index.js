import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Auth = () => {

  const [register, setRegister] = useState(false)

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
    },
  })

  const errorHelper = (formik, name) => ({
    error: formik.errors[name] && formik.touched[name] ? true : false,
    helperText: formik.errors[name] && formik.touched[name] ? formik.errors[name] : null
  })

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            label="Email Address"
            name="email"
            {...formik.getFieldProps('email')}
            {...errorHelper(formik, 'email')}
          />
        </div>

        <div>
          <TextField
            label="password"
            name="password"
            {...formik.getFieldProps('password')}
            {...errorHelper(formik, 'password')}
          />
        </div>

        <div>
          <Button
            className="mt-3"
            type="submit"
            variant="contained">
            {!register ? 'Register' : 'Login'}
          </Button>
        </div>

        <div>
          <Button
            className="mt-3"
            type="submit"
            color="primary"
            size="small"
            onClick={() => setRegister(!register)}
            >
           Want to ? {register ? 'Register' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  )
}


export default Auth


// onChange, onBlur, value, checke =
// formik.getFieldProps() on onChange, onBlur, value, checked