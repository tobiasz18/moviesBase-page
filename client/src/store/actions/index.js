import {
  ADD_ARTICLE,
  AUTH_USERS,
  CLEAR_CURRENT_ARTICLE,
  CLEAR_NOTIFICATION,
  DELETE_ARTICLE,
  ERROR_GLOBAL,
  GET_CURRENT_ARTICLE,
  GET_ARTICLES,
  GET_PAGINATE_ARTICLES,
  SIGN_OUT_USER,
  SITE_LAYOUT,
  SUCCESS_GLOBAL,
  UPDATE_STATUS_ARTICLE,
  CHANGE_EMAIL_USER,
  UPDATE_PROFILE
} from "../types";

//----- ARTICLES -----//

export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article
})
export const getPaginateArticles = (articles) => ({
  type: GET_PAGINATE_ARTICLES,
  payload: articles
})
export const getArticles = (sort) => ({
  type: GET_ARTICLES,
  payload: sort
})
export const getCurrentArticle = (article) => ({
  type: GET_CURRENT_ARTICLE,
  payload: article
})
export const deleteArticle = (docs) => ({
  type: DELETE_ARTICLE,
  payload: docs
})
export const clearCurrentArticle = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_CURRENT_ARTICLE
    })
  }
}
export const updateStatusArticle = (article) => ({
  type: UPDATE_STATUS_ARTICLE,
  payload: article
})


//----- NOTIFICATIONS -----//

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg
})
export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg
})
export const clearNotification = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_NOTIFICATION
    })
  }
}

//----- USERS -----//

export const authUser = (user) => ({
  type: AUTH_USERS,
  payload: user
})
export const signOutUser = () => ({
  type: SIGN_OUT_USER,
})
export const changeEmailUser = (data) => ({
  type: CHANGE_EMAIL_USER,
  payload: data
})
export const updateProfile = (data) => ({
  type: UPDATE_PROFILE,
  payload: data
})


//----- SITE -----//

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout
})
