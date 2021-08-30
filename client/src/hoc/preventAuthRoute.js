import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const PreventAuthRoute = (props) => {
  const users = useSelector(state => state.users)

  if(users.auth) {
    return <Redirect to="/dashboard" />
  } else {
    return props.children
  }
}

export default PreventAuthRoute