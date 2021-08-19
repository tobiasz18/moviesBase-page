import * as users from './index'
import axios from 'axios'
import { getAuthHeader, removeTokenCookie } from '../../utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/register`, {
        email: values.email,
        password: values.password
      })

      dispatch(users.authUser({ data: user.data, auth: true }))
      dispatch(users.successGlobal('Welcome!!, check your email and validate your account.'))
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message))
    }
  }
}

export const signInUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/signin`, {
        email: values.email,
        password: values.password
      })

      dispatch(users.authUser({ data: user.data, auth: true }))
      dispatch(users.successGlobal(`Welcome!!, ${values.email}`))
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message))
    }
  }
}

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      const user = await axios.get(`api/users/isauth`, getAuthHeader)
      dispatch(users.authUser({ data: user.data, auth: true }))
    } catch (error) {
      dispatch(users.authUser({ data: {}, auth: false }))
    }
  }
}

export const signOut = () => {
  return (dispatch) => {
    removeTokenCookie()
    dispatch(users.signOutUser())
  }
}



