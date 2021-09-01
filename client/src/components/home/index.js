import React, { useEffect, useReducer, useState } from 'react'
import Grid from '@material-ui/core/Grid'
//import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from '../../utils/articleCard'
import { useSelector, useDispatch } from 'react-redux'
import { getArticlesAsync } from '../../store/actions/articles_actions'

const initialState = {
  sortBy: "_id",
  order: "desc",
  limit: 5,
  skip: 0
}

const reducer = (state, action) => {
  return { ...state, ...action }
}

const Home = () => {
  const [sort, sortDispatch] = useReducer(reducer, initialState)
  const articles = useSelector((state) => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    // only on the first render
    if (articles && !articles.articles) {
      dispatch(getArticlesAsync(initialState))
    }
  }, [dispatch, articles])

  return (
    <div>
      <div>Carusel</div>
      <Grid container spacing={2} className="article_card">
        {articles && articles.articles ?
          articles.articles.map((item) => {
            return (
              <Grid key={item._id} item xs={12} sm={6} lg={3}>
                <ArticleCard key={item._id} article={item} />
              </Grid>
            )
          }) : null
        }
      </Grid>
      <button onClick={() => {
        const skip = sort.skip + sort.limit
        dispatch(getArticlesAsync({ ...sort, skip: skip }))
        sortDispatch({ skip: skip })

      }}>
        Load more
      </button>
    </div>
  )
}

export default Home


// Alternative to useReducer() is useState() 

// EXAMPLE::::::::
/*
  const [sort, sortDispatch] = useState(initialState);
  setState(prevState => {
   return { ...prevState, skip: skip };
  }); */
// https://reactjs.org/docs/hooks-reference.html#usestate