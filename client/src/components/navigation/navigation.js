import React, { useState } from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import LockIcon from '@material-ui/icons/Lock';

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
              <PermContactCalendarIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem button component={Link} to="/auth" onClick={() => setState(false)}>
            <ListItemIcon>
              <MeetingRoomIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button component={Link} to="/auth" onClick={() => setState(false)}>
            <ListItemIcon>
              <LockIcon color="primary" />
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
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>

      </Drawer>
    </>
  )
}

export default Navigation;