import {
  AUTH_USERS,
  CLEAR_NOTIFICATION,
  ERROR_GLOBAL,
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
