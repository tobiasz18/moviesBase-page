import React from 'react'
import LayoutDashboard from '../../../hoc/LayoutDashboard'
import AuthProfile from './auth'
import UserProfile from './profile'

const Profile = () => {
  {console.log("CHild")}
  return (
    <LayoutDashboard section="My Profile">
      <AuthProfile />
      <UserProfile />
    </LayoutDashboard>
  )
}

export default Profile