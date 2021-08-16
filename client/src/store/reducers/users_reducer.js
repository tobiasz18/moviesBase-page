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
    default:
      return state
  }
}

export default usersReducer;