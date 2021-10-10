import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import {
  TextField,
  Button
} from '@mui/material'
import { Box } from '@mui/system'
import { updateProfileDataAsync } from '../../../store/actions/users_actions'

const UserProfile = () => {
  const {
    firstName, lastName, age
  } = useSelector((state) => state.users.data)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      age
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateProfileDataAsync(values))
    }
  })

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })


  return (
    <>
      <Box mt={4}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <TextField
              name="firstName"
              label="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              {...formik.getFieldProps('firstName')}
              {...errorHelper(formik, 'firstName')}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="lastName"
              label="lastName"        
              value={formik.values.lastName}
              onChange={formik.handleChange}
              {...formik.getFieldProps('lastName')}
              {...errorHelper(formik,'lastName')}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="age"
              label="age"
              {...formik.getFieldProps('age')}
              {...errorHelper(formik, 'age')}
            />
          </Box>
          <Button color="primary" variant="contained"  type="submit">
            Submit
          </Button>
        </form>   
      </Box>
    </>
  )
}

export default UserProfile