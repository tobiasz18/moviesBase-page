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
  Select
} from '@material-ui/core';
import AdminLayout from '../../../hoc/adminLayout';

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

  return (
    <AdminLayout>
      <h4>Add article</h4>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.input}
          variant="outlined"
          fullWidth
          name="title"
          label="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          name="content"
          label="content"
          type="content"
          multiline="true"
          minRows="4"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          name="excerpt"
          label="excerpt"
          type="excerpt"
          multiline="true"
          minRows="4"
          value={formik.values.excerpt}
          onChange={formik.handleChange}
          error={formik.touched.excerpt && Boolean(formik.errors.excerpt)}
          helperText={formik.touched.excerpt && formik.errors.excerpt}
        />
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          name="director"
          label="director"
          type="director"
          value={formik.values.director}
          onChange={formik.handleChange}
          error={formik.touched.director && Boolean(formik.errors.director)}
          helperText={formik.touched.director && formik.errors.director}
        />
        <TextField
          className={classes.input}
          fullWidth
          name="actors"
          variant="outlined"
          label="actors"
          type="actors"
          value={formik.values.actors}
          onChange={formik.handleChange}
          error={formik.touched.actors && Boolean(formik.errors.actors)}
          helperText={formik.touched.actors && formik.errors.actors}
        />
        <TextField
          className={classes.input}
          fullWidth
          name="score"
          label="score"
          type="score"
          variant="outlined"
          value={formik.values.score}
          onChange={formik.handleChange}
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
        />

        <FormControl className={classes.input}>
          <InputLabel >Status</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={formik.open}
            onClose={formik.handleClose}
            onOpen={formik.handleOpen}
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <MenuItem value={'draft'}>draft</MenuItem>
            <MenuItem value={'public'}>public</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </AdminLayout>
  )
}

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
  },
}));


export default AddArticle
