import {
  AUTH_USERS,
  CLEAR_ARTICLE,
  CLEAR_NOTIFICATION,
  ERROR_GLOBAL,
  GET_ARTICLE,
  GET_ARTICLES,
  SIGN_OUT_USER,
  SITE_LAYOUT,
  SUCCESS_GLOBAL
} from "../types";

//----- ARTICLES -----//

export const getArticles = (sort) => ({
  type: GET_ARTICLES,
  payload: sort
})
export const getArticle = (article) => ({
  type: GET_ARTICLE,
  payload: article
})
export const clearArticle = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_ARTICLE
    })
  }
}


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


//----- SITE -----//

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout
})
