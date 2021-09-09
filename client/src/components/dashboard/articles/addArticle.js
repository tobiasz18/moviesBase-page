import React from 'react';
import { useFormik, FieldArray, Field, FormikProvider } from 'formik';
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
  FormHelperText,
  Paper,
  InputBase,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

import AdminLayout from '../../../hoc/adminLayout';
import { FormGroup } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    }
  },
  rootPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    justifyContent: 'space-between',
    border: '1px solid #c4c4c4',
  },
  formControl: {
    minWidth: 182,
  },
  input: {
    padding: theme.spacing(1),
  },
  chip_container: {
    display: 'flex',
    margin: '16px 0',

  },
  MuiChipRroot: {
    margin: ' 16px 8px 8px 0'
  },


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

        <FormikProvider value={formik}>
          <h5>Add the actors:</h5>
          <FieldArray
            name="actors"
            render={arrayHelpers => (
              <div>
                <Paper component="form" className={classes.rootPaper} elevation={0} >
                  <InputBase
                    className={classes.input}
                    placeholder="Add actor name here"
                    fullWidth
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <AddIcon />
                  </IconButton>
                </Paper>

                {formik.errors.actors && formik.touched.actors ?
                  <FormHelperText error={true}>
                    {formik.errors.actors}
                  </FormHelperText>
                  : null}

                <Box display="flex">
                  {console.log(formik.values.actors)}
                  {formik.values.actors.map((actor, index) => {
                    return (
                      <Box key={actor} mt={2} mr={1}>
                        <Chip
                          label={`${actor}`}
                          color="primary"
                          onDelete={() => console.log('try to delete')}
                        />
                      </Box>
                    )
                  })}
                </Box>
              </div>
            )}
          />

        </FormikProvider>



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
            Add article
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
