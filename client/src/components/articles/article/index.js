import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box';
import { Typography, CardMedia } from '@material-ui/core';
import { getArticleAsync } from '../../../store/actions/articles_actions';

const Article = (props) => {
  const { current } = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticleAsync(props.match.params.id))
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Box display='flex' justifyContent='center' flexDirection='column' m={1} p={1}>
        {current ? <>
          <Box p={1}>
            <Typography variant="h5" component="h1">
              {current.title}
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="subtitle1" component="span">
              {current.director}
            </Typography>
          </Box>
          <Box p={1}>
            <CardMedia
              style={{ height: 0, paddingTop: '56.25%' }}
              image="https://picsum.photos/200"
              title="some title"
            />
          </Box>
          <Box p={1}>
            <Typography>
              {current.content}
            </Typography>
          </Box>
        </> : null}
      </Box>
    </div>
  )
}


export default Article