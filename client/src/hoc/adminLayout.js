import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//background photo
import bgImage from "../assets/img/sidebar-2.jpg"
// icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';

function AdminLayout(props) {
  const classes = useStyles();
  const [image, setImage] = React.useState(bgImage);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className={classes.item}>
          <List>
            {listRoutes.map((prop, index) => (
              <ListItem button component={prop.component} to={prop.to} key={prop.text}>
                <ListItemIcon className={classes.icon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText primary={prop.text} />
              </ListItem>
            ))}
          </List>
        </div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
      <main className={classes.content}>
        <h5>{props.section}</h5>
        {props.children}
      </main>
    </div>
  )
}

const listRoutes = [
  {
    text: 'dashboard',
    component: RouterLink,
    to: '/dashboard',
    icon: DashboardIcon
  },
  {
    text: 'profile',
    component: RouterLink,
    to: '/dashboard/profile',
    icon: PersonIcon
  },
  {
    text: 'articles',
    component: RouterLink,
    to: '/dashboard/articles',
    icon: FolderIcon
  }
]

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  //  backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  item: {
    paddingTop: theme.spacing(10),
    color: '#FFF',
    zIndex: 4,
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
  icon: {
    color: '#FFF',
  }
}));


export default AdminLayout