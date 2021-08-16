import {
  AUTH_USERS,
  CLEAR_NOTIFICATION,
  ERROR_GLOBAL,
  GET_ARTICLES,
  SUCCESS_GLOBAL
} from "../types";

//----- ARTICLES -----//

export const getArticles = (sort) => ({
  type: GET_ARTICLES,
  payload: sort
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
