import { AUTH_USERS, SIGN_OUT_USER } from "../types";

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
    default:
      return state
  }
}

export default usersReducer;