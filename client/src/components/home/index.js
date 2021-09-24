import React, { useEffect, useReducer } from 'react'
import { Grid } from '@material-ui/core'
//import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from '../../utils/articleCard'
import { useSelector, useDispatch } from 'react-redux'
import { getArticlesAsync } from '../../store/actions/articles_actions'

const initialSort = {
  sortBy: "_id",
  order: "desc",
  limit: 5,
  skip: 0
}

const reducer = (state, action) => {
  return ({ ...state, ...action })
}

const Home = () => {
  const [sort, sortDispatch] = useReducer(reducer, initialSort)
  const articles = useSelector((state) => state.articles)
  const dispatch = useDispatch()
  const [spacing] = React.useState(2);

  useEffect(() => {
    // only on the first render
    if (articles && !articles.articles) {
      dispatch(getArticlesAsync(initialSort))
    }
  }, [dispatch, articles])

  return (
    <>
      {/* <div>Carusel</div> */}
      <Grid container spacing={2} m={4} >
        {articles && articles.articles ?
          articles.articles.map((item) => {
            return (
              <Grid key={item._id} spacing={spacing} item xs={12} sm={6} lg={3}>
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
    </>
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