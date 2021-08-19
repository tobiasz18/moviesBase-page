import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Navigation from './sideNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../utils/tools'
import { clearNotification } from '../../store/actions'
import { signOut } from '../../store/actions/users_actions'



const Header = () => {
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    if(notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : 'Error'
      showToast('ERROR', msg)
      dispatch(clearNotification())
    }
    if(notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : 'Success'
      showToast('SUCCESS', msg)
      dispatch(clearNotification())
    }
  }, [notifications, dispatch])


  const signOutUser = () => {
    dispatch(signOut())
    alert('logout')
  }
  

  return (
    <nav className="navbar" >
      <Link style={{ fontFamily: "Fredoka One" }} to="/"
        className="navbar-brand d-flex align-items-center">
        FilmsBase
      </Link>
      <Navigation signOutUser={signOutUser}/>
    </nav>
  )
}

export default withRouter(Header)