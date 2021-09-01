import * as articles from './index'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// load default a bunch of articles and 
// set listening on button to load-more a bunch of article
export const getArticlesAsync = (sort) => {
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
      dispatch(articles.errorGlobal('Ups something wrong with articles load'))
    }
  }
}
// Get single article by id
export const getArticleAsync = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/articles/getById/${id}`)
      dispatch(articles.getArticle(response.data[0]))
    } catch (error) {
      dispatch(articles.errorGlobal('Ups something wrong with article'))
    }
  }
}

