import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { initialValues, validationSchema } from './validationSchema'
import Wysiwyg from '../../../utils/form/wysiwyg' 
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  Divider,
  Box,
  FormHelperText,
  Paper,
  InputBase,
  Typography,
  IconButton,
  Chip
} from '@material-ui/core';

import { Loader } from '../../../utils/loader'
import AddIcon from '@material-ui/icons/Add'

import { addArticleAsync } from '../../../store/actions/articles_actions'
import LayoutDashboard from '../../../hoc/LayoutDashboard'

import { getCategoriesAsync } from '../../../store/actions/categories_actions'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
  rootPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 450,
    justifyContent: 'space-between',
    border: '1px solid rgb(228 226 226)',
  },
  input: {
    padding: theme.spacing(1),
  },
  wysiwyg: {
    border: ' 1px solid rgb(196 196 196)',
    borderRadius: '4px',
    padding: '5px',
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    display: 'block',
    maxWidth: '300px'
  },
  selectEmpty: {
    width: '100%'
  },
  score: {
    maxWidth: '300px'
  }
}))

const AddArticle = (props) => {
  const [editorBlur, setEditorBlur] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false)
  const actorsValue = useRef('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)
  const categories = useSelector((state) => state.categories.categories)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      setSubmiting(true)
      dispatch(addArticleAsync(values))

    },
  })

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  const handleEditorState = (state) => {
    formik.setFieldValue('content', state, true)
  }

  const handleEditorBlur = (blur) => {
    setEditorBlur(true)
  }

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push(`/dashboard/articles`)
    }
    if (notifications && notifications.error) {
      setSubmiting(false)
    }
  }, [notifications, props.history])

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])

  return (
    <LayoutDashboard section="Add article">
      {
        isSubmiting ?
          <Loader /> :
          <div className={classes.containerForm}>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
              {/*----------       Title     ----------*/}
              <TextField
                fullWidth
                variant="outlined"
                name="title"
                label="title"
                {...formik.getFieldProps('title')}
                {...errorHelper(formik, 'title')}
              />
              {/*----------       excerpt     ----------*/}
              <TextField
                fullWidth
                variant="outlined"
                name="excerpt"
                label="excerpt"
                type="excerpt"
                multiline={true}
                minRows="4"
                {...formik.getFieldProps('excerpt')}
                {...errorHelper(formik, 'excerpt')}
              />
              {/*----------       content     ----------*/}
              <div>
                <Typography gutterBottom={true} variant="subtitle2" component="h5">
                  Content:
                </Typography>
                <div className={classes.wysiwyg}>
                  <Wysiwyg
                    handleEditorState={(state) => handleEditorState(state)}
                    handleEditorBlur={(blur) => handleEditorBlur(blur)}
                  />
                </div>
                {formik.errors.content && editorBlur ?
                  <FormHelperText error={true}>
                    {formik.errors.content}
                  </FormHelperText>
                  : null}
                <TextField
                  type="hidden"
                  name="content"
                  {...formik.getFieldProps('content')}
                />
              </div>
              {/*----------       director     ----------*/}
              <Typography variant="subtitle2" component="h4">
                Movie director
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="director"
                label="director"
                type="director"
                {...formik.getFieldProps('director')}
                {...errorHelper(formik, 'director')}
              />
              {/*----------       Add the actors by FieldArray  ----------*/}
              <FormikProvider value={formik}>
                <Typography variant="subtitle2" component="h4">
                  Add the actors:
                </Typography>
                <FieldArray
                  name="actors"
                  render={arrayHelpers => (
                    <>
                      <Paper component="form" className={classes.rootPaper} elevation={0} >
                        <InputBase
                          className={classes.input}
                          inputRef={actorsValue}
                          placeholder="Add actor name here"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              if (e.target.value !== '') {
                                arrayHelpers.push(e.target.value)
                                e.target.value = ''
                              }
                            }
                          }}
                          fullWidth
                        />
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => {
                            if (actorsValue.current.value !== '') {
                              arrayHelpers.push(actorsValue.current.value)
                              actorsValue.current.value = ''
                            }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Paper>
                      {formik.errors.actors && formik.touched.actors ?
                        <FormHelperText error={true}>
                          {formik.errors.actors}
                        </FormHelperText>
                        : null}
                      <Box display="flex">
                        {formik.values.actors.map((actor, index) => {
                          return (
                            <Box key={actor} mt={2} mr={1}>
                              <Chip
                                label={`${actor}`}
                                color="primary"
                                onDelete={() => arrayHelpers.remove(index)}
                              />
                            </Box>
                          )
                        })}
                      </Box>
                    </>
                  )}
                />
              </FormikProvider>

              {/*----------     Select a status     ----------*/}
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography gutterBottom={true} variant="subtitle2" component="h4">
                  Status:
                </Typography>
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
              {/*----------     Select Category   ----------*/}
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography gutterBottom={true} variant="subtitle2" component="h4">
                  Category:
                </Typography>
                <Select
                  name="category"
                  className={classes.selectEmpty}
                  {...formik.getFieldProps('category')}
                  error={formik.errors.category && formik.touched.category ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories && categories.map((item, key) => (
                    <MenuItem key={`${key + item}`} value={item._id}>{item.name}</MenuItem>
                  ))}

                </Select>
                {formik.errors.category && formik.touched.category ?
                  <FormHelperText error={true}>
                    {formik.errors.category}
                  </FormHelperText>
                  : null}
              </FormControl>
              {/*----------     score     ----------*/}
              <Typography variant="subtitle2" component="h4">
                Score:
              </Typography>
              <TextField
                className={classes.score}
                name="score"
                label="score"
                type="number"
                variant="outlined"
                {...formik.getFieldProps('score')}
                {...errorHelper(formik, 'score')}
              />
              {/*----------     Divider and Submit Button   ----------*/}
              <Box mt={1}>
                <Box mb={2}>
                  <Divider />
                </Box>
                <Button color="primary" variant="contained" type="submit">
                  Add article
                </Button>
              </Box>
            </form>
          </div>
      }
    </LayoutDashboard>
  )
}

export default AddArticle

