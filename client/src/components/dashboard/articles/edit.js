import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { initialValues, validationSchema } from './validationSchema'
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
import Wysiwyg from '../../../utils/form/wysiwyg'
import { getAminArticleById, updateArticleAsync } from '../../../store/actions/articles_actions'
import { clearCurrentArticle } from '../../../store/actions'
import LayoutDashboard from '../../../hoc/LayoutDashboard'

const EditArticle = (props) => {
  const [editorBlur, setEditorBlur] = useState(false)
  const [isSubmiting, setSubmiting] = useState(false) // set or remove Loadeer from 
  const notifications = useSelector((state) => state.notifications)
  const [initValue, setInitValue] = useState(initialValues)
  const actorsValue = useRef('')
  const classes = useStyles()

  const dispatch = useDispatch()

  // EDIT ARTICLE COMPONENT ↓
  const currentArticle = useSelector((state) => state.articles)
  const [editContentState, setEditContentState] = useState(null)
  // EDIT ARTICLE COMPONENT ↑

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmiting(true) // set loader 
      dispatch(updateArticleAsync(values, props.match.params.id))
    },
  })

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  const handleEditorState = (state) => {
    formik.setFieldValue('content', state, true)
  }

  const handleEditorBlur = () => {
    setEditorBlur(true)
  }

  useEffect(() => {
    if (notifications && notifications.success) {
      setSubmiting(false)   // EDIT set loader off after "sucess" notification 
    }
    setSubmiting(false)
  }, [notifications, props.history])

  // EDIT ↓
  useEffect(() => {
    dispatch(getAminArticleById(props.match.params.id))

  }, [dispatch, props.match.params])

  useEffect(() => {
    if (currentArticle && currentArticle.current) {
      setSubmiting(false)
      setInitValue(currentArticle.current)
      setEditContentState(currentArticle.current.content)
    } else {
      setSubmiting(true)
    }
  }, [currentArticle])

  useEffect(() => {
    return () => {
      dispatch(clearCurrentArticle())
    }
  }, [dispatch])

  // EDIT  ↑

  return (
    <LayoutDashboard section="Edit article">
      {
        isSubmiting ?
          <Loader /> :
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            {/*----------    ↓   Title  ↓   ----------*/}
            <TextField
              fullWidth
              variant="outlined"
              name="title"
              label="title"
              {...formik.getFieldProps('title')}
              {...errorHelper(formik, 'title')}
            />
            {/*----------    ↓   excerpt   ↓  ----------*/}
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
            {/*----------   ↓    content  ↓   ----------*/}
            <div>
              <Typography gutterBottom={true} variant="subtitle2" component="h5">
                Content:
              </Typography>
              <div className={classes.wysiwyg}>
                <Wysiwyg
                  handleEditorState={(state) => handleEditorState(state)}
                  handleEditorBlur={(blur) => handleEditorBlur(blur)}
                  editContent={editContentState}
                />
              </div>
              {formik.errors.content && editorBlur ?
                <FormHelperText error={true}>
                  {formik.errors.content}
                </FormHelperText>
                : null}
              {/* ↓ mirror of wysiwyg ↓ */}
              <TextField
                type="hidden"
                name="content"
                {...formik.getFieldProps('content')}
              />
            </div>
            <Typography variant="subtitle2" component="h4">
              Movie data and score
            </Typography>
            {/*----------    ↓   director  ↓   ----------*/}
            <TextField
              fullWidth
              variant="outlined"
              name="director"
              label="director"
              type="director"
              {...formik.getFieldProps('director')}
              {...errorHelper(formik, 'director')}
            />
            {/*----------    ↓   Add the actors by FieldArray ↓ ----------*/}
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
                      { }
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
            {/*----------  ↓   score   ↓  ----------*/}
            <TextField
              fullWidth
              name="score"
              label="score"
              type="number"
              variant="outlined"
              {...formik.getFieldProps('score')}
              {...errorHelper(formik, 'score')}
            />
            {/*----------  ↓   Select a status  ↓   ----------*/}
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
            {/*----------  ↓   Divider and Submit Button ↓  ----------*/}
            <Box mt={1}>
              <Box mb={2}>
                <Divider />
              </Box>
              <Button color="secondary" variant="contained" type="submit">
                Edit article
              </Button>
            </Box>
          </form>
      }
    </LayoutDashboard>
  )
}

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
  }
}))

export default EditArticle

