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

const AddArticle = () => {
  const classes = useStyles()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('test')
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="title"
          label="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
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
          fullWidth
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
          fullWidth
          name="director"
          label="director"
          type="director"
          value={formik.values.director}
          onChange={formik.handleChange}
          error={formik.touched.director && Boolean(formik.errors.director)}
          helperText={formik.touched.director && formik.errors.director}
        />
        <TextField
          fullWidth
          name="actors"
          label="actors"
          type="actors"
          value={formik.values.actors}
          onChange={formik.handleChange}
          error={formik.touched.actors && Boolean(formik.errors.actors)}
          helperText={formik.touched.actors && formik.errors.actors}
        />
        <TextField
          fullWidth
          name="score"
          label="score"
          type="score"
          value={formik.values.score}
          onChange={formik.handleChange}
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
        />

        <FormControl className={classes.formControl}>
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
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default AddArticle
