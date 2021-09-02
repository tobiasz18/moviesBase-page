import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box';
import { Typography, CardMedia } from '@material-ui/core';
import { getArticleAsync } from '../../../store/actions/articles_actions';
import { Loader } from '../../../utils/loader';
import { clearArticle } from '../../../store/actions';
import ScoreCard from '../../../utils/scoreCard';

const Article = (props) => {
  const { current } = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticleAsync(props.match.params.id))
    return () => dispatch(clearArticle())
  }, [dispatch, props.match.params.id])

  return (
    <div style={{ width: '100%' }}>
      <Box display='flex' justifyContent='center' flexDirection='column' m={1} p={1}>
        {current ? <>
          <Box p={1}>
            <Typography style={{fontWeight: 600}} variant="h5" component="h1" color="textPrimary">
              {current.title}
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
            <Typography  dangerouslySetInnerHTML={{ __html: current.content}} />
          </Box>
          <ScoreCard current={current} />
        </> : <Loader />}
      </Box>
    </div>
  )
}


export default Article