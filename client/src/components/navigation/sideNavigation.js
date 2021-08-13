import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// material UI icons
import HomeIcon from '@material-ui/icons/Home'
import DehazeIcon from '@material-ui/icons/Dehaze'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import LockIcon from '@material-ui/icons/Lock'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactsIcon from '@material-ui/icons/Contacts';
// core components
import { 
  Divider, 
  Drawer, 
  TextField, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText } from '@material-ui/core'

const Navigation = () => {
  const [state, setState] = useState(false)

  return (
    <>
      <DehazeIcon
        className="drawer_btn"
        onClick={() => setState(true)}
      />
      <Drawer anchor="right" open={state} onClose={() => setState(false)}>
        <form style={{ margin: '20px' }}>
          <TextField id="outlined-basic" label="Search movie" variant="outlined" />
        </form>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={() => setState(false)}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={() => setState(false)}>
            <ListItemIcon>
              <ContactsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem button component={Link} to="/auth" onClick={() => setState(false)}>
            <ListItemIcon>
              <LockOpenIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button component={Link} to="/auth" onClick={() => setState(false)}>
            <ListItemIcon>
              <ExitToAppIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard" onClick={() => setState(false)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard"  />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}



export default Navigation;