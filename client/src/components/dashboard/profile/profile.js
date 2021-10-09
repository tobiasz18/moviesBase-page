import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import {
  TextField,
  Divider,
  Button
} from '@mui/material'

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
      console.log(values)
    }
  })

  return (
    <>
      user Profile
    </>
  )
}

export default UserProfile