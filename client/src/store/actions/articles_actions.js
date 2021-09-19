import * as articles from './index'
import axios from 'axios'
import { getAuthHeader } from '../../utils/tools'

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
      dispatch(articles.errorGlobal(error.response.data.message))
    }
  }
}

export const addArticleAsync = (article) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/articles/admin/add_articles`, article, getAuthHeader())
      dispatch(articles.addArticle(response.data))
      dispatch(articles.successGlobal('New article have been added'))
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message))
    }
  }
}

export const getPaginateArticlesAsync = (page = 1, limit = 8) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/articles/admin/paginate`, {
        page,
        limit
      }, getAuthHeader())
      dispatch(articles.getPaginateArticles(response.data))
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message))
    }
  }
}

export const deleteArticleAsync = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/articles/admin/articles/${id}`, getAuthHeader())
      dispatch(articles.deleteArticle(id))
      dispatch(articles.successGlobal('The article has been deleted'))

    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message))
    }
  }
}

export const updateStatusArticleAsync = (status, _id) => {
  return async (dispatch, getState) => {
    try {
      const article = await axios.patch(`/api/articles/admin/articles/${_id}`, {
        status
      }, getAuthHeader())

      const state = getState().articles.adminArticles.docs
      state[state.findIndex((item) => item._id === _id)] = article.data

      dispatch(articles.updateStatusArticle(state))
      dispatch(articles.successGlobal('Status changed successfully'))
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message))
    }
  }
}
