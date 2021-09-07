import React from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './validationSchema';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  TextareaAutosize,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Divider,
  Box,
  FormHelperText
} from '@material-ui/core';

import AdminLayout from '../../../hoc/adminLayout';
import { FormGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    }
  },
  formControl: {
    minWidth: 182,
  }
}));

const AddArticle = (props) => {
  const classes = useStyles()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  });

  return (
    <AdminLayout section="Add article">
      <form className={classes.root} onSubmit={formik.handleSubmit}>

        <TextField
          fullWidth
          variant="outlined"
          name="title"
          label="title"
          {...formik.getFieldProps('title')}
          {...errorHelper(formik, 'title')}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="excerpt"
          label="excerpt"
          type="excerpt"
          multiline="true"
          minRows="4"
          {...formik.getFieldProps('excerpt')}
          {...errorHelper(formik, 'excerpt')}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="content"
          label="content"
          type="content"
          multiline="true"
          minRows="4"
          {...formik.getFieldProps('content')}
          {...errorHelper(formik, 'content')}
        />

        <Divider />
        <h4>Movie data and score</h4>

        <TextField
          fullWidth
          variant="outlined"
          name="director"
          label="director"
          type="director"
          {...formik.getFieldProps('director')}
          {...errorHelper(formik, 'director')}
        />
        <TextField
          fullWidth
          name="actors"
          variant="outlined"
          label="actors"
          type="actors"
          {...formik.getFieldProps('actors')}
          {...errorHelper(formik, 'actors')}
        />

        <TextField
          fullWidth
          name="score"
          label="score"
          type="score"
          variant="outlined"
          {...formik.getFieldProps('score')}
          {...errorHelper(formik, 'score')}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <h4>Select a status</h4>
          <Select
            name="status"
            className={classes.selectEmpty}
            {...formik.getFieldProps('status')}
            error={formik.errors.status && formik.touched.status ? true : false}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'draft'}>Draft</MenuItem>
            <MenuItem value={'public'}>Public</MenuItem>
          </Select>
          {formik.errors.status && formik.touched.status ?
            <FormHelperText error={true}>
              {formik.errors.status}
            </FormHelperText>
            : null}
        </FormControl>
        <Box mt={1}>
          <Box mb={2}>
            <Divider />
          </Box>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </AdminLayout>
  )
}

export default AddArticle




  // < TextField
  //   fullWidth
  //   variant = "outlined"
  //   name = "title"
  //   label = "title"
  //   value = { formik.values.title }
  //   onChange = { formik.handleChange }
  //   error = { formik.touched.title && Boolean(formik.errors.title) }
  //   helperText = { formik.touched.title && formik.errors.title }
  // />
