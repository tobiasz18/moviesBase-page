import * as articles from './articles_actions'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getArticleAsync  = (sort) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/api/articles/loadmore`, sort)

      dispatch(articles.getArticles(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}