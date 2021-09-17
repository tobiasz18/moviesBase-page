import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../../hoc/adminLayout'
import { Link } from 'react-router-dom'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import {
  Paper,
  InputBase,
  IconButton
} from '@material-ui/core';
import { getPaginateArticlesAsync } from '../../../store/actions/articles_actions'
import CustomizedTables from './paginate'

const useStyles = makeStyles((theme) => ({
  root: {
    //padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 6,
  },
  button: {
    margin: theme.spacing(0),
  }
}));

const Articles = (props) => {
  const classes = useStyles()
  // const articles = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPaginateArticlesAsync())
  }, [dispatch])

  return (
    <AdminLayout section="Articles">
      <Box display="flex" pb={4}>
        <Box>
          <Button
            variant="outlined"
            className={classes.button}
            size="large"
            component={Link}
            to="/dashboard/articles/add"
            startIcon={<AddIcon />}
          >
            Add article
          </Button>
        </Box>
        <Box ml={1} flexDirection="row" >
          <Paper component="form" className={classes.root} onSubmit={() => alert('search')}>
            <IconButton className={classes.iconButton} aria-label="menu">
              @
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
      <CustomizedTables />
    </AdminLayout>
  )
}

export default Articles