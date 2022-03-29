import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom'

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";

// icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import { Typography } from '@material-ui/core';
import { Divider, Box } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#1c1b1b',
    marginTop: '68px',
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#1c1b1b'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  divider: {
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(2),
  },

  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3)
  },
  list: {
    marginTop: theme.spacing(17),
    color: '#fff'

  },
  background: {
    position: "absolute",
    zIndex: "-1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: "#000",
      opacity: ".8"
    }
  },
  DashboardTitle: {
    margin: "auto"
  },
  icon: {
    color: '#fff'
  }
}));

const LayoutDashboard = (props) => {
  const [showdrawer, setShowDrawer] = useState(true)
  const [open, setOpen] = useState(false)

  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))


  useEffect(() => {
    setShowDrawer(isMdUp)
  }, [isMdUp])

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.DashboardTitle} variant="h6" noWrap>
            Dashboard Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant={showdrawer ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >

        <List className={classes.list}>
          {listRoutes.map((prop, index) => (
            <ListItem
              button
              key={prop.text}
              component={prop.component}
              to={prop.to}
            >
              <ListItemIcon>
                <prop.icon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={prop.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <Typography variant="h5" component="h1">
          {props.section}
        </Typography>
        <Divider className={classes.divider} light={true} component="hr" />
        {props.children}
      </main>
    </div >
  );
}


const listRoutes = [
  {
    text: 'Dashboard',
    component: RouterLink,
    to: '/dashboard',
    icon: DashboardIcon
  },
  {
    text: 'Profile',
    component: RouterLink,
    to: '/dashboard/profile',
    icon: PersonIcon
  },
  {
    text: 'Categories',
    component: RouterLink,
    to: '/dashboard/categories',
    icon: CategoryIcon
  },
  {
    text: 'Articles',
    component: RouterLink,
    to: '/dashboard/articles',
    icon: FolderIcon
  },
]



export default LayoutDashboard