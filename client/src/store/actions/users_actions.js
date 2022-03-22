import * as users from './index'
import axios from 'axios'
import { getAuthHeader, getTokenCookie, removeTokenCookie } from '../../utils/tools'

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
      if (!getTokenCookie()) {
        throw new Error()
      }
      const user = await axios.get(`/api/users/isauth`, getAuthHeader())
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

export const changeEmailUserAsync = ({ email, newemail }) => {
  return async (dispatch) => {
    try {
      await axios.patch(`/api/users/update_email`, {
        email: email,
        newEmail: newemail
      }, getAuthHeader())
      dispatch(users.changeEmailUser(newemail))
      dispatch(users.successGlobal(`Good job! email has been changed.`))

    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message))
    }
  }
}


export const updateProfileDataAsync = (data) => {
  return async (dispatch, getState) => {
    try {
      const profile = await axios.patch(`/api/users/profile`, data, getAuthHeader())
      const newData = {
        ...getState().users.data,
        ...profile.data
      }

      dispatch(users.updateProfile(newData))
      dispatch(users.successGlobal(`Good job! profile updated.`))

    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message))
    }
  }
}


/**------ contact -----**/

export const contactUs = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/contact`, data);
      dispatch(users.successGlobal('We will contact you back'))
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.mesage))
    }
  }
}

export const accountVerifyAsync = (token) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().users.auth
      await axios.get(`/api/users/verify?validation=${token}`)

      if (user) {
        dispatch(users.accountVerify())
      }
      dispatch(users.successGlobal('Account verified !!'))

    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message))
    }
  }
}