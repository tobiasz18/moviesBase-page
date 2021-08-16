import * as users from './index'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const registerUser = (values) => {
  return async (dispatch) => {
    const user = await axios.post(`/api/users/register`, {
      email: values.email,
      password: values.password
    })

    try {
      dispatch(users.authUser({
        data: user.data,
        auth: true
      }))
      dispatch(articles.successGlobal('Welcome!!, check your email and validate your account.'))
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(articles.errorGlobal('Oops'))
    }
  }
}



