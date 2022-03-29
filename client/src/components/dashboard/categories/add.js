import React  from 'react';
import { useDispatch } from 'react-redux'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { TextField, Button } from '@mui/material'
import { FormGroup } from '@mui/material';
import { addCategoryAsync } from '../../../store/actions/categories_actions';

const Add = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required")
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addCategoryAsync(values))
      resetForm()
    }
  })

  const errorHelper = (formik, name) => ({
    error: formik.errors[name] && formik.touched[name] ? true : false,
    helperText: formik.errors[name] && formik.touched[name] ? formik.errors[name] : null
  })


  return (

    <form onSubmit={formik.handleSubmit}>
      <FormGroup sx={{marginBottom: '20px'}}>
        <TextField
          style={{ width: '100%' }}
          name="name"
          label="Enter a name"
          variant='outlined'
          {...formik.getFieldProps('name')}
          {...errorHelper(formik, 'name')}
        />
      </FormGroup>

      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Add category
      </Button>
    </form>

  );
}

export default Add;
