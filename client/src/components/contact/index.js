import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { TextField, Button, FormGroup } from '@material-ui/core'
import Container from '@material-ui/core/Container'

import { Loader } from '../../utils/loader'

const Contact = () => {
  const [loading, setLoading] = useState(null)
  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Sorry this email is required')
        .email('This is not a valid email'),
      firstname: Yup.string()
        .required('Sorry this firstname is required'),
      lastname: Yup.string()
        .required('Sorry this lastname is required'),
      message: Yup.string()
        .required('Sorry you need write something')
        .max(500, 'sorry this message is too long')
    }),
    onSubmit: (values, { resetForm }) => {
      
     
      setLoading(true)
    }
  })

  const errorHelper = (formik, name) => ({
    error: formik.errors[name] && formik.touched[name] ? true : false,
    helperText: formik.errors[name] && formik.touched[name] ? formik.errors[name] : null
  })


  return (
    <>
      {loading ? <Loader />
        :
        <Container maxWidth="md">
          <h1>Contact me</h1>
          <form onSubmit={formik.handleSubmit}>
          <FormGroup
              style={{ marginBottom: '1rem' }}
            >
              <TextField
                style={{ width: '100%' }}
                name='email'
                label="Enter you email"
                variant='outlined'
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </FormGroup>
            <FormGroup
              style={{ marginBottom: '1rem' }}
            >
              <TextField
                style={{ width: '100%' }}
                name='firstname'
                label="Enter you firstname"
                variant='outlined'
                {...formik.getFieldProps('firstname')}
                {...errorHelper(formik, 'firstname')}
              />
            </FormGroup>
            <FormGroup
              style={{ marginBottom: '1rem' }}
            >
              <TextField
                style={{ width: '100%' }}
                name='lastname'
                label="Enter you lastname"
                variant='outlined'
                {...formik.getFieldProps('lastname')}
                {...errorHelper(formik, 'lastname')}
              />
            </FormGroup>
            <FormGroup
              style={{ marginBottom: '1rem' }}
            >
              <TextField
                style={{ width: '100%' }}
                name='message'
                label="Add your message here"
                variant='outlined'
                multiline
                rows={4}
                {...formik.getFieldProps('message')}
                {...errorHelper(formik, 'message')}
              />
            </FormGroup>

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Send a message
            </Button>

          </form>
        </Container>
      }
    </>
  )
}

export default Contact