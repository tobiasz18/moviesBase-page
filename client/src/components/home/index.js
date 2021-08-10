import React, { useEffect, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
//import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from '../../utils/articleCard';
import { useSelector, useDispatch } from 'react-redux'
import { getArticleAsync } from '../../store/actions/articles_actions';

const initialState = {
  sortBy: "_id",
  order: "desc",
  limit: 5,
  skip: 0
}

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, action) => ({ ...state, ...action }), initialState
  ) // action as newState in this case
  const articles = useSelector((state) => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    // only on the first render
    if (articles && !articles.articles) {
      dispatch(getArticleAsync(initialState))
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

        dispatch(getArticleAsync({ ...sort, skip: skip })) 
        setSort({ skip: skip })
      }}>
        Load more
      </button>
    </div>
  )
}

export default Home







// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }