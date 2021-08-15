import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, CssBaseline, Avatar, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = () => {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          {register ? 'Sign in' : 'Register'}
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...formik.getFieldProps('email')}
            {...errorHelper(formik, 'email')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Enter your password"
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
            {...errorHelper(formik, 'password')}
          />
          <Button
            fullWidth
            color="primary"
            className={classes.submit}
            type="submit"
            variant="contained">
            {!register ? 'Register' : 'Login'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            className={classes.submit}
            size="small"
            onClick={() => setRegister(!register)}
          >
            Want to {register ? 'Register' : 'Sign in'} ?
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default Auth


// onChange, onBlur, value, checke =
// formik.getFieldProps() on onChange, onBlur, value, checked