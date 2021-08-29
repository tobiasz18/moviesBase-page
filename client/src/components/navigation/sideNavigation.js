import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// material UI icons
import DehazeIcon from '@material-ui/icons/Dehaze'
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'

// core components
import {
  Divider,
  Drawer,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

const Navigation = ({ signOutUser, users }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <DehazeIcon
        className="drawer_btn"
        onClick={() => setState(true)}
      />
      <Drawer style={{ zIndex: 1800 }} anchor="right" open={state} onClose={() => setState(false)}>
        <form style={{ margin: '20px' }}>
          <TextField id="outlined-basic" label="Search movie" variant="outlined" />
        </form>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={() => setState(false)}>
            <ListItemIcon>
              <HomeOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={Link} to="/contact" onClick={() => setState(false)}>
            <ListItemIcon>
              <ContactsOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>

          {!users.auth ?
            <ListItem button component={Link} to="/auth" onClick={() => setState(false)}>
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
            :
            <ListItem
              button
              onClick={() => {
                setState(false)
                signOutUser()
              }}>
              <ListItemIcon>
                <LockOpenIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          }
        </List>
        {users.auth ?
          <>
            <Divider />
            <List>
              <ListItem button component={Link} to="/dashboard" onClick={() => setState(false)}>
                <ListItemIcon>
                  <DashboardOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </>
          : null}
      </Drawer>
    </>
  )
}

export default Navigation