import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Navigation from './sideNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../utils/tools'
import { clearNotification } from '../../store/actions'
import { signOut } from '../../store/actions/users_actions'
import { Box } from "@material-ui/core"
import image from '../../assets/img/logo.jpg'
import { makeStyles } from '@material-ui/core/styles'
import { changeLayout } from '../../store/actions/site_actions'

const Header = (props) => {
  const classes = useStyles();
  const notifications = useSelector((state) => state.notifications)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : 'Error'
      showToast('ERROR', msg)
      dispatch(clearNotification())
    }
    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : 'Success'
      showToast('SUCCESS', msg)
      dispatch(clearNotification())
    }
  }, [notifications, dispatch])


  const signOutUser = () => {
    dispatch(signOut())
    props.history.push('/');
    alert('logout')
  }

  useEffect(() => {
    let pathArray = props.location.pathname.split('/');
    if (pathArray[1] === 'dashboard') {
       dispatch(changeLayout('dashboard_layout'))
    } else {
      dispatch(changeLayout(''))
    }
    console.log(props.location.pathname === '/dashboard')
  }, [props.location.pathname, dispatch])

  return (
    <Box boxShadow={1} position="relative" zIndex="tooltip" className={classes.background}>
      <nav>
        <Box component="div" p={1} display="flex" width="90%" m="auto" alignItems="center" >
          <Box flexGrow={1} display="flex">
            <Link style={{ fontFamily: "Fredoka One" }} to="/"
              className="">
              <img src={image} alt="" width="80%" />
            </Link>
          </Box>
          <Box display="flex">
            <Navigation users={users} signOutUser={signOutUser} />
          </Box>
        </Box>
      </nav>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  background: {
    background: '#fffdfd'
  }
}));

export default withRouter(Header)