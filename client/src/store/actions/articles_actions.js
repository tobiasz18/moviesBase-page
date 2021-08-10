import * as articles from './index'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getArticleAsync = (sort) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/api/articles/loadmore`, sort)
      const prevState = getState().articles.articles
      let newState = [...response.data]

      if (prevState) {
        newState = [...prevState, ...response.data]
      }

      dispatch(articles.getArticles(newState))

    } catch (error) {
      console.log(error)
    }
  }
}