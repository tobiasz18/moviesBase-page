import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { deleteArticleAsync, getPaginateArticlesAsync, updateStatusArticleAsync } from '../../../store/actions/articles_actions'
import PaginateComponent from './paginate'
import LayoutDashboard from '../../../hoc/LayoutDashboard'

const useStyles = makeStyles((theme) => ({
  root: {
    //padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
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
  },
  tools: {
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, 
  searchTool: {
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      paddingTop: theme.spacing(2) 
    }
  }
}));

const Articles = (props) => {
  const classes = useStyles()
  const articles = useSelector(state => state.articles)
  const dispatch = useDispatch()
  let arts = articles.adminArticles

  const handleEditArticle = (_id) => {
    props.history.push(`/dashboard/articles/edit/${_id}`)
  }

  const onChangePaginatePage = (page) => {
    dispatch(getPaginateArticlesAsync(page))
  }

  const deleteAdminArticle = (_id) => {
    dispatch(deleteArticleAsync(_id))
  }
 
  const handleStatusChange = (status, _id) => {
    const newStatus = status === 'public' ? 'draft' : 'public'
    dispatch(updateStatusArticleAsync(newStatus, _id))
  }

  useEffect(() => {
    dispatch(getPaginateArticlesAsync())
  }, [dispatch])

  return (
    <LayoutDashboard section="Articles">
      <Box display="flex" pb={4} className={classes.tools}>
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
        <Box ml={1} flexDirection="row"  className={classes.searchTool} >
          <Paper  component="form" className={classes.root} onSubmit={() => alert('search')}>
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
      <PaginateComponent
        arts={arts}
        changePage={(page) => onChangePaginatePage(page)}
        deleteArticle={(_id) => deleteAdminArticle(_id)}
        updateStatus={(status, _id) => handleStatusChange(status, _id)}
        editArticle={(_id) => handleEditArticle(_id)}
      />
    </LayoutDashboard>
  )
}

export default Articles