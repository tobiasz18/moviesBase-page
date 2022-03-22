import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../../utils/loader'

import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { accountVerifyAsync } from '../../store/actions/users_actions';

const iconFontSize = {
  fontSize: '200px'
}

const EmailVerification = (props) => {
  const [loading, setLoading] = useState(true)
  const [icon, setIcon] = useState(null)
  const [text, setText] = useState(null)
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  const query = new URLSearchParams(props.location.search)
  const token = query.get('t')

  useEffect(() => {
    if (token) {
      dispatch(accountVerifyAsync(token))
    } else {
      props.history.push('/')
    }
  }, [dispatch])


  useEffect(() => {
    if (notifications && notifications.error) {
      setIcon(<SentimentDissatisfiedIcon style={{ ...iconFontSize, color: 'red' }} />)
      setLoading(false)
      setText('error')
    }
    if (notifications && notifications.success) {
      setIcon(<FavoriteIcon style={{ ...iconFontSize, color: 'green' }} />)
      setLoading(false)
      setText('success')
    }
  }, [notifications])

  const verification = (text) => {
    switch (text) {
      case 'success':
        return (
          <>
            <h1>Your email has been verified</h1>
            <p>You can now use your account without restrictions</p>
          </> 
        )
      case 'error':
        return (
          <>
            <h1>Oops!</h1>
            <p>something went wrong</p>
          </>
        )
      default:
        console.log(`Unexpected problem occur`);
    }
  }

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <div style={{ textAlign: 'center' }}>
            {icon}
            {verification(text)}
          </div>
      }
    </>
  )
}

export default EmailVerification