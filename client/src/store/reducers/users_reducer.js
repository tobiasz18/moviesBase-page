import { AUTH_USERS, CHANGE_EMAIL_USER, SIGN_OUT_USER, UPDATE_PROFILE } from "../types";

let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    firstName: null,
    lastName: null,
    age: null,
    role: null
  },
  auth: null
}

function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case AUTH_USERS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth
      }
    case SIGN_OUT_USER:
      return {
        ...state,
        data: { ...DEFAULT_USER_STATE.data },
        auth: false
      }
    case CHANGE_EMAIL_USER:
      return {
        ...state, data: { ...state.data, email: action.payload }
      }
    case UPDATE_PROFILE:
      return {
        ...state, data: { ...action.payload }
      }
    default:
      return state
  }
}

export default usersReducer;